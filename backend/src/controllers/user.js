const User = require("../models/user");
const bcrypt = require("bcryptjs");

module.exports.userRegistration = async (req, res) => {
  const { userEmail, userPassword,userName,userSurname } = req.body;

  try {
    const verifyEmail=await User.existEmail(userEmail);
    //Verify if the email already exists
    if(verifyEmail.length>0 &&verifyEmail[0].userId){
      // If exists the user cannot register
      return res.status(500).json({ message: 'This email is already associated with another account, try again with a new email or log in to your associated account!'});
    }
    // If not exists the user can register
    await User.register(userEmail, bcrypt.hashSync(userPassword, 8),userName,userSurname);
    res.status(200).json(
      { message: 'User registered successfully'}
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error registering the user with the email: '+userEmail});
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
        message: "Unauthorized",
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
            messsage: "Login Successfully",
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
