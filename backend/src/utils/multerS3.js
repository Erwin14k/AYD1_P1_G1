const multer = require('multer');
const multerS3 = require('multer-s3');
const AmazonS3 = require('../config/amazonS3');
const { v4: uuidv4 } = require('uuid');


// Configure multer middleware to handle the file upload
module.exports = {
   upload: multer({
      storage: multerS3({
        s3: AmazonS3.s3,
        bucket: AmazonS3.bucketName,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
          cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
          cb(null, uuidv4() + '.' + file.fieldname);
          },
      }),
    })
};

