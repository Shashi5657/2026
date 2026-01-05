#Base Image
FROM node:18

#set working directory inside container
WORKDIR /app

#copy package.json files
COPY package*.json ./

#install dependencies
RUN npm install

#copy app source code
COPY . .

#expose app port
EXPOSE 8001

#start the app
CMD ["node", "index.js"]
