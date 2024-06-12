FROM node:20-alpine

RUN apk update && apk add --no-cache npm

ENV PORT=3000

WORKDIR /app

EXPOSE 3000

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY --chown=node:node . .

USER node

CMD ["npm", "start"]