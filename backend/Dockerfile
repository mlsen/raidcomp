FROM gliderlabs/alpine:edge

RUN apk add --update nodejs && rm -rf /var/cache/apk/*

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /srv/raidcomp && cp -a /tmp/node_modules /srv/raidcomp

ADD . /srv/raidcomp

EXPOSE 5000

CMD node --harmony /srv/raidcomp/app.js
