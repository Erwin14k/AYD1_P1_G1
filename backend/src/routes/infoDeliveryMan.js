const express = require("express");
const router = express.Router();

const { deliveryManInfo ,changeAddress, getAllDeliveryManOrders,
selectAnOrderToDeliver,deliverOrder,getAllAvaliableOrders,getComissions,
cancelOrder} = require("../controllers/infoDeliveryMan");

router.get("/delivery-man/info", deliveryManInfo);
router.post("/delivery-man/change-address",changeAddress);
router.get("/delivery-man/get-all-orders",getAllDeliveryManOrders);
router.post("/delivery-man/select-an-order-to-deliver",selectAnOrderToDeliver);
router.post("/delivery-man/deliver-order",deliverOrder);
router.post("/delivery-man/cancel-order",cancelOrder);
router.get("/delivery-man/get-avaliable-orders",getAllAvaliableOrders);
router.get("/delivery-man/get-comission",getComissions);

module.exports = router;