const Company = require("../models/company");
const bcrypt = require("bcryptjs");
const upload = require('../utils/multerS3').upload;

module.exports.companyRegistration = async (req, res) => {

  upload.single('pdf')(req, res, async (err) => {

    if(req.file !== undefined){
      console.log(req.body);
      console.log(req.file);

      const { companyName, companyDescription,companyEmail,companyPassword,companyCategory,
        companyDepartment,companyMunicipality,companyAddress} = req.body;
      const companyFile = req.file.location;
      const keyFile = req.file.key; 
      // console.log(keyFile);

      try {
        const verifyEmail=await Company.existEmail(companyEmail);
        //Verify if the email already exists
        if(verifyEmail.length>0 &&verifyEmail[0].companyId){
          // If exists the company cannot register
          return res.status(500).json({status:500, message: 'El correo proporcionado ya está asociado a otra cuenta de empresa, intenta con otro correo o inicia sesión con la cuenta asociada!'});
        }
        // If the email not exists, the company can register
        await Company.register(companyName,companyDescription,companyCategory,companyEmail,
              bcrypt.hashSync(companyPassword, 8),companyDepartment,companyMunicipality,
              companyAddress,companyFile,keyFile);
        res.status(200).json(
          {status:200,  message: 'Empresa registrada satisfactoriamente, a la espera de la aprobación por el administrador!'}
        );
      } catch (error) {
        console.log(error);
        res.status(500).json({status:500, message: 'Error registrando a la empresa con el correo: '+companyEmail});
      }
    }else{
      return res.status(500).json({status:500, message: 'Fallo en la carga del PDF :(' });
    }
  });
};

module.exports.companyLogin = async (req, res, next) => {
  let args = {
    companyEmail: req.body.userEmail,
    companyPassword: req.body.userPassword,
  };
  
  try {
    const verifyStatus=await Company.verifyStatus(args.companyEmail);
    //Verify if the company has an active or waiting status 
    if(verifyStatus.length>0 && verifyStatus[0].companyStatus!=="Active"){
      // If the company is not active and not waiting a response
      return res.status(403).json({
        status: 403,
        message: "La empresa está inhabilitada del sistema, o no ha sido aprobada por un administrador.",
      });
    }
    // Find the password
    const collectedPassword = await Company.hashPassword(args);
    // Verify if exists the password
    if (collectedPassword.length > 0) {
      // Password collect
      const hashPassword = collectedPassword[0]["company_password"];
      // Verify coincidence
      if (bcrypt.compareSync(args.companyPassword, hashPassword)) {
        args = { companyEmail: args.companyEmail, companyPassword: hashPassword };
        // Operations on db
        const result=await Company.login(args);
        // response
        return res
          .status(200)
          .json({
            status: 200,
            type: 3,
            message: "Inicio de sesión exitoso de empresa :)",
            data: [
              {
                companyId:result[4],
                companyCategory: result[3],
                companyName:result[1],
                companyDescription:result[2],
                authToken: result[0],
                companyStatus:result[5],
              },
            ],
          });
      }
    }
    // If not exists a company coincidence
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