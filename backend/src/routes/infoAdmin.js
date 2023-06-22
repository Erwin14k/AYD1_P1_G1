const express = require("express");
const router = express.Router();

const { adminInfo,deliveryManRequest ,companyRequest,getUserCounters,
disableClient,disableDeliveryMan,disableCompany} = require("../controllers/infoAdmin");

router.post("/admin/info", adminInfo);
router.post("/admin/delivery-man-request",deliveryManRequest);
router.post("/admin/company-request",companyRequest);
router.post("/admin/disable-client",disableClient);
router.post("/admin/disable-company",disableCompany);
router.post("/admin/disable-delivery-man",disableDeliveryMan);
router.get("/admin/users-counters",getUserCounters);
module.exports = router;