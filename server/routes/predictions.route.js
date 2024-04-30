const express = require("express");
const router = express.Router();
const fetchuser = require("../middlewares/fetchuser.middleware");

const {
  fetchAllPredictions,
  addPredictions,
  deletePrediction,
  fetchPredicationById,
} = require("../controllers/predictions.controller");

// Route 1: Fetch all predictions
router.get("/fetchallpredictions", fetchuser, fetchAllPredictions);

// Route 2: Add a Prediction
router.post("/addprediction", fetchuser, addPredictions);

router.delete("/deleteprediction", fetchuser, deletePrediction);

router.get("/fetchprediction/:id", fetchuser, fetchPredicationById);

module.exports = router;
