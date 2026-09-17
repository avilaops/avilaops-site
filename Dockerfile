FROM node:22-bookworm-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# O build roda o postbuild, que gera out/_headers e nginx/security-headers.conf
# a partir de config/security-headers.mjs.
RUN npm run build

FROM nginx:1.31-alpine
# O default.conf de fabrica serve sem cabecalho de seguranca, sem gzip e sem
# politica de cache. Sai do caminho.
RUN rm -f /etc/nginx/conf.d/default.conf
COPY --from=build /app/nginx/avilaops.conf /etc/nginx/conf.d/avilaops.conf
COPY --from=build /app/nginx/security-headers.conf /etc/nginx/conf.d/security-headers.conf
COPY --from=build /app/out /usr/share/nginx/html
