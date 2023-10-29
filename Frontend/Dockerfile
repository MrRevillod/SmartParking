FROM node:20.8.1-alpine3.18 as build-stage
WORKDIR /app/frontend

COPY package*.json .
COPY .env .

RUN npm install
COPY . .
RUN npm run build
EXPOSE 8000

CMD ["npm", "run", "preview"]