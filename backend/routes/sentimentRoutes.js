const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

router.post("/analyze", async (req, res) => {
  try {
    const { text } = req.body;

    let sentiment = "Neutral";

    if (
      text.toLowerCase().includes("good") ||
      text.toLowerCase().includes("great") ||
      text.toLowerCase().includes("excellent")
    ) {
      sentiment = "Positive";
    }

    if (
      text.toLowerCase().includes("bad") ||
      text.toLowerCase().includes("poor") ||
      text.toLowerCase().includes("worst")
    ) {
      sentiment = "Negative";
    }

    await Review.create({
      text,
      sentiment,
    });

    res.json({ sentiment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/history", async (req, res) => {
  const reviews = await Review.find().sort({ createdAt: -1 });

  res.json(reviews);
});

module.exports = router;