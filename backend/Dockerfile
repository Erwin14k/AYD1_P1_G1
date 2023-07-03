FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT="4200"
ENV DB_HOST="alchilazo.cxrmksgpe29a.us-east-2.rds.amazonaws.com"
ENV DB_USER="root"
ENV DB_PASSWORD="rootroot"
ENV DB_NAME="al_chilazo" 

ENV BUCKET_NAME="ayd1storagedata"

ENV BUCKET_REGION="us-east-2"
ENV ACCES_KEY="AKIAUUWVNCBIIB27UN62"
ENV SECRET_ACCES_KEY="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"

EXPOSE 4200
CMD [ "npm", "start" ]
#docker build --pull --rm -f "Dockerfile" -t serchiboi/backend_ayd1:latest "./"
#docker push serchiboi/backend_ayd1