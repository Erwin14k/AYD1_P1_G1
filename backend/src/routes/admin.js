const express = require("express");
const router = express.Router();

const {
  adminLogin,
} = require("../controllers/admin");

router.post("/admin/login", adminLogin);

module.exports = router;