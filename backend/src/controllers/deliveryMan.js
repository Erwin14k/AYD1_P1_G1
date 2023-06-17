const DeliveryMan = require("../models/deliveryMan");
const bcrypt = require("bcryptjs");
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client, PutObjectCommand,GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { v4: uuidv4 } = require('uuid');

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accesKey = process.env.ACCES_KEY;
const secretAcceskey = process.env.SECRET_ACCES_KEY;


const s3 = new S3Client({
  credentials: {
    accessKeyId: accesKey,
    secretAccessKey: secretAcceskey,
  },
  region: bucketRegion,
});

// Configure multer middleware to handle the file upload
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, uuidv4() + '.' + file.fieldname);
      },
  }),
});


module.exports.deliveryManRegistration = async (req, res) => {
  
  upload.single('pdf')(req, res, async (err) => {

    if(req.file !== undefined){
      // console.log(req.body);
      // console.log(req.file);
  

      const { deliveryManName, deliveryManSurname,deliveryManEmail, deliveryManPassword,
        deliveryManPhone,deliveryManDepartment,deliveryManMunicipality,deliveryManLicenseType,
        deliveryManTransport } = req.body;
      const deliveryManResume = req.file.location;
      const keyFile = req.file.key 
      
      try {
        const verifyEmail=await DeliveryMan.existEmail(deliveryManEmail);
        //Verify if the email already exists
        if(verifyEmail.length>0 &&verifyEmail[0].deliveryManId){
          // If exists the delivery_man cannot register
          return res.status(500).json({ message: 'This email is already associated with another account, try again with a new email or log in to your associated account!'});
        }
        // If the email not exists, the delivery_man can register
        await DeliveryMan.register(deliveryManName,deliveryManSurname,deliveryManEmail,
              bcrypt.hashSync(deliveryManPassword, 8),deliveryManPhone,deliveryManDepartment,
              deliveryManMunicipality,deliveryManLicenseType,deliveryManTransport,deliveryManResume);
        res.status(200).json({status:200 ,message: 'Delivery Man registered successfully, Waiting for admission approval!!'}
        );
      } catch (error) {
        console.log(error);
        res.status(500).json({status:500, message: 'Error registering the delivery_man with the email: '+deliveryManEmail});
      }
    }else{
      return res.status(500).json({ message: 'PDF upload failed' });
    }

    // Delete element from S3
    // const deleteParams = {
    //   Bucket: bucketName,
    //   Key: keyFile,
    // };
    // const commandDelete = new DeleteObjectCommand(deleteParams);
    // await s3.send(commandDelete);
    // console.log(req.file.location);
  });
};



module.exports.deliveryManLogin = async (req, res, next) => {
  let args = {
    deliveryManEmail: req.body.userEmail,
    deliveryManPassword: req.body.userPassword,
  };
  try {
    const verifyStatus=await DeliveryMan.verifyStatus(args.deliveryManEmail);
    //Verify if the delivery_man has an active status
    if(verifyStatus.length>0 &&verifyStatus[0].deliveryManStatus!=="Active"){
      // If the user is not active
      return res.status(403).json({
        status: 403,
        message: "Usuario aun no ha sido autorizado",
      });
    }
    // Find the password
    const collectedPassword = await DeliveryMan.hashPassword(args);
    // Verify if exists the password
    if (collectedPassword.length > 0) {
      // Password collect
      const hashPassword = collectedPassword[0]["delivery_man_password"];
      // Verify coincidence
      if (bcrypt.compareSync(args.deliveryManPassword, hashPassword)) {
        args = { deliveryManEmail: args.deliveryManEmail, deliveryManPassword: hashPassword };
        // Operations on db
        const result=await DeliveryMan.login(args);
        // response
        return res
          .status(200)
          .json({
            status: 200,
            type: 3,
            message: "Login Successfully Delivery Man",
            data: [
              {
                deliveryManId:result[4],
                deliveryManEmail: result[3],
                deliveryManName:result[1],
                deliveryManSurname:result[2],
                authToken: result[0],
              },
            ],
          });
      }
    }
    // If not exists a delivery_man coincidence
    res
      .status(409)
      .clearCookie("auth_token", { sameSite: "none", secure: true })
      .json({ message: "Email or password not valid" });
  } catch (error) {
    console.log(error);
    // if an error occurs
    res
      .status(400)
      .clearCookie("auth_token", { sameSite: "none", secure: true })
      .json({ message: error});
  }
};