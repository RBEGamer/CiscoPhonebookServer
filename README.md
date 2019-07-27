# cisco_phonebook_server
 aA xml service for cisco ip phone to provide a dynamic phonebook from a vcf file

# FEATURES
This service generates a `direcotry.xml` file used for cisco phone to show a phonebook.
If you want to use the cisco phone with the SIP firmaware and with your own sip gateway like a Fritz!Box.
There is no build in way to access a phonebook on the phone. The idea was to generate such XML from a normal VCF File which can exported from iCloud for example and provide these contacts to your cisco phones




# VCF
At startup the service need a vfc file with contacts that are will showed on the cisco ip phone.
Place a vfc file named `contact_export.vcf` in the `/src/phbook/contact_export.vfc` before starting the service or building the Docker-Image.

# BUILDING THE DOCKER IMAGE
To build the docker-image named `ciscophonebookgenerator` you can use the script `/src/phbook/build_image.sh`.


# CONFIGURE YOUR CISCO PHONE
To provide configuration data for your phone, you have to setup an TFTP-Server. 


`<directoryURL>http://URL_TO_SERVICE:3012/cisco/menu.xml</directoryURL>`
