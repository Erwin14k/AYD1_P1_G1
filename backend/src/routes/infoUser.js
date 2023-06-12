const express = require("express");
const router = express.Router();

const { userInfo } = require("../controllers/infoUser");

router.get("/user/info", userInfo);

module.exports = router;