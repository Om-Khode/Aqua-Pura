const { validationResult } = require("express-validator");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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

    const data = {
      user: {
        id: user.id,
      },
    };

    // Create authtoken
    const authtoken = jwt.sign(data, JWT_SECRET);

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
      msg: "You have signed up successfully!",
    };

    // Send the authtoken as a response
    res.status(200).json(response);
  } catch (error) {
    // If some error occurs, display the errors
    console.log(error.message);
    res.status(500).send({ success: false, msg: "Internal server error" });
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
        .json({ success: false, msg: "Enter correct credentials" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res
        .status(400)
        .json({ success: false, msg: "Enter correct credentials" });
    }

    const data = {
      user: {
        id: user.id,
      },
    };

    const authtoken = jwt.sign(data, JWT_SECRET);

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

const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      maxAge: 0, // Set maxAge to 0 to expire immediately
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() - 1000), // Set expires to a past date
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

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  getUserDetails,
};
