const Predictions = require("../models/predictions.model");
const { validationResult } = require("express-validator");

const fetchAllPredictions = async (req, res) => {
  try {
    const prediction = await Predictions.find({ user: req.user.id }).select(
      "-user"
    );
    res.json({ success: true, data: prediction });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, msg: "Error while fetching data" });
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
      prediction: 98.5,
    });

    await prediction.save();
    res.json({ success: true, data: prediction, msg: "Prediction added" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, msg: "Internal server error" });
  }
};

const deletePrediction = async (req, res) => {
  try {
    const prediction = await Predictions.findById(req.body.id);
    if (!prediction) {
      return res
        .status(404)
        .json({ success: false, msg: "Prediction not found" });
    }

    if (prediction.user.toString() !== req.user.id) {
      return res.status(401).json({ success: false, msg: "Not authorized" });
    }

    await Predictions.findByIdAndDelete(req.body.id);

    res.json({ success: true, msg: "Prediction deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, msg: "Internal server error" });
  }
};

const fetchPredicationById = async (req, res) => {
  try {
    const prediction = await Predictions.findById(req.params.id);

    if (!prediction) {
      return res
        .status(404)
        .json({ success: false, msg: "Prediction not found" });
    }

    if (prediction.user.toString() !== req.user.id) {
      return res.status(401).json({ success: false, msg: "Not authorized" });
    }

    const response = prediction.toObject();
    delete response.user;
    delete response.__v;
    delete response._id;
    delete response.date;

    res.json({ success: true, data: response });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, msg: "Internal server error" });
  }
};

module.exports = {
  fetchAllPredictions,
  addPredictions,
  deletePrediction,
  fetchPredicationById,
};
