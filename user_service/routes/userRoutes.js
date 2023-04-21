const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const slugify = require("slugify");

// Sign-up route
router.post("/sign-up", async (req, res) => {
    try {
      const { userName, password } = req.body;
  
      if (!userName || !password) {
        return res.status(400).json({ message: "Username and password are required." });
      }
  
      const existingUser = await User.findOne({ userName });
  
      if (existingUser) {
        return res.status(409).json({ message: "Username already exists." });
      }
  
      const userSlug = slugify(userName, { lower: true, strict: true });
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = new User({
        userName,
        userSlug,
        password: hashedPassword,
      });
  
      await newUser.save();
  
      res.status(201).json({ message: "User created successfully.", user: newUser });
    } catch (error) {
      res.status(500).json({ message: "Error creating user.", error });
    }
  });

// Auth route
router.post("/auth", async (req, res) => {});

module.exports = router;
