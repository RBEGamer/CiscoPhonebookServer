FROM node:10
WORKDIR /usr/src/app
COPY package*.json ./

# INSTALL TFTP SERVER
RUN apt update && \
    apt install tftp-hpa && \
    rm -rf /tmp/* && \
    mkdir -p /tftpboot

RUN chmod -R 777 /tftpboot
RUN chown -R nobody /tftpboot


RUN npm install
COPY . .


COPY ./tftp_conf /etc/xinetd.d/tftp

COPY ./tftpboot/*.xml /tftpboot/

EXPOSE 3012
EXPOSE 69
CMD [ "npm", "start" ]
