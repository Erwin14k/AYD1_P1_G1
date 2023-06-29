const express = require("express");
const router = express.Router();

const { deliveryManInfo ,changeAddress, getAllDeliveryManOrders,
selectAnOrderToDeliver,deliverOrder} = require("../controllers/infoDeliveryMan");

router.get("/delivery-man/info", deliveryManInfo);
router.post("/delivery-man/change-address",changeAddress);
router.get("/delivery-man/get-all-orders",getAllDeliveryManOrders);
router.post("/delivery-man/select-an-order-to-deliver",selectAnOrderToDeliver);
router.post("/delivery-man/deliver-order",deliverOrder);

module.exports = router;