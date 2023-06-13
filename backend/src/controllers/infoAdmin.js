const Admin = require("../models/admin");



module.exports.adminInfo = async (req, res, next) => {
  let args = {
    adminId: req.body.adminId,
  };
  // Operations on db
  const result=await Admin.info(args);
  // response
  return res
    .status(200)
    .json({
      messsage: "Data Successfully",
      adminData:result,
  });
};

module.exports.deliveryManRequest = async (req, res, next) => {
  let args = {
    deliveryManId: req.body.deliveryManId,
    deliveryManStatus:req.body.deliveryManStatus,
  };
  // Operations on db
  const result=await Admin.deliveryManRequest(args);
  // response
  return res
    .status(200)
    .json({
      message: `Delivery man with the id: ${args.deliveryManId}, updated to: ${args.deliveryManStatus}`,
  });
};

module.exports.companyRequest = async (req, res, next) => {
  let args = {
    companyId: req.body.companyId,
    companyStatus:req.body.companyStatus,
  };
  // Operations on db
  const result=await Admin.companyRequest(args);
  // response
  return res
    .status(200)
    .json({
      message: `Company with the id: ${args.companyId}, updated to: ${args.companyStatus}`,
  });
};