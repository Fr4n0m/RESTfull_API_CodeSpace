const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "franciis1999@gmail.com", // generated ethereal email
    pass: "sojr hoob hdas zvfa", // generated ethereal password
  },
});

const sendEmail = async (toEmail, subject, html) => {
  try {
    if (!toEmail) {
      // Check if the email is present in the request body
      console.log("Email address not provided");
      return res.status(400).send("Email address not provided");
    }

    const mailOptions = {
      from: "franciis1999@gmail.com",
      to: toEmail,
      subject: subject,
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("El email se ha enviado correctamente");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = { sendEmail };
