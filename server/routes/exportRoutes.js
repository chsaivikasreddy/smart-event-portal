const express = require("express");

const router = express.Router();

const {
  exportRegistrations,
} = require("../controllers/exportController");

router.get(
  "/registrations",
  exportRegistrations
);

module.exports = router;