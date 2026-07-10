const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    media: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
      required: true,
    },

    review: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
  }
);

// One review per user per movie
reviewSchema.index(
  {
    user: 1,
    media: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model("Review", reviewSchema);