FROM node:18-alpine3.18

WORKDIR /app

ARG API_KEY

ENV API_KEY=process.env.API_KEY


RUN npm install
RUN npm run build

CMD ["npm", "start"]