const mongoose = require("mongoose");
const { Schema } = mongoose;

const PredictionSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  longitude: {
    type: Object,
  },
  latitude: {
    type: Object,
  },
  ph: {
    type: Object,
  },
  ec: {
    type: Object,
  },
  co3: {
    type: Object,
  },
  hco3: {
    type: Object,
  },
  cl: {
    type: Object,
  },
  so4: {
    type: Object,
  },
  no3: {
    type: Object,
  },
  po4: {
    type: Object,
  },
  th: {
    type: Object,
  },
  ca: {
    type: Object,
  },
  mg: {
    type: Object,
  },
  na: {
    type: Object,
  },
  k: {
    type: Object,
  },
  f: {
    type: Object,
  },
  sio2: {
    type: Object,
  },
  prediction: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("prediction", PredictionSchema);
