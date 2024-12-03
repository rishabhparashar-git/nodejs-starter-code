const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const connectDB = require("./src/config/database.js");
const errorHandler = require("./src/middleware/errorHandler.js");

// Load env vars
dotenv.config({ path: "./.env" });

const app = express();

// Body parser
app.use(express.json());
app.use(fileUpload());

// Enable CORS
app.use(cors());

// Routes
app.use("/api/auth", require("./src/routes/authRoutes.js"));

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect to database
connectDB().then(async () => {
  console.log("Connected to database");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
