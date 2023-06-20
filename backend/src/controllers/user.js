const User = require("../models/user");
const bcrypt = require("bcryptjs");

module.exports.userRegistration = async (req, res) => {
  const { userEmail, userPassword,userName,userSurname } = req.body;

  try {
    const verifyEmail=await User.existEmail(userEmail);
    //Verify if the email already exists
    if(verifyEmail.length>0 &&verifyEmail[0].userId){
      // If exists the user cannot register
      return res.status(500).json({status: 500, message: 'El correo proporcionado ya está asociado a otra cuenta de cliente, intenta con otro correo o inicia sesión con la cuenta asociada!'});
    }
    // If not exists the user can register
    await User.register(userEmail, bcrypt.hashSync(userPassword, 8),userName,userSurname);
    res.status(200).json(
      { status: 200,message: 'Cliente registrado satisfactoriamente!!'}
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({status: 500, message: 'Error registrando al cliente con el correo: '+userEmail});
  }
};

module.exports.userLogin = async (req, res, next) => {
  let args = {
    userEmail: req.body.userEmail,
    userPassword: req.body.userPassword,
  };


  try {
    const verifyStatus=await User.verifyStatus(args.userEmail);
    //Verify if the user has an active status
   
    if(verifyStatus.length>0 && verifyStatus[0].userStatus!=="Active"){
      // If the user is not active
      return res.status(403).json({
        status: 403,
        message: "Esta cuenta de cliente, se encuentra inhabilitada del sistema :(",
      });
    }
    // Find the password
    const collectedPassword = await User.hashPassword(args);
    // Verify if exists the password
    if (collectedPassword.length > 0) {
      // Password collect
      const hashPassword = collectedPassword[0]["user_password"];
      // Verify coincidence
      if (bcrypt.compareSync(args.userPassword, hashPassword)) {
        args = { userEmail: args.userEmail, userPassword: hashPassword };
        // Operations on db
        const result=await User.login(args);
        // response
        return res
          .status(200)
          .json({
            status: 200,
            type: 1,
            message: "Inicio de sesión exitoso como cliente :)",
            data: [
              {
                userId:result[4],
                userEmail: result[3],
                userName:result[1],
                userSurname:result[2],
                authToken: result[0],
              },
            ],
          });
      }
    }
    // If not exists a user coincidence
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
