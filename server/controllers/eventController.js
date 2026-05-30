const Event = require("../models/Event");

// Create Event
const createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);

    res.status(201).json({
      message: "Event Created Successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find();

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Event
const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);

    res.json({
      message: "Event Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createEvent,
  getEvents,
  deleteEvent,
};