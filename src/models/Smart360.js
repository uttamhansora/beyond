const mongoose = require("mongoose");

const Smart360Schema = new mongoose.Schema({
  title: String,
  description: String,
  image:String,
}, { timestamps: true });

// 👇 Model name is "Smart360"
const Smart360 = mongoose.model("Smart360", Smart360Schema);

module.exports = Smart360;
