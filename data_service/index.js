const express = require("express");
const mongoose = require("mongoose");
const dataRoutes = require("./routes/dataRoutes");
const cors = require("cors");
require("dotenv").config();

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB database");
});

// Create Express application
const app = express();

// Add middleware to parse JSON data and handle CORS errors
app.use(express.json());
app.use(cors());

// Add created routes
app.use("/data", dataRoutes);

// Start the server
const host = "localhost";
const port = process.env.PORT || 3002;
app.listen(port, host, () => {
  console.log(`Data Service listening on ${host}:${port}`);
});
