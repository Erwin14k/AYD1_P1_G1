const User = require("../models/user");

module.exports.userInfo = async (req, res, next) => {
  let args = {
    userId: req.body.userId,
  };
  // Operations on db
  const result = await User.info(args);
  // response
  return res.status(200).json({
    messsage: "Información del cliente recuperada con éxito!",
    userData: result,
  });
};

module.exports.getAllProducts = async (req, res, next) => {
  // Operations on db
  const result = await User.getAllProducts();
  // response
  return res.status(200).json({
    messsage: "Información de los productos recuperada con éxito!",
    userData: result,
  });
};

module.exports.getAllCombos = async (req, res, next) => {
  // Operations on db
  const result = await User.getAllCombos();
  // response
  return res.status(200).json({
    messsage: "Información de los combos recuperada con éxito!",
    userData: result,
  });
};

// Get all companies
module.exports.getAllCompanies = async (req, res, next) => {
  // Operations on db
  const result = await User.getAllCompanies();
  // response
  return res.status(200).json({
    status: 200,
    messsage: "Empresas obtenidas con éxito!!",
    adminData: result,
  });
};
// Get all orders associated to customer
module.exports.getAllUserOrders = async (req, res, next) => {
  try {
    let args = {
      userId: req.body.userId,
    };
    // Operations on db
    const result = await User.getAllUserOrders(args);
    // response
    return res.status(200).json({
      status: 200,
      messsage: "Pedidos gestionados por el usuario, completo!",
      UserData: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Falta error", error: error });
  }
};

module.exports.rateDelivery = async (req, res, next) => {
  let args = {
    deliveryManId: req.body.deliveryManId,
    rating: req.body.rating,
    orderId: req.body.orderId,
  };
  // Operations on db
  const result = await User.rateDelivery(args);
  // response
  return res.status(200).json({
    status: 200,
    message: `La orden ${args.orderId} fue calificada con Exito!:)`,
  });
};



// Generate a new order
module.exports.generateOrder = async (req, res, next) => {
  try {
    let args = {
      userId: req.body.user_id,
      companyId:req.body.company_id,
      couponId:req.body.coupon_id,
      orderTotal:req.body.total,
      orderComission:req.body.comision,
      orderDepartment:req.body.departamentCompany,
      items:req.body.items
    };
    // Operations on db
    const result = await User.generateOrder(args);
    // response
    return res.status(200).json({
      status: 200,
      messsage: "Pedido generado con éxito, a la espera de aprobación por la empresa proveedora!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Falta error", error: error });
  }
};