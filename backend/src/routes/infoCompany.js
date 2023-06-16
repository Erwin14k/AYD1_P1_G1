const express = require("express");
const router = express.Router();

const { companyInfo,newProduct,newCombo} = require("../controllers/infoCompany");


router.post("/company/new-product", newProduct);
router.post("/company/new-combo", newCombo);
router.get("/company/info", companyInfo);

module.exports = router;