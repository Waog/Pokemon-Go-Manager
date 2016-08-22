FROM node:6

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
COPY . /usr/src/app

# Install app dependencies
RUN npm install

# Build App
RUN npm run build

EXPOSE 80
CMD [ "npm", "run", "start:release" ]
