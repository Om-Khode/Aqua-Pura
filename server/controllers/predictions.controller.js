const Predictions = require("../models/predictions.model");
const { validationResult } = require("express-validator");

const fetchAllPredictions = async (req, res) => {
  try {
    const prediction = await Predictions.find({ user: req.user.id });
    res.json({ success: true, data: prediction });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, msg: "Internal server error" });
  }
};

const addPredictions = async (req, res) => {
  try {
    const {
      longitude,
      latitude,
      ph,
      ec,
      co3,
      hco3,
      cl,
      so4,
      no3,
      po4,
      th,
      ca,
      mg,
      na,
      k,
      f,
      sio2,
    } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, msg: errors.array() });
    }

    const prediction = new Predictions({
      user: req.user.id,
      longitude,
      latitude,
      ph,
      ec,
      co3,
      hco3,
      cl,
      so4,
      no3,
      po4,
      th,
      ca,
      mg,
      na,
      k,
      f,
      sio2,
    });

    await prediction.save();
    res.json({ success: true, data: prediction, msg: "Prediction added" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, msg: "Internal server error" });
  }
};

module.exports = {
  fetchAllPredictions,
  addPredictions,
};
