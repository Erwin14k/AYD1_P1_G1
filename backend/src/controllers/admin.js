const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");


module.exports.adminLogin = async (req, res, next) => {
  
  // Body request parameters
  let args = {
    adminEmail: req.body.userEmail,
    adminPassword: req.body.userPassword,
  };
  console.log("adminLogin",args);
  try {
    const verifyStatus=await Admin.verifyStatus(args.adminEmail);
    //Verify if the admin has an active status
    if(verifyStatus.length>0 &&verifyStatus[0].adminStatus!=="Active"){
      // If the admin is not active
      return res.status(403).json({
        status: 403,
        message: "Admin esta inactivo",
      });
    }
    // Find the password
    const collectedPassword = await Admin.hashPassword(args);
    // Verify if exists the password
    if (collectedPassword.length > 0) {
      // Password collect
      const hashPassword = collectedPassword[0]["admin_password"];
      // Verify coincidence
      if ((args.adminPassword=== hashPassword)) {
        args = { adminEmail: args.adminEmail, adminPassword: hashPassword };
        // Operations on db
        const result=await Admin.login(args);
        // response
        return res
          .status(200)
          .json({
            status: 200,
            type: 0,
            message: "Login Successfully Admin",
            data: [
              {
                adminId:result[3],
                adminEmail: result[2],
                adminName:result[1],
                authToken: result[0],
              },
            ],
          });
      }
    }
    // If not exists an admin coincidence
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
      .json({ messsage: error});
  }
};