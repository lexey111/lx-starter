FROM node:lts-alpine3.10
LABEL maintainer="lexey111@gmail.com"
WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm ci
#COPY . .
#EXPOSE 3030
#CMD npm run start
