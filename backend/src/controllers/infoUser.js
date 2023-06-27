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

// Get all orders associated to customer
module.exports.getAllUserOrders = async (req, res, next) => {
  try {
    let args = {
      userId: req.body.userId,
    };

    console.log(args);
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
