const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
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

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
  },
  {
    timestamps: true,
  }
);

// One user can rate one movie only once
ratingSchema.index(
  {
    user: 1,
    media: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model("Rating", ratingSchema);