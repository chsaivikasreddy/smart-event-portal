const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendRegistrationEmail = async (
  email,
  name,
  eventName,
  ticketNumber
) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Event Registration Confirmation",
    html: `
      <h2>Hello ${name},</h2>

      <p>
        You have successfully registered for:
      </p>

      <h3>${eventName}</h3>

      <p>
        <strong>Ticket Number:</strong>
        ${ticketNumber}
      </p>

      <p>
        Please keep this ticket number safe.
      </p>

      <br>

      <p>
        Smart Event Portal
      </p>
    `,
  });
};

module.exports = {
  sendRegistrationEmail,
};