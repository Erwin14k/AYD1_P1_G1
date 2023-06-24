const express = require("express");
const router = express.Router();

const { adminInfo,deliveryManRequest ,companyRequest,getUserCounters,
disableClient,disableDeliveryMan,disableCompany,getAllClients,
getAllCompanies,getAllDevliveryMen,getTop5DeliveryManRating,
getMostSelledProducts,getTop5CompaniesOrdersGenerated} = require("../controllers/infoAdmin");

router.post("/admin/info", adminInfo);
router.post("/admin/delivery-man-request",deliveryManRequest);
router.post("/admin/company-request",companyRequest);
router.post("/admin/disable-client",disableClient);
router.post("/admin/disable-company",disableCompany);
router.post("/admin/disable-delivery-man",disableDeliveryMan);
router.get("/admin/get-all-clients",getAllClients);
router.get("/admin/get-all-delivery-man",getAllDevliveryMen);
router.get("/admin/get-all-companies",getAllCompanies);
router.get("/admin/get-top5-delivery-man",getTop5DeliveryManRating);
router.get("/admin/get-most-selled-products",getMostSelledProducts);
router.get("/admin/get-top-5-companies",getTop5CompaniesOrdersGenerated);
router.get("/admin/users-counters",getUserCounters);
module.exports = router;