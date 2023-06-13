const express = require("express");
const router = express.Router();

const {
  companyRegistration,
  companyLogin,
} = require("../controllers/company");

router.post("/company/register", companyRegistration);
router.post("/company/login", companyLogin);

module.exports = router;