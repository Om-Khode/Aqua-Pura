const Predictions = require("../models/predictions.model");
const { validationResult } = require("express-validator");
const axios = require("axios");
const { convertUnits } = require("../utils/convertUnits");
require("dotenv").config({ path: "./.env" });

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
    const data = {
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      ph: req.body.ph,
      ec: req.body.ec,
      co3: req.body.co3,
      hco3: req.body.hco3,
      cl: req.body.cl,
      so4: req.body.so4,
      no3: req.body.no3,
      po4: req.body.po4,
      th: req.body.th,
      ca: req.body.ca,
      mg: req.body.mg,
      na: req.body.na,
      k: req.body.k,
      f: req.body.f,
      sio2: req.body.sio2,
    };

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, msg: errors.array() });
    }

    const convertedValues = convertUnits(data);

    // const predictionResult = await axios.post(
    //   process.env.ML_API + "/predict",
    //   convertedValues
    // );

    const sum = 0;

    for (const [key, value] of Object.entries(convertedValues)) {
      sum += value;
    }

    const average = sum / Object.keys(convertedValues).length;

    const predictionResult = average % 3;

    const prediction = new Predictions({
      user: req.user.id,
      longitude: {
        value: parseFloat(data.longitude.value),
      },
      latitude: {
        value: parseFloat(data.latitude.value),
      },
      ph: {
        value: parseFloat(data.ph.value),
      },
      ec: {
        value: parseFloat(data.ec.value),
        unit: data.ec.unit,
      },
      co3: {
        value: parseFloat(data.co3.value),
        unit: data.co3.unit,
      },
      hco3: {
        value: parseFloat(data.hco3.value),
        unit: data.hco3.unit,
      },
      cl: {
        value: parseFloat(data.cl.value),
        unit: data.cl.unit,
      },
      so4: {
        value: parseFloat(data.so4.value),
        unit: data.so4.unit,
      },
      no3: {
        value: parseFloat(data.no3.value),
        unit: data.no3.unit,
      },
      po4: {
        value: parseFloat(data.po4.value),
        unit: data.po4.unit,
      },
      th: {
        value: parseFloat(data.th.value),
        unit: data.th.unit,
      },
      ca: {
        value: parseFloat(data.ca.value),
        unit: data.ca.unit,
      },
      mg: {
        value: parseFloat(data.mg.value),
        unit: data.mg.unit,
      },
      na: {
        value: parseFloat(data.na.value),
        unit: data.na.unit,
      },
      k: {
        value: parseFloat(data.k.value),
        unit: data.k.unit,
      },
      f: {
        value: parseFloat(data.f.value),
        unit: data.f.unit,
      },
      sio2: {
        value: parseFloat(data.sio2.value),
        unit: data.sio2.unit,
      },
      prediction: predictionResult,
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
