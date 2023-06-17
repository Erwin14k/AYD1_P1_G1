const express = require("express");
const router = express.Router();

const { companyInfo,newProduct,newCombo,editProduct,deleteProduct} = require("../controllers/infoCompany");


router.post("/company/new-product", newProduct);
router.post("/company/new-combo", newCombo);
router.get("/company/info", companyInfo);
router.post("/company/edit-product", editProduct);
router.post("/company/delete-product", deleteProduct);
module.exports = router;