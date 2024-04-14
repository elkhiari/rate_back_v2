const mongoose = require("mongoose");

const rateModel = new mongoose.Schema({
  rate: {
    type: String,
    enum: ["Excellent", "Bien", "Mauvais", "Très mauvais"],
    required: true,
    trim: true,
  },
  comment: {
    type: String,
    trim: true,
  },
  services: {
    type: [String],
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("rate", rateModel);
