FROM node:18-alpine as build

RUN mkdir -p /home/node/frontend/app/node_modules && chown -R node:node /home/node/frontend/app

WORKDIR /home/node/frontend/app

COPY package*.json ./

USER node

RUN npm ci

COPY --chown=node:node . .

RUN npm run prod

# production environment
FROM nginx:stable-alpine

COPY --from=build /home/node/frontend/app/build /usr/share/nginx/html

COPY --from=build /home/node/frontend/app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]