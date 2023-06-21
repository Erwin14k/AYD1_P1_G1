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
      status:200,
      messsage: "Información del administrador recuperada con éxito!",
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
      status:200,
      message: `El repartidor con el id: ${args.deliveryManId}, Su estado a cambiado a: ${args.deliveryManStatus}`,
  });
};

module.exports.companyRequest = async (req, res, next) => {
  let args = {
    companyId: req.body.companyId,
    companyStatus:req.body.companyStatus,
  };
  console.log(args);
  // Operations on db
  const result=await Admin.companyRequest(args);
  // response
  return res
    .status(200)
    .json({
      status:200,
      message: `La empresa con el id: ${args.companyId}, Su estado a cambiado a: ${args.companyStatus}`,
  });
};


module.exports.getUserCounters = async (req, res, next) => {
  // Operations on db
  const result=await Admin.getUserCounters();
  // response
  return res
    .status(200)
    .json({
      status:200,
      message: `Contadores de usuarios segun sus estados, obtenidos con éxito!`,
      data:{
        activeUserCount:result[0].activeUserCount,
        blockedUserCount:result[0].blockedUserCount,
        activeDeliveryManCount:result[0].activeDeliveryManCount,
        waitingDeliveryManCount:result[0].waitingDeliveryManCount,
        declinedDeliveryManCount:result[0].declinedDeliveryManCount,
        activeCompaniesCount:result[0].activeCompaniesCount,
        waitingCompaniesCount:result[0].waitingCompaniesCount,
        declinedCompaniesCount:result[0].declinedCompaniesCount
      }
  });
};