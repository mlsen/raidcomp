FROM gliderlabs/alpine:edge

RUN apk add --update nodejs && rm -rf /var/cache/apk/*

ADD . /srv/rc
RUN cd /srv/rc && npm install

EXPOSE 5000

# CMD node --harmony /srv/rc/app.js
