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

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  }
});

const sendVerficationMail = async (email, url, res, verify) => {
  try {
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

    transporter.sendMail(mailOptions);

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
