const User = require("../models/User");
const Event = require("../models/Event");
const Registration = require("../models/Registration");

const getStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const events = await Event.countDocuments();
    const registrations =
      await Registration.countDocuments();

    res.json({
      users,
      events,
      registrations,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getStats,
};