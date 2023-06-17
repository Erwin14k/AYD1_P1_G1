const express = require("express");
const router = express.Router();

const { adminInfo,deliveryManRequest ,companyRequest,getUserCounters} = require("../controllers/infoAdmin");

router.get("/admin/info", adminInfo);
router.post("/admin/delivery-man-request",deliveryManRequest)
router.post("/admin/company-request",companyRequest)
router.get("/admin/users-counters",getUserCounters);
module.exports = router;