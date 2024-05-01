FROM node:19.5.0-alpine

WORKDIR /

ARG API_KEY

ENV API_KEY=process.env.API_KEY


RUN npm install
RUN npm run build

CMD ["npm", "start"]