const mongoose = require("mongoose");

async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/user_service", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to the MongoDB database.");
  } catch (error) {
    console.error("Error connecting to the MongoDB database:", error);
  }
}

module.exports = connectToDatabase;
