const express = require("express");
const router = express.Router();

const {
  userRegistration,
  userLogin,
} = require("../controllers/user");

router.post("/user/register", userRegistration);
router.post("/user/login", userLogin);

module.exports = router;