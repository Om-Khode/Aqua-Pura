const nodemailer = require("nodemailer");
const { verifyEmailTemplate } = require("./emailTemplate/verifyEmailTemplate");
const {
  resetPasswordTemplate,
} = require("./emailTemplate/resetPasswordTemplate");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendVerficationMail = async (email, url, res, verify) => {
  try {
    await new Promise((resolve, reject) => {
      transporter.verify((error, success) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log("Server is ready to take our messages");
          resolve(success);
        }
      });
    });

    const mailOptions = {
      from: "Aqua Pura",
      to: email,
      subject: verify === true ? "Verify your email" : "Reset your password",
      html:
        verify === true ? verifyEmailTemplate(url) : resetPasswordTemplate(url),
      attachments: [
        {
          filename: "logo.png",
          path: `${__dirname}/emailTemplate/images/logo.png`,
          cid: "logo",
        },
      ],
    };

    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log("Email sent: " + info.response);
          resolve(info.response);
        }
      });
    });

    return res.status(200).json({
      success: true,
      msg: verify
        ? "Account created successfully!"
        : "Email sent successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .send({ success: false, msg: "Internal server error" });
  }
};

module.exports = sendVerficationMail;
