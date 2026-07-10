const Review = require("../models/review.model");
const Media = require("../models/media.model");

// Create Review
const createReview = async (req, res) => {
  try {

    const { mediaId, review } = req.body;

    const media = await Media.findById(mediaId);

    if (!media) {
      return res.status(404).json({
        success: false,
        message: "Media not found",
      });
    }

    const existing = await Review.findOne({
      user: req.user._id,
      media: mediaId,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this movie",
      });
    }

    const newReview = await Review.create({
      user: req.user._id,
      media: mediaId,
      review,
    });

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      review: newReview,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get All Reviews for a Movie
const getMovieReviews = async (req, res) => {

  try {

    const reviews = await Review.find({
      media: req.params.mediaId,
    })
      .populate("user", "username email")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// Get My Review
const getMyReview = async (req, res) => {

  try {

    const review = await Review.findOne({
      user: req.user._id,
      media: req.params.mediaId,
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.status(200).json({
      success: true,
      review,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// Update Review
const updateReview = async (req, res) => {

  try {

    const review = await Review.findOneAndUpdate(
      {
        _id: req.params.reviewId,
        user: req.user._id,
      },
      {
        review: req.body.review,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      review,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// Delete Review
const deleteReview = async (req, res) => {

  try {

    const review = await Review.findOneAndDelete({
      _id: req.params.reviewId,
      user: req.user._id,
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

module.exports = {
  createReview,
  getMovieReviews,
  getMyReview,
  updateReview,
  deleteReview,
};