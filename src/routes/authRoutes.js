const express = require("express");
const {
  register,
  login,
  changePassword,
} = require("../controllers/authController.js");
const { protect } = require("../middleware/auth.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/change-password", protect, changePassword);

module.exports = router;
