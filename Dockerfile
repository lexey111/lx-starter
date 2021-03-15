# build environment
FROM node:lts-alpine3.10 as build
LABEL maintainer="lexey111@gmail.com"

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm ci --no-optional
COPY . /app

RUN npm run build

FROM nginx:1.19.6

COPY default.conf.template /etc/nginx/conf.d/default.conf.template
COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist /usr/share/nginx/html

CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
