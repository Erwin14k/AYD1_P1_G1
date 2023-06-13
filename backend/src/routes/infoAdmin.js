const express = require("express");
const router = express.Router();

const { adminInfo,deliveryManRequest ,companyRequest} = require("../controllers/infoAdmin");

router.get("/admin/info", adminInfo);
router.post("/admin/delivery-man-request",deliveryManRequest)
router.post("/admin/company-request",companyRequest)
module.exports = router;