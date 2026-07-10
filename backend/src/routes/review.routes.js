const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {
  createReview,
  getMovieReviews,
  getMyReview,
  updateReview,
  deleteReview,
} = require("../controllers/review.controller");

// Public
router.get("/media/:mediaId", getMovieReviews);

// Protected
router.use(protect);

router.post("/", createReview);

router.get("/my/:mediaId", getMyReview);

router.patch("/:reviewId", updateReview);

router.delete("/:reviewId", deleteReview);

module.exports = router;