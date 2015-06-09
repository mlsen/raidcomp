FROM gliderlabs/alpine:edge

RUN apk add --update nginx && rm -rf /var/cache/apk/*

RUN rm -rf /usr/share/nginx/html
ADD ./dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
