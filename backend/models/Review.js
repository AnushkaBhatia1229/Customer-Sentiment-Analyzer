const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    sentiment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);