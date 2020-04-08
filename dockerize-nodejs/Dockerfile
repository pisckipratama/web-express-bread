FROM node:8-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app depedencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install

# bundle app source
COPY . .

EXPOSE 8080

CMD ["npm", "start"]