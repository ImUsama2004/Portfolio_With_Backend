const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const multer = require("multer");
const path = require("path");

// Storage for images only
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/projects"); // Save uploaded images to uploads/projects
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Routes
router.get("/", projectController.getProjects);
router.post("/", upload.single("image"), projectController.addProject); // Only image as file
router.put("/:id", upload.single("image"), projectController.updateProject);
router.delete("/:id", projectController.deleteProject);

module.exports = router;
