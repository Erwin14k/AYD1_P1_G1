const express = require("express");
const router = express.Router();

const { companyInfo } = require("../controllers/infoCompany");

router.get("/company/info", companyInfo);

module.exports = router;