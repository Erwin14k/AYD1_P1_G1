FROM node:alpine
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build 
EXPOSE 3000
CMD ["npm", "start"]
#docker build --pull --rm -f "Dockerfile" -t serchiboi/frontend_ayd1:latest "./"
#docker push serchiboi/frontend_ayd1