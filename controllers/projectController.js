const Project = require("../models/Project");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

// Get all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ message: "Server error while fetching projects" });
  }
};

// Add a new project
exports.addProject = async (req, res) => {
  try {
    const { title, description, code, demo } = req.body; // demo is now a string
    const image = req.file ? req.file.path.replace(/\\/g, "/") : "";

    if (!title || !description || !code || !demo || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProject = new Project({
      title,
      description,
      code,
      demo, // store as plain string
      image, // uploaded file path
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    console.error("Error adding project:", err);
    res.status(500).json({ message: "Server error while adding project" });
  }
};

// Update a project
exports.updateProject = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const { title, description, code, demo } = req.body;
    const image = req.file ? req.file.path.replace(/\\/g, "/") : project.image;

    // Remove old image if a new one is uploaded
    if (req.file && project.image && fs.existsSync(project.image)) {
      fs.unlinkSync(project.image);
    }

    project.title = title || project.title;
    project.description = description || project.description;
    project.code = code || project.code;
    project.demo = demo || project.demo; // update string if provided
    project.image = image;

    await project.save();
    res.json(project);
  } catch (err) {
    console.error("Error updating project:", err);
    res.status(500).json({ message: "Server error while updating project" });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Delete image file if exists
    if (project.image && fs.existsSync(project.image)) {
      try {
        fs.unlinkSync(project.image);
      } catch (fileErr) {
        console.error(`Failed to delete image: ${project.image}`, fileErr);
      }
    }

    await Project.deleteOne({ _id: id });
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error("Error deleting project:", err);
    res.status(500).json({ message: "Server error while deleting project" });
  }
};
