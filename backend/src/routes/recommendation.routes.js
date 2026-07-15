const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {
  getRecommendations,
} = require("../controllers/recommendation.controller");

/**
 * AI Recommendation Route
 */
router.get(
  "/",
  protect,
  getRecommendations
);

module.exports = router;