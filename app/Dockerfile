FROM nginx:alpine

RUN addgroup -S app && adduser -S app -G app
USER app

COPY index.html /usr/share/nginx/html/index.html
COPY game.js /usr/share/nginx/html/game.js

EXPOSE 80

