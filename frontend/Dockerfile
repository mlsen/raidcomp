FROM gliderlabs/alpine:edge

RUN apk add --update nginx && rm -rf /var/cache/apk/*

#RUN mkdir -p /var/lib/nginx/logs && touch /var/lib/nginx/logs/
#RUN mkdir -p /var/log/nginx && touch /var/log/nginx/rc_fe_access.log
ADD ./nginx-raidcomp.conf /etc/nginx/nginx.conf
#ADD ./dist /srv/rc/app

CMD ["nginx", "-g", "pid /tmp/nginx.pid; daemon off;"]
