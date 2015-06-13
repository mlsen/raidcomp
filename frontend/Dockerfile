FROM gliderlabs/alpine:edge

RUN apk add --update nodejs && rm -rf /var/cache/apk/*

ADD . /srv/rc
RUN cd /srv/rc && npm install

WORKDIR /srv/rc

EXPOSE 80
