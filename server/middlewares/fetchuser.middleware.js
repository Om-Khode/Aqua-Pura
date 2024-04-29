const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require("dotenv").config({ path: "../.env" });
const JWT_SECRET = process.env.SECRET;

const fetchuser = async (req, res, next) => {
  // Get the user from the jwt token and add id to req object

  if (!req.headers.cookie) {
    return res
      .status(200)
      .send({ success: false, msg: "Please authenticate using a valid token" });
  }

  const jwtCookie = req.headers?.cookie
    ?.split("; ")
    ?.find((cookie) => cookie.startsWith("jwt="));
  const token = jwtCookie ? jwtCookie.split("=")[1] : null;

  if (!token) {
    return res
      .status(200)
      .send({ success: false, msg: "Authentication required" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    return res
      .status(200)
      .send({ success: false, msg: "Please authenticate using a valid token" });
  }
};

module.exports = fetchuser;
