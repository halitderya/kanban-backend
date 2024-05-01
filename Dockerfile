FROM node:19.5.0-alpine


WORKDIR /app


ARG API_KEY


ENV API_KEY=$API_KEY


COPY . .


RUN npm install


RUN echo "195.20.255.56 mongo1 mongo2" >> /etc/hosts

CMD ["npm", "start"]