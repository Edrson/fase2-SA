FROM node:12 as build-step

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm","start"]

FROM nginx:1.17.1-alpine

COPY --from=build-step /app/dist/index /usr/share/nginx/html
