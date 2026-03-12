FROM node:20-slim AS build
WORKDIR /app
COPY static/ts ./static/ts
COPY tsconfig.json .
RUN npm install -g typescript && npx tsc

FROM nginx:1.27-alpine-slim
COPY static/css /usr/share/nginx/html/static/css
COPY static/js  /usr/share/nginx/html/static/js
COPY index.html /usr/share/nginx/html/index.html
COPY nginx.conf /etc/nginx/conf.d/default.conf