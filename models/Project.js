const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  demo: { type: String  }, // path to video
  code: { type: String }, // github link
  image: { type: String  }, // path to image
});

module.exports = mongoose.model("Project", ProjectSchema);
