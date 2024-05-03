const Predictions = require("../models/predictions.model");
const { validationResult } = require("express-validator");
const axios = require("axios");
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

    const data = {
      longitude: parseFloat(longitude.value),
      latitude: parseFloat(latitude.value),
      ph: parseFloat(ph.value),
      ec: parseFloat(ec.value),
      co3: parseFloat(co3.value),
      hco3: parseFloat(hco3.value),
      cl: parseFloat(cl.value),
      so4: parseFloat(so4.value),
      no3: parseFloat(no3.value),
      po4: parseFloat(po4.value),
      th: parseFloat(th.value),
      ca: parseFloat(ca.value),
      mg: parseFloat(mg.value),
      na: parseFloat(na.value),
      k: parseFloat(k.value),
      f: parseFloat(f.value),
      sio2: parseFloat(sio2.value),
    };

    const predictionResult = await axios.post(
      process.env.ML_API + "/predict",
      data
    );

    const prediction = new Predictions({
      user: req.user.id,
      longitude: {
        value: parseFloat(longitude.value),
      },
      latitude: {
        value: parseFloat(latitude.value),
      },
      ph: {
        value: parseFloat(ph.value),
      },
      ec: {
        value: parseFloat(ec.value),
        unit: ec.unit,
      },
      co3: {
        value: parseFloat(co3.value),
        unit: co3.unit,
      },
      hco3: {
        value: parseFloat(hco3.value),
        unit: hco3.unit,
      },
      cl: {
        value: parseFloat(cl.value),
        unit: cl.unit,
      },
      so4: {
        value: parseFloat(so4.value),
        unit: so4.unit,
      },
      no3: {
        value: parseFloat(no3.value),
        unit: no3.unit,
      },
      po4: {
        value: parseFloat(po4.value),
        unit: po4.unit,
      },
      th: {
        value: parseFloat(th.value),
        unit: th.unit,
      },
      ca: {
        value: parseFloat(ca.value),
        unit: ca.unit,
      },
      mg: {
        value: parseFloat(mg.value),
        unit: mg.unit,
      },
      na: {
        value: parseFloat(na.value),
        unit: na.unit,
      },
      k: {
        value: parseFloat(k.value),
        unit: k.unit,
      },
      f: {
        value: parseFloat(f.value),
        unit: f.unit,
      },
      sio2: {
        value: parseFloat(sio2.value),
        unit: sio2.unit,
      },
      prediction: predictionResult.data.prediction,
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
