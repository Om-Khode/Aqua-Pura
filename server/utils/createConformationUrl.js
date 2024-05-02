const { v4 } = require("uuid");
const jwt = require("jsonwebtoken");
const Otp = require("../models/otp.model");
require("dotenv").config({ path: "./.env" });

const createConformationUrl = async (userId, verification) => {
  const token = v4();
  const user = jwt.sign({ userId }, process.env.SECRET, {
    expiresIn: "1h",
  });

  const newOtp = new Otp({
    userId,
    code: token,
    createdAt: Date.now(),
    expiresAt: Date.now() + 600000,
  });

  await newOtp.save();

  return verification
    ? `${process.env.REACT_APP_URL}/verify/${user}/${token}`
    : `${process.env.REACT_APP_URL}/reset/${user}`;
};

module.exports = { createConformationUrl };
