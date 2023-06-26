const express = require("express");
const router = express.Router();

const { deliveryManInfo ,changeAddress, getAllDeliveryManOrders} = require("../controllers/infoDeliveryMan");

router.get("/delivery-man/info", deliveryManInfo);
router.post("delivery-man/change-address",changeAddress);
router.get("/delivery-man/get-all-orders",getAllDeliveryManOrders);

module.exports = router;