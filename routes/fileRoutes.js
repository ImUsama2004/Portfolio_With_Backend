const express = require("express");
const router = express.Router();
const fileController = require("../controllers/fileController");

router.get("/resume", fileController.getResume);

module.exports = router;
