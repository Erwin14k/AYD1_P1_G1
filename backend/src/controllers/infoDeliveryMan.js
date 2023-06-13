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
      messsage: "Data Successfully",
      deliveryManData:result,
  });
};