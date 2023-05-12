const express = require("express");
const router = express.Router();
const Data = require("../models/data");
const slugify = require("slugify");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// /data POST route
router.post("/", async (req, res) => {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : null;

    if (!token) {
      return res.status(401).json({ message: "Authentication required." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token." });
      }
    });

    const user = jwt.decode(token).userSlug;
    const name = req.body.name;
    const data = req.body.data;
    const slug = slugify(name, { lower: true, strict: true });

    if (!slug || !name || !user) {
      return res
        .status(400)
        .json({ message: "Slug, name and user are required." });
    }

    const existingData = await Data.findOne({ slug });

    if (existingData) {
      return res
        .status(409)
        .json({ message: "Data with the given slug already exists." });
    }

    const newData = new Data({
      slug,
      name,
      user,
      data,
    });

    await newData.save();

    res
      .status(201)
      .json({ message: "Dataset created successfully.", dataset: newData });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Error creating dataset.", error });
  }
});

// /data GET all route
router.get("/all", async (req, res) => {
  try {
    const datasets = await Data.find();
    res.status(200).json(datasets);
  }

  catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Error fetching datasets.", error });
  }
});

// /data PATCH route -> Update dataset, return error if it does not exist
router.patch("/:slug", async (req, res) => {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : null;

    if (!token) {
      return res.status(401).json({ message: "Authentication required." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token." });
      }
    });

    const user = jwt.decode(token).userSlug;
    const slug = req.params.slug;
    const name = req.body.name;
    const data = req.body.data;

    if (!slug || !name || !user) {
      return res
        .status(400)
        .json({ message: "Slug, name and user are required." });
    }

    const existingData = await Data.findOne({ slug });

    if (!existingData) {
      return res
        .status(404)
        .json({ message: "Data with the given slug does not exist." });
    }

    if (existingData.user !== user) {
      return res.status(403).json({ message: "Access denied." });
    }

    existingData.name = name;

    if (existingData.data !== data) {
      existingData.data = data;
    }

    await existingData.save();

    res.status(200).json({
      message: "Dataset updated successfully.",
      dataset: existingData,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Error updating dataset.", error });
  }
});

// /data PUT route -> Update dataset or create if not found
router.put("/:slug", async (req, res) => {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : null;

    if (!token) {
      return res.status(401).json({ message: "Authentication required." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token." });
      }
    });

    const user = jwt.decode(token).userSlug;
    const slug = req.params.slug;
    const name = req.body.name;
    const data = req.body.data;

    if (!slug || !name || !user) {
      return res
        .status(400)
        .json({ message: "Slug, name and user are required." });
    }

    const existingData = await Data.findOne({ slug });

    // new data
    if (!existingData) {
      const newData = new Data({
        slug,
        name,
        user,
        data,
      });

      await newData.save();

      return res
        .status(201)
        .json({ message: "Dataset created successfully.", dataset: newData });
    }

    // existing data
    if (existingData.user !== user) {
      return res.status(403).json({ message: "Access denied." });
    }

    existingData.name = name;

    if (existingData.data !== data) {
      existingData.data = data;
    }

    await existingData.save();

    res.status(200).json({
      message: "Dataset updated successfully.",
      dataset: existingData,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Error updating dataset.", error });
  }
});

// /data/user GET route
router.get("/user/:userSlug", async (req, res) => {
  try {
    const userSlug = slugify(req.params.userSlug, {
      lower: true,
      strict: true,
    });

    if (!userSlug) {
      return res
        .status(400)
        .json({ message: "UserSlug parameter is required." });
    }

    const userData = await Data.find({ user: userSlug });

    if (!userData) {
      return res
        .status(404)
        .json({ message: "No data found for the given userSlug." });
    }

    res.status(200).send(
      JSON.stringify(
        {
          message: "Data retrieved successfully.",
          data: userData.map((d) => ({
            name: d.name,
            data: d.data,
          })),
        },
        null,
        2
      )
    );
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Error retrieving data.", error });
  }
});

module.exports = router;
