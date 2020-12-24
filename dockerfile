FROM node:13

LABEL maintainer="Celco Roxa <celcoroxa@gmail.com>"

RUN mkdir -p /home/node/api_user/node_modules && chown -R node:node /home/node/api_user

WORKDIR /home/node/api_user

COPY package*.json ./

RUN npm install

COPY . .

COPY --chown=node:node . .

USER node

EXPOSE 8080

CMD [ "node", "app.js" ]
