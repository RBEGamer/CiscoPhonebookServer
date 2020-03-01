FROM node:10
WORKDIR /usr/src/app
COPY package*.json ./

# INSTALL TFTP SERVER
RUN apt update && \
    apt-get install xinetd tftpd tftp -y && \
    rm -rf /tmp/*
    
RUN mkdir -p /tftpboot

RUN chmod -R 777 /tftpboot
RUN chown -R nobody /tftpboot


RUN npm install
COPY . .


COPY ./tftp_conf /etc/xinetd.d/tftp

COPY ./tftpboot/*.xml /tftpboot/

RUN /etc/init.d/xinetd stop
RUN /etc/init.d/xinetd start

EXPOSE 3012
EXPOSE 69

#RUN chmod -x ./entrypoint.sh

#ENTRYPOINT ["./entrypoint.sh"]

CMD ["npm", "start"]
