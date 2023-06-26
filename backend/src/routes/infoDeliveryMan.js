const express = require("express");
const router = express.Router();

const { deliveryManInfo ,changeAddress} = require("../controllers/infoDeliveryMan");

router.get("/delivery-man/info", deliveryManInfo);
router.post("delivery-man/change-address",changeAddress);
router.get("/delivery-man/get-all-orders",getAllCompanyOrders);

module.exports = router;