const { S3Client} = require("@aws-sdk/client-s3");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
   bucketName: process.env.BUCKET_NAME,
   s3: new S3Client({
      credentials: {
        accessKeyId: process.env.ACCES_KEY,
        secretAccessKey: process.env.SECRET_ACCES_KEY,
      },
      region: process.env.BUCKET_REGION,
    })
};


