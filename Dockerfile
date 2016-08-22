FROM node:6

# Pull App
WORKDIR /usr/src
RUN git clone https://github.com/Waog/Pokemon-Go-Manager.git app
WORKDIR app

# install dependencies
RUN npm install

# Build App
RUN npm run build

EXPOSE 80
CMD [ "npm", "run", "start:release" ]
