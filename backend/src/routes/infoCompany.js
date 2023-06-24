const express = require("express");
const router = express.Router();

const { companyInfo,newProduct,newCombo,editProduct,deleteProduct,editCombo,deleteCombo,
getMostSelledProducts,getAllCompanyOrders,approveOrder,getAllWaitingCompanyOrders} = require("../controllers/infoCompany");


router.post("/company/new-product", newProduct);
router.post("/company/new-combo", newCombo);
router.get("/company/info", companyInfo);
router.post("/company/edit-product", editProduct);
router.post("/company/delete-product", deleteProduct);
router.post("/company/edit-combo", editCombo);
router.post("/company/delete-combo", deleteCombo);
router.get("/company/get-most-selled-products",getMostSelledProducts);
router.get("/company/get-all-orders",getAllCompanyOrders);
router.get("/company/get-all-waiting-orders",getAllWaitingCompanyOrders);
router.post("/company/approve-order", approveOrder);
module.exports = router;