const express = require("express");
const router = express.Router();

const {
  userInfo,
  getAllProducts,
  getAllCombos,
  getAllCompanies,
  getAllUserOrders,
} = require("../controllers/infoUser");

router.get("/user/info", userInfo);
router.get("/user/get-all-products", getAllProducts);
router.get("/user/get-all-combos", getAllCombos);
router.get("/user/get-all-companies", getAllCompanies);
router.get("/user/get-all-orders", getAllUserOrders);

module.exports = router;
