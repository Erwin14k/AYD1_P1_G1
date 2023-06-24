const express = require("express");
const router = express.Router();

const { userInfo,getAllProducts,getAllCombos } = require("../controllers/infoUser");

router.get("/user/info", userInfo);
router.get("/user/get-all-products",getAllProducts);
router.get("/user/get-all-combos",getAllCombos);

module.exports = router;