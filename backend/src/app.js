const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const listRoutes = require("./routes/list.routes");
const mediaRoutes = require("./routes/media.routes");
const listItemRoutes = require("./routes/listItem.routes");
const ratingRoutes = require("./routes/rating.routes");
const reviewRoutes = require("./routes/review.routes");
const recommendationRoutes = require("./routes/recommendation.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to CineTrack API 🚀",
  });
});

// Authentication Routes
app.use("/api/auth", authRoutes);
app.use("/api/lists", listRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/lists", listItemRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/recommendations", recommendationRoutes);


module.exports = app;