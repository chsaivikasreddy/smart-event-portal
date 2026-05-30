const express = require("express");

const router = express.Router();

const {
  registerForEvent,
  getUserRegistrations,
} = require("../controllers/registrationController");

router.post("/", registerForEvent);

router.get(
  "/user/:userId",
  getUserRegistrations
);

module.exports = router;