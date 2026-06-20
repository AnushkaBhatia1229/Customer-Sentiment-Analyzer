const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Customer Sentiment Analyzer API Running 🚀");
});

// Server
const PORT = process.env.PORT || 5000;
const sentimentRoutes = require("./routes/sentimentRoutes");

app.use("/api/sentiment", sentimentRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});