# Specify a base image
FROM node:20-alpine3.17

# Install some dependencies
WORKDIR /simpleweb
COPY ./ /simpleweb
RUN npm install
RUN npm install -g npm@9.8.1

# Default command

CMD ["npm", "start"]