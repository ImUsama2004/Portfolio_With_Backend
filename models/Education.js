const mongoose = require("mongoose");

const EducationSchema = new mongoose.Schema({
  institute: { type: String, required: true },
  degree: { type: String, required: true },
  year: { type: String, required: true },
  cgpa: { type: String, required: true },
  percentage: { type: Number, required: true },
});

module.exports = mongoose.model("Education", EducationSchema);
