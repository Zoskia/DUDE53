require("dotenv").config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT || 3002,
  mongodbUri: process.env.MONGODB_URI,
  apiKey: process.env.API_KEY,
};