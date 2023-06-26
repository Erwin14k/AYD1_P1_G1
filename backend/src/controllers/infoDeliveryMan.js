const DeliveryMan = require("../models/deliveryMan");



module.exports.deliveryManInfo = async (req, res, next) => {
  let args = {
    deliveryManId: req.body.deliveryManId,
  };
  // Operations on db
  const result=await DeliveryMan.info(args);
  // response
  return res
    .status(200)
    .json({
      messsage: "Información del repartidor recuperada con éxito!",
      deliveryManData:result,
  });
};


module.exports.changeAddress = async (req, res, next) => {
  let args = {
    deliveryManId: req.body.deliveryManId,
    newDepartment:req.body.newDepartment,
    newMunicipality:req.body.newMunicipality,
    changeDescription:req.body.changeDescription,
  };
  // Operations on db
  const result=await DeliveryMan.changeAddress(args);
  // response
  return res
    .status(200)
    .json({
      status:200,
      messsage: "Solicitud de cambio de dirección guardada con éxito, un administrador le dará seguimiento!",
  });
};


// Get all orders associated to the company
module.exports.getAllDeliveryManOrders = async (req, res, next) => {
  let args = {
    deliveryManId:req.body.deliveryManId,
  };
  // Operations on db
  const result=await Company.getAllDeliveryManOrders(args);
  // response
  return res
    .status(200)
    .json({
      status:200,
      messsage: "Historial de pedidos gestionados por este repartidor recuperados con éxito!!",
      companyData:result,
  });
};
