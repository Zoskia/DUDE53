const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const config = require("./config");

// Connect to MongoDB database
mongoose.connect(config.mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// Add middleware to check the API key
app.use((req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== config.apiKey) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
});

// Add created routes
app.use("/user", userRoutes);

// Start the server
const port = config.port;
app.listen(port, () => {
  console.log(`User Service listening on ${port}`);
});
