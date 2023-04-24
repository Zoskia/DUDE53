const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  user: { type: String, required: true },
  data: { type: String },
});

module.exports = mongoose.model("Data", dataSchema);
