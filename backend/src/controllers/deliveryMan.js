const DeliveryMan = require("../models/deliveryMan");
const bcrypt = require("bcryptjs");

module.exports.deliveryManRegistration = async (req, res) => {
  const { deliveryManName, deliveryManSurname,deliveryManEmail, deliveryManPassword,
    deliveryManPhone,deliveryManDepartment,deliveryManMunicipality,deliveryManLicenseType,
    deliveryManTransport,deliveryManResume } = req.body;

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
    res.status(200).json(
      { message: 'Delivery Man registered successfully, Waiting for admission approval!!'}
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error registering the delivery_man with the email: '+deliveryManEmail});
  }
};

module.exports.deliveryManLogin = async (req, res, next) => {
  let args = {
    deliveryManEmail: req.body.deliveryManEmail,
    deliveryManPassword: req.body.deliveryManPassword,
  };
  try {
    const verifyStatus=await DeliveryMan.verifyStatus(args.deliveryManEmail);
    //Verify if the delivery_man has an active status
    if(verifyStatus.length>0 &&verifyStatus[0].deliveryManStatus!=="Active"){
      // If the user is not active
      return res.status(403).json({
        message: "Unauthorized",
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
            messsage: "Login Successfully",
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
      .json({ messsage: "Email or password not valid" });
  } catch (error) {
    console.log(error);
    // if an error occurs
    res
      .status(400)
      .clearCookie("auth_token", { sameSite: "none", secure: true })
      .json({ messsage: error});
  }
};