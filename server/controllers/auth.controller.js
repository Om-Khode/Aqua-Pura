const { validationResult } = require("express-validator");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Otp = require("../models/otp.model");
const sendVerficationMail = require("../utils/sendEmail");
const { createConformationUrl } = require("../utils/createConformationUrl");

const JWT_SECRET = process.env.SECRET;

const createUser = async (req, res) => {
  // If there are errors, return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, msg: errors.array() });
  }
  try {
    // Check whether the user with the email exists already
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({
        success: false,
        msg: "Sorry a user with this email already exists!",
      });
    }

    // Create a salt to protect the password
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });

    return await sendVerficationMail(
      user.email,
      await createConformationUrl(user._id, true),
      res,
      true
    );
  } catch (error) {
    // If some error occurs, display the errors
    console.log(error.message);
    res.status(500).send({ success: false, msg: "Internal server error" });
  }
};

const verifyUser = async (req, res) => {
  try {
    let { p1: user, p2: token } = req.body;

    const data = jwt.verify(user, JWT_SECRET);

    const userId = data.userId;

    const otpToVerify = await Otp.find({ userId });
    if (otpToVerify.length > 0) {
      const { expiresAt } = otpToVerify[0];
      const otpCode = otpToVerify[0].code;

      if (Date.parse(expiresAt) < Date.now()) {
        console.log("I am expired");
        try {
          await Otp.findOneAndDelete({ userId: userId });
          await User.findByIdAndDelete({ id: userId });
          return res.status(400).send({
            success: false,
            msg: "Link has been expired. Try to signing up again!",
          });
        } catch (error) {
          return res.status(400).send({
            success: false,
            msg: "Error deleting the records!",
          });
        }
      } else {
        const result = token === otpCode;

        if (result) {
          await User.findByIdAndUpdate({ _id: userId }, { verified: true });
          await Otp.findOneAndDelete({ userId: userId });

          return res.status(200).send({
            success: true,
            msg: "Your account has been verified. You can login now!",
          });
        }
      }
    } else {
      return res.status(400).send({
        success: false,
        msg: "Account record doesn't exist or has already been verified. Please sign up or log in.",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      msg: "Account record doesn't exist or has already been verified. Please sign up or log in.",
    });
  }
};

const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, msg: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid credentials" });
    }

    if (!user.verified) {
      return res
        .status(400)
        .json({ success: false, msg: "Please verify your account first!" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid credentials" });
    }

    const data = {
      user: {
        id: user.id,
      },
    };

    const authtoken = jwt.sign(data, JWT_SECRET, { expiresIn: "24h" });

    res.cookie("jwt", authtoken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 24 hours in seconds
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    });

    const response = {
      success: true,
      user: {
        name: user.name,
        email: user.email,
      },
      msg: "You have logged in successfully!",
    };

    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, msg: "Internal server error" });
  }
};

const forgotPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, msg: errors.array() });
  }
  try {
    // Check whether the user with the email exists already
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "Account with this email doesn't exist!",
      });
    }

    return await sendVerficationMail(
      user.email,
      await createConformationUrl(user._id, false),
      res,
      false
    );
  } catch (error) {
    // If some error occurs, display the errors
    console.log(error.message);
    res.status(500).send({ success: false, msg: "Internal server error" });
  }
};

const resetPassword = async (req, res) => {
  const { userToken, newPassword } = req.body;
  const data = jwt.verify(userToken, JWT_SECRET);
  const userId = data.userId;

  console.log(userId, newPassword);

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "Reset password link has been expired! Please try again!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(newPassword, salt);

    await User.findByIdAndUpdate({ _id: userId }, { password: secPass });

    return res.status(200).json({
      success: true,
      msg: "Password has been reset successfully!",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, msg: "Internal server error" });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      maxAge: 0, // Set maxAge to 0 to expire immediately
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).send({ success: true, msg: "Logged out successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal error server!");
  }
};

const getUserDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    if (user) {
      res.status(200).json({
        success: true,
        user: {
          name: user.name,
          email: user.email,
        },
      });
    } else {
      res.status(404).json({ success: false, msg: "User not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal error server!");
  }
};

const deleteUserAfterDelay = async (req, res) => {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

  try {
    const deletedUser = await User.deleteMany({
      createdAt: { $lt: oneHourAgo }, // Delete users created before 1 hour ago
      verified: false, // Only delete unverified users
    });

    res.send({
      success: true,
      msg:
        "Successfully deleted unverified users older than 1 hour. " +
        deletedUser.deletedCount +
        " users deleted",
    });
  } catch (error) {
    console.error("Error deleting users:", error);
    res.status(500).send({ success: false, msg: "Internal server error" });
  }
};

module.exports = {
  createUser,
  verifyUser,
  loginUser,
  forgotPassword,
  resetPassword,
  logoutUser,
  getUserDetails,
  deleteUserAfterDelay,
};
