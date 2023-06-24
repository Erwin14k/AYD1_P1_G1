const Admin = require("../models/admin");


// Admin info
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

// Delivery man registration request
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

// Company registration request
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


// Disable a client
module.exports.disableClient = async (req, res, next) => {
  let args = {
    userId: req.body.userId,
  };
  // Operations on db
  const result=await Admin.disableClient(args);
  // response
  return res
    .status(200)
    .json({
      status:200,
      message: `El usuario con el id: ${args.userId}, se ha deshabilitado del sistema!`,
  });
};

// Disable a delivery_man
module.exports.disableDeliveryMan = async (req, res, next) => {
  let args = {
    deliveryManId: req.body.deliveryManId,
  };
  // Operations on db
  const result=await Admin.disableDeliveryMan(args);
  if (result==="Disabled"){
    // response
    return res
    .status(200)
    .json({
      status:200,
      message: `El Repartidor con el id: ${args.deliveryManId}, se ha deshabilitado del sistema!`,
    });
  }else if(result=="Pending"){
    // response
    return res
    .status(200)
    .json({
      status:200,
      message: `El Repartidor con el id: ${args.deliveryManId}, no puede deshabilitarse del sistema, tiene un pedido en progreso!`,
    });
  }
  
};

// Disable a company
module.exports.disableCompany = async (req, res, next) => {
  let args = {
    companyId: req.body.companyId,
  };
  // Operations on db
  const result=await Admin.disableCompany(args);
  if (result==="Disabled"){
    // response
    return res
    .status(200)
    .json({
      status:200,
      message: `La empresa con el id: ${args.companyId}, se ha deshabilitado del sistema!`,
    });
  }else if(result=="Pending"){
    // response
    return res
    .status(200)
    .json({
      status:200,
      message: `La empresa con el id: ${args.companyId}, no puede deshabilitarse del sistema, tiene un pedido en progreso!`,
    });
  }
  
};


// Get all clients
module.exports.getAllClients = async (req, res, next) => {
  let args = {
    adminId: req.body.adminId,
  };
  // Operations on db
  const result=await Admin.getAllClients(args);
  // response
  return res
    .status(200)
    .json({
      status:200,
      messsage: "Clientes obtenidos con éxito!!",
      adminData:result,
  });
};

// Get all delivery_men
module.exports.getAllDevliveryMen = async (req, res, next) => {
  let args = {
    adminId: req.body.adminId,
  };
  // Operations on db
  const result=await Admin.getAllDevliveryMen(args);
  // response
  return res
    .status(200)
    .json({
      status:200,
      messsage: "Repartidores obtenidos con éxito!!",
      adminData:result,
  });
};

// Get all companies
module.exports.getAllCompanies = async (req, res, next) => {
  let args = {
    adminId: req.body.adminId,
  };
  // Operations on db
  const result=await Admin.getAllCompanies(args);
  // response
  return res
    .status(200)
    .json({
      status:200,
      messsage: "Empresas obtenidas con éxito!!",
      adminData:result,
  });
};


// Users counters by status report
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
        blockedDeliveryManCount:result[0].blockedDeliveryManCount,
        activeCompaniesCount:result[0].activeCompaniesCount,
        waitingCompaniesCount:result[0].waitingCompaniesCount,
        declinedCompaniesCount:result[0].declinedCompaniesCount,
        blockedCompaniesCount:result[0].blockedCompaniesCount
      }
  });
};