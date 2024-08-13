FROM node:22-alpine

WORKDIR /usr/src/welldatasvc

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm run prisma:generate

EXPOSE 7000

CMD [ "npm", "run", "start:migrate:prod" ]