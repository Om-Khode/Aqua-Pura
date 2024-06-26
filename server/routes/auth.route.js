const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const fetchuser = require("../middlewares/fetchuser.middleware");
const {
  createUser,
  loginUser,
  getUserDetails,
  logoutUser,
  verifyUser,
  resetPassword,
  forgotPassword,
  deleteUserAfterDelay,
} = require("../controllers/auth.controller");

// Route 1: Create user / SignUp
router.post(
  "/createuser",
  body("name", "Enter a valid name").isLength({ min: 3 }),
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password must be atleast 5 characters").isLength({
    min: 5,
  }),
  createUser
);

// Route 2: Login
router.post(
  "/login",
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password cannot be blank").exists(),
  loginUser
);

// Route 3: Logout
router.get("/logout", logoutUser);

// Route 4: Get User Details
router.get("/getuser", fetchuser, getUserDetails);

// Route 5: Verify User
router.post("/verify", verifyUser);

// Route 6: Forgot Password
router.post("/forgotPassword", forgotPassword);

// Route 7: Reset Password
router.post("/resetPassword", resetPassword);

// Route 8: Delete User After Delay
router.post("/deleteUserAfterDelay", deleteUserAfterDelay);

module.exports = router;
