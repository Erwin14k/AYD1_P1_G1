const User = require("../models/user");



module.exports.userInfo = async (req, res, next) => {
  let args = {
    userId: req.body.userId,
  };
  // Operations on db
  const result=await User.info(args);
  // response
  return res
    .status(200)
    .json({
      messsage: "Data Successfully",
      userData:result,
  });
};
