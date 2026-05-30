const Registration = require("../models/Registration");
const { Parser } = require("json2csv");

const exportRegistrations = async (
  req,
  res
) => {
  try {
    const registrations =
      await Registration.find()
        .populate("userId")
        .populate("eventId");

    const data = registrations.map(
      (registration) => ({
        Name:
          registration.userId?.name || "",
        Email:
          registration.userId?.email || "",
        Event:
          registration.eventId?.title || "",
        TicketNumber:
          registration.ticketNumber,
      })
    );

    const parser = new Parser();

    const csv = parser.parse(data);

    res.header(
      "Content-Type",
      "text/csv"
    );

    res.attachment(
      "registrations.csv"
    );

    return res.send(csv);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  exportRegistrations,
};