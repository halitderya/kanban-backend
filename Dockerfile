FROM node:19.5.0-alpine


WORKDIR /app


ARG API_KEY


ENV API_KEY=$API_KEY


COPY . .


RUN npm install

CMD ["npm", "start"]