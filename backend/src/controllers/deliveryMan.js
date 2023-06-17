const DeliveryMan = require("../models/deliveryMan");
const bcrypt = require("bcryptjs");
const multer = require('multer');
const { S3Client, PutObjectCommand,GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { v4: uuidv4 } = require('uuid');

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accesKey = process.env.ACCES_KEY;
const secretAcceskey = process.env.SECRET_ACCES_KEY;

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const s3 = new S3Client({
  credentials: {
    accessKeyId: accesKey,
    secretAccessKey: secretAcceskey,
  },
  region: bucketRegion,
});


module.exports.deliveryManRegistration = async (req, res) => {
  
  upload.single('pdf')(req, res, async (err) => {

    console.log(req.body);
    console.log(req.file);
    req.file.buffer 

    const fileName = uuidv4()
    const params = {
      Bucket: bucketName,
      Key: fileName,
      //Key: req.file.originalname,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    }

    const commandPut = new PutObjectCommand(params)

    await s3.send(commandPut)

    const getObjectParams = {
      Bucket: bucketName,
      Key: fileName,
    };

    const commandGet = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, commandGet, { expiresIn: 3600 });

    const deleteParams = {
      Bucket: bucketName,
      Key: fileName,
    };

    const commandDelete = new DeleteObjectCommand(deleteParams);

    await s3.send(commandDelete);

    res.status(500).json({ message: 'PDF upload successfully', url: url });

    // if (err instanceof multer.MulterError) {
    //   // Handle multer errors, if any
    //   return res.status(400).json({ message: 'Error uploading the PDF document' });
    // } else if (err) {
    //   // Handle other errors, if any
    //   return res.status(500).json({ message: 'Unexpected error occurred' });
    // }else{
    //   return res.status(500).json({ message: 'PDF upload successfully' });
    // }

  });
};




// module.exports.deliveryManRegistration =  upload.single('pdf'),async (req, res) => {
//   console.log("HERE");
//   const { deliveryManName, deliveryManSurname,deliveryManEmail, deliveryManPassword,
//     deliveryManPhone,deliveryManDepartment,deliveryManMunicipality,deliveryManLicenseType,
//     deliveryManTransport,deliveryManResume, deliveryCV } = req.body;

//     console.log("CV:",deliveryCV)

//   try {
//     const verifyEmail=await DeliveryMan.existEmail(deliveryManEmail);
//     //Verify if the email already exists
//     if(verifyEmail.length>0 &&verifyEmail[0].deliveryManId){
//       // If exists the delivery_man cannot register
//       return res.status(500).json({ message: 'This email is already associated with another account, try again with a new email or log in to your associated account!'});
//     }
//     // If the email not exists, the delivery_man can register
//     await DeliveryMan.register(deliveryManName,deliveryManSurname,deliveryManEmail,
//           bcrypt.hashSync(deliveryManPassword, 8),deliveryManPhone,deliveryManDepartment,
//           deliveryManMunicipality,deliveryManLicenseType,deliveryManTransport,deliveryManResume);
//     res.status(200).json(
//       { message: 'Delivery Man registered successfully, Waiting for admission approval!!'}
//     );
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Error registering the delivery_man with the email: '+deliveryManEmail});
//   }
// };


// module.exports.deliveryManRegistration = async (req, res) => {
//   const { deliveryManName, deliveryManSurname,deliveryManEmail, deliveryManPassword,
//     deliveryManPhone,deliveryManDepartment,deliveryManMunicipality,deliveryManLicenseType,
//     deliveryManTransport,deliveryManResume, deliveryCV } = req.body;

//     console.log("CV:",deliveryCV)

//   try {
//     const verifyEmail=await DeliveryMan.existEmail(deliveryManEmail);
//     //Verify if the email already exists
//     if(verifyEmail.length>0 &&verifyEmail[0].deliveryManId){
//       // If exists the delivery_man cannot register
//       return res.status(500).json({ message: 'This email is already associated with another account, try again with a new email or log in to your associated account!'});
//     }
//     // If the email not exists, the delivery_man can register
//     await DeliveryMan.register(deliveryManName,deliveryManSurname,deliveryManEmail,
//           bcrypt.hashSync(deliveryManPassword, 8),deliveryManPhone,deliveryManDepartment,
//           deliveryManMunicipality,deliveryManLicenseType,deliveryManTransport,deliveryManResume);
//     res.status(200).json(
//       { message: 'Delivery Man registered successfully, Waiting for admission approval!!'}
//     );
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Error registering the delivery_man with the email: '+deliveryManEmail});
//   }
// };

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