const express = require("express");
const router = express.Router();

const { deliveryManInfo } = require("../controllers/infoDeliveryMan");

router.get("/delivery-man/info", deliveryManInfo);

module.exports = router;