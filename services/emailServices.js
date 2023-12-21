const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // generated ethereal email
    pass: process.env.PASSWORD, // generated ethereal password
  },
});
