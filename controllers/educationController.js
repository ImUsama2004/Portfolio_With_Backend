const Education = require("../models/Education");

// Get all education entries
exports.getEducations = async (req, res) => {
  try {
    const educations = await Education.find();
    res.json(educations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add new education
exports.addEducation = async (req, res) => {
  try {
    const { institute, degree, year, cgpa, percentage } = req.body;
    if (!institute || !degree || !year || !cgpa || !percentage)
      return res.status(400).json({ message: "All fields are required" });

    const newEdu = new Education({ institute, degree, year, cgpa, percentage });
    await newEdu.save();
    res.status(201).json(newEdu);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update education
exports.updateEducation = async (req, res) => {
  try {
    const updatedEdu = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedEdu) return res.status(404).json({ message: "Education not found" });

    res.json(updatedEdu);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete education
exports.deleteEducation = async (req, res) => {
  try {
    const deleted = await Education.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Education not found" });

    res.json({ message: "Education deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
