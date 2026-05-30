const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

// Test Route
router.get("/test", (req, res) => {
  res.json({
    message: "Auth Route Working",
  });
});

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

module.exports = router;