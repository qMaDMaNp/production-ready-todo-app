# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /app
COPY . .

RUN npm ci \
    && npm run build
    
CMD npm run prod
EXPOSE 4444