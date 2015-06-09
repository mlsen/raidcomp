FROM gliderlabs/alpine:edge

RUN apk add --update nodejs && rm -rf /var/cache/apk/*

ADD . /srv/raidcomp/backend
RUN cd /srv/raidcomp/backend && npm install

EXPOSE 5000

CMD node --harmony /srv/raidcomp/backend/app.js
