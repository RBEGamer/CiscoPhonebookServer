
![Gopher image](/documentation/logo.png)
 A xml service for cisco ip phone to provide a dynamic phonebook from a vcf file


# FEATURES
This service generates a `direcotry.xml` file used for cisco phone to show a phonebook.
If you want to use the cisco phone with the SIP firmaware and with your own sip gateway like a Fritz!Box.
There is no build in way to access a phonebook on the phone. The idea was to generate such XML from a normal VCF File which can exported from iCloud for example and provide these contacts to your cisco phones

<img src="/documentation/pbook.JPG" width="1024" />

# SERVER SETUP
Set on your host to static ip and modify the `server.js` file line 3.

# VCF
Place a vfc file named `contact_export.vcf` in the `/src/phbook/contact_export.vfc` before starting the service or building the Docker-Image.


# CONFIGURE YOUR CISCO PHONE
To provide configuration data for your phone, you have to setup an TFTP-Server.
The docker image already contains a TFTP-Server which is already setup.
Setup the TFTP-Server URL in the phones newtwork settings.

<img src="/documentation/tftp.JPG" width="1024"/>

One configuration file per phone with a specific name:
`SEP` followed by the Mac-Adress from the phone in uppercase `.cnf.xml`.
An example file can be found in the `/src/pbook/tftpboot/` directoy ('/src/phbook/tftpboot/SEP_MACADDROFPHONE.cnf.xml').
All files present in thits directory will be served by the Docker-Image TFTP-Server.
So simply edit them.


After you setup the config file to your needs, you have to edit the line:
```xml
<directoryURL>http://URL_TO_SERVICE:3012/cisco/menu.xml</directoryURL>
```
This says the phone where it can found this phonebook service.

You can also setup a shortcut button to open the phonebook by using:

```xml
   <line button="2"> 
     	<featureID>20</featureID> 
     	<featureLabel>Telefonbuch</featureLabel> 
     	<serviceURI>http://URL_TO_SERVICE:3012/cisco/menu.xml</serviceURI> 
  	</line> 

```

## REPLACE `URL_TO_SERVICE` with the external IP of your docker container
# BUILDING THE DOCKER IMAGE
To build the docker-image named `ciscophonebookgenerator` you can use the script `/src/phbook/build_image.sh`.

Run the Docker-Image by using:
```bash
$ docker run -itd -p 3012:3012 -p 69:69 --name ciscophonebookgenerator ciscophonebookgenerator
```

# TODO
* adding api for updating contacts
* carddav integration
* configuration page
* autogenerate `.cnf.xml` file with external ip
