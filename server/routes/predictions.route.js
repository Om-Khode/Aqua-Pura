const express = require("express");
const router = express.Router();
const fetchuser = require("../middlewares/fetchuser.middleware");

const {
  fetchAllPredictions,
  addPredictions,
} = require("../controllers/predictions.controller");

// Route 1: Fetch all predictions
router.get("/fetchallpredictions", fetchuser, fetchAllPredictions);

// Route 2: Add a Prediction
router.post("/addprediction", fetchuser, addPredictions);

module.exports = router;
