FROM node:18-alpine

RUN mkdir -p /home/node/server/app/node_modules && chown -R node:node /home/node/server/app

WORKDIR /home/node/server/app

COPY package*.json ./

USER node

RUN npm ci

COPY --chown=node:node . .

RUN npm run build

EXPOSE 4444

CMD [ "npm", "run", "prod" ]