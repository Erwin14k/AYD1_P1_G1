const express = require("express");
const router = express.Router();

const {
  userInfo,
  getAllProducts,
  getAllCombos,
  getAllCompanies,
  getAllUserOrders,
  rateDelivery,
  generateOrder
} = require("../controllers/infoUser");

router.get("/user/info", userInfo);
router.get("/user/get-all-products", getAllProducts);
router.get("/user/get-all-combos", getAllCombos);
router.get("/user/get-all-companies", getAllCompanies);
router.get("/user/get-all-orders", getAllUserOrders);
router.post("/user/set-order-rate", rateDelivery);
router.post("/user/generate-order", generateOrder);

module.exports = router;
