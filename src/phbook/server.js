

var vCard = require('vcf')
var json2xml = require('json2xml');

var path = require('path');

var container_addr = "192.168.178.4";
var container_port = "3012";
var fs = require('fs');
var cards = null;
var jcard = []
var pdata = []
var express = require('express');
var app = express();
try {
    var data = fs.readFileSync(path.resolve(__dirname, 'contact_export.vcf'), 'utf8');
    //console.log(data.toString());
    cards = vCard.parse(data.toString());

    for (let index = 0; index < cards.length; index++) {
         element = cards[index];

        // console.log(element.toJSON()[1][3][3]);
        //console.log(element.toJSON()[1][5]);
        var data = {

        }
        var dt = 0;
        for (let index = 0; index < element.toJSON()[1].length; index++) {
            const elementa = element.toJSON()[1][index];
            if(elementa[0] == 'fn'){
                
                data.Name = elementa[3];
                data.Prompt = data.Name;
                dt++;
            }
            if (elementa[0] == 'tel') {
                
                if (elementa[3] != null){
                    data.URL = String(elementa[3]).replace(" ", "").replace("+49","0"); //"Dial:"+
                    dt++;
                }
                
            }
            
        }
        if(dt >1){
            pdata.push({ MenuItem: data });
        }
        //console.log(data);
       
       // jcard.push(element.toJSON());
    }   
    
} catch (e) {
    console.log('Error:', e.stack);
}

pdata.push();

var c = 0;
var tmp = [];
var names = [];
var fin = [];
for (let index = 0; index < pdata.length; index++) {
    tmp.push(pdata[index]);
    console.log(tmp.length);
    if(c > 20){ //20 einträge pro seite
        c = 0;
       

        var str  = "";
        if (tmp[0].MenuItem != undefined){
            str += String(tmp[0].MenuItem.Name).charAt(0).toUpperCase();
        }
        str +=" - ";
        if (tmp[tmp.length-1].MenuItem != undefined) {
            str += String(tmp[tmp.length -1].MenuItem.Name).charAt(0).toUpperCase();
        }
        tmp.push({ Title: "" + str, Prompt: "Auswahl" });

        names.push(str);
        fin.push(tmp);
        tmp = [];
    }
    c++;
}
//ADD LAST ENTRYS
if(c > 0 ){
    fin.push(tmp);

    var str = "";
    if (tmp[0].MenuItem != undefined) {
        str += String(tmp[0].MenuItem.Name).charAt(0).toUpperCase();
    }
    str += " - ";
    if (tmp[tmp.length - 1].MenuItem != undefined) {
        str += String(tmp[tmp.length - 1].MenuItem.Name).charAt(0).toUpperCase();
    }
    tmp.push({ Title: "" + str, Prompt: "Auswahl" });
    tmp = [];
}






app.get('/cisco/menu.xml', function (req, res) {

    var tmpa = [];
    tmpa.push({ Title: "iCloud-Adressbuch", "Prompt": "---" });
    for (let index = 0; index < fin.length; index++) {
        const element = fin[index];
        tmpa.push({ MenuItem: { Name: names[index], URL: "http://" + container_addr + ":" + container_port+"/cisco/book/" + index } });     
    }
   


    var xmlstr = json2xml({ CiscoIPPhoneMenu: tmpa }, { header: true });
    res.set('Content-Type', 'text/xml');
    res.send(xmlstr);
});


app.get('/cisco/book/:tagId', function (req, res) {
    var xmlstr = json2xml({ CiscoIPPhoneMenu: fin[req.params.tagId] }, { header: true });
    res.set('Content-Type', 'text/xml');
    res.send(xmlstr);
});

app.listen(3012, function () {
    console.log('Example app listening on port !' + container_port);
});

app.get('/', function (req, res) {
   
    res.send("<html><body>PHONE BOOK SERVER RUNNING /cisco/menu.xml</body></html>");
});
