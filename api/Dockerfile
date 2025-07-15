FROM node:16.14-slim

WORKDIR /api

COPY package*.json ./
RUN npm install

COPY . .

ENTRYPOINT [ "npm" ]

CMD [ "start" ]
