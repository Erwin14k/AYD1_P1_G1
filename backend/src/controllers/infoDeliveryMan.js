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
      message: "Información del repartidor recuperada con éxito!",
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
  if (result==="Pending"){
    // response
  return res
  .status(500)
  .json({
    status:500,
    message: "Estimado repartidor, no puedes cambiar de zona en este momento, tienes pedidos pendientes por entregar :)",
});
  }
  // response
  return res
    .status(200)
    .json({
      status:200,
      message: "Solicitud de cambio de dirección guardada con éxito, un administrador le dará seguimiento!",
  });
};


// Get all orders associated to the delivery man
module.exports.getAllDeliveryManOrders = async (req, res, next) => {
  let args = {
    deliveryManId:req.body.deliveryManId,
  };
  // Operations on db
  const result=await DeliveryMan.getAllDeliveryManOrders(args);
  // response
  return res
    .status(200)
    .json({
      status:200,
      message: "Historial de pedidos gestionados por este repartidor recuperados con éxito!!",
      deliveryManData:result,
  });
};

// Select an order to deliver
module.exports.selectAnOrderToDeliver = async (req, res, next) => {
  let args = {
    orderId:req.body.orderId,
    deliveryManId:req.body.deliveryManId
  };
  // Operations on db
  const result=await DeliveryMan.selectAnOrderToDeliver(args);
  if(result==="Invalid Operation"){
    // response
    return res
    .status(500)
    .json({
      status:500,
      message: `Estimado repartidor, solo puede entregar un pedido a la vez, intente luego de entregar su pedido pendiente!`,
    });
  }
  // response
  return res
    .status(200)
    .json({
      status:200,
      message: `El pedido No.: ${args.orderId}, fue aceptado por un repartidor y está en camino :)`,
  });
};


// Deliver an order
module.exports.deliverOrder = async (req, res, next) => {
  let args = {
    orderId:req.body.orderId,
  };
  // Operations on db
  const result=await DeliveryMan.deliverOrder(args);
  // response
  return res
    .status(200)
    .json({
      status:200,
      message: `El pedido No.: ${args.orderId}, fue entregado a su destino con éxito :)`,
  });
};

// Cancel an order
module.exports.cancelOrder = async (req, res, next) => {
  let args = {
    orderId:req.body.orderId,
  };
  // Operations on db
  const result=await DeliveryMan.cancelOrder(args);
  // response
  return res
    .status(200)
    .json({
      status:200,
      message: `El pedido No.: ${args.orderId}, fue cancelado con éxito :(`,
  });
};


// Get all avaliable orders
module.exports.getAllAvaliableOrders = async (req, res, next) => {
  let args = {
    deliveryManId:req.body.deliveryManId,
  };
  // Operations on db
  const result=await DeliveryMan.getAllAvaliableOrders(args);
  // response
  return res
    .status(200)
    .json({
      status:200,
      message: "Todos los pedidos disponibles en tu zona para entregar recuperados con éxito!",
      deliveryManData:result,
  });
};


// Get delivery man comissions
module.exports.getComissions = async (req, res, next) => {
  let args = {
    deliveryManId:req.body.deliveryManId,
  };
  // Operations on db
  const result=await DeliveryMan.getComissions(args);
  // response
  return res
    .status(200)
    .json({
      status:200,
      message: "El dato de comisiones generadas por este repartidor obtenido con éxito!",
      deliveryManData:result.totalComissions[0],
  });
};
