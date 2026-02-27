const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema({
  houseNo: { type: Number, required: true, unique: true },
  totalWasteKg: { type: Number, default: 0 },
  greenPoints: { type: Number, default: 0 },
});

module.exports = mongoose.model("House", houseSchema);
