const DeliveryMan = require("../models/deliveryMan");
const bcrypt = require("bcryptjs");
const upload = require('../utils/multerS3').upload;


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
      // console.log(keyFile);
      
      try {
        const verifyEmail=await DeliveryMan.existEmail(deliveryManEmail);
        //Verify if the email already exists
        if(verifyEmail.length>0 &&verifyEmail[0].deliveryManId){
          // If exists the delivery_man cannot register
          return res.status(500).json({ message: 'El correo proporcionado ya está asociado a otra cuenta de repartidor, intenta con otro correo o inicia sesión con la cuenta asociada!'});
        }
        // If the email not exists, the delivery_man can register
        await DeliveryMan.register(deliveryManName,deliveryManSurname,deliveryManEmail,
              bcrypt.hashSync(deliveryManPassword, 8),deliveryManPhone,deliveryManDepartment,
              deliveryManMunicipality,deliveryManLicenseType,deliveryManTransport,deliveryManResume);
        res.status(200).json({status:200 ,message: 'Repartidor registrado satisfactoriamente, a la espera de la aprobación por el administrador!'}
        );
      } catch (error) {
        console.log(error);
        res.status(500).json({status:500, message: 'Error registrando al repartidor con el correo: '+deliveryManEmail});
      }
    }else{
      return res.status(500).json({ message: 'Fallo en la carga del PDF :(' });
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
        message: "Esta cuenta de repartidor está inhabilitada del sistema, o no ha sido aprobada por un administrador.",
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
            message: "Inicio de sesión exitoso de repartidor :)",
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
      .json({ message: "Correo o contraseña incorrectos :( , intenta de nuevo." });
  } catch (error) {
    console.log(error);
    // if an error occurs
    res
      .status(400)
      .clearCookie("auth_token", { sameSite: "none", secure: true })
      .json({ message: error});
  }
};