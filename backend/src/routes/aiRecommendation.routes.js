const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");
const {
  getRecommendations,
} = require("../controllers/aiRecommendation.controller");

// AI Recommendations
router.get("/", protect, getRecommendations);

module.exports = router;