const Registration = require("../models/Registration");
const Event = require("../models/Event");
const User = require("../models/User");

const {
  sendRegistrationEmail,
} = require("../utils/emailService");

// Register Event
const registerForEvent = async (
  req,
  res
) => {
  try {
    const { userId, eventId } = req.body;

    const event = await Event.findById(
      eventId
    );

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    const user = await User.findById(
      userId
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (
      (event.registeredCount || 0) >=
      event.seats
    ) {
      return res.status(400).json({
        message: "Event Sold Out",
      });
    }

    const existing =
      await Registration.findOne({
        userId,
        eventId,
      });

    if (existing) {
      return res.status(400).json({
        message: "Already Registered",
      });
    }

    const ticketNumber =
      "TICKET-" +
      Math.floor(
        100000 + Math.random() * 900000
      );

    const registration =
      await Registration.create({
        userId,
        eventId,
        ticketNumber,
      });

    event.registeredCount =
      (event.registeredCount || 0) + 1;

    await event.save();

    try {
      await sendRegistrationEmail(
        user.email,
        user.name,
        event.title,
        ticketNumber
      );

      console.log(
        "Email sent successfully"
      );
    } catch (emailError) {
      console.log(
        "Email Error:",
        emailError.message
      );
    }

    res.status(201).json({
      message:
        "Event Registration Successful",
      registration,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get User Registrations
const getUserRegistrations = async (
  req,
  res
) => {
  try {
    const registrations =
      await Registration.find({
        userId: req.params.userId,
      }).populate("eventId");

    res.status(200).json(
      registrations
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerForEvent,
  getUserRegistrations,
};