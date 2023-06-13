const express = require("express");
const router = express.Router();

const {
  deliveryManRegistration,
  deliveryManLogin,
} = require("../controllers/deliveryMan");

router.post("/delivery-man/register", deliveryManRegistration);
router.post("/delivery-man/login", deliveryManLogin);

module.exports = router;