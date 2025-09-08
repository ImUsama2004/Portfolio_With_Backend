const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files (images, videos, resume, etc.)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/educations", require("./routes/educationRoutes"));
app.use("/api/files", require("./routes/fileRoutes"));

// Serve frontend (optional, if you want backend to serve React build)
// Uncomment if you have React build in 'client/build'
// const clientBuildPath = path.join(__dirname, "client", "build");
// app.use(express.static(clientBuildPath));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(clientBuildPath, "index.html"));
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
