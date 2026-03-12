# ── Stage 1: Compile TypeScript ───────────────────────────────────────────────
FROM node:20-slim AS build

WORKDIR /app
COPY static/ts ./static/ts
COPY tsconfig.json .
RUN npm install -g typescript --ignore-scripts \
    && npx tsc

# ── Stage 2: Serve with hardened Nginx ────────────────────────────────────────
FROM nginx:1.27-alpine-slim

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/static/js  /usr/share/nginx/html/static/js
COPY frontend/style.css           /usr/share/nginx/html/static/css/style.css
COPY frontend/index.html          /usr/share/nginx/html/index.html
COPY frontend/nginx.conf          /etc/nginx/conf.d/default.conf

RUN chown -R nginx:nginx /usr/share/nginx/html \
    && chown -R nginx:nginx /var/cache/nginx \
    && chown -R nginx:nginx /var/log/nginx \
    && touch /var/run/nginx.pid \
    && chown nginx:nginx /var/run/nginx.pid

USER nginx

EXPOSE 80