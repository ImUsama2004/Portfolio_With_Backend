const path = require("path");

exports.getResume = (req, res) => {
  const filePath = path.join(__dirname, "../uploads/resume.pdf");
  res.sendFile(filePath);
};
