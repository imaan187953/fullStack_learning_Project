const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    tmdbId: {
      type: Number,
      required: true,
      unique: true,
    },

    mediaType: {
      type: String,
      enum: ["movie", "tv"],
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    originalTitle: {
      type: String,
    },

    overview: {
      type: String,
      default: "",
    },

    posterPath: {
      type: String,
      default: "",
    },

    backdropPath: {
      type: String,
      default: "",
    },

    releaseDate: {
      type: Date,
    },

    genres: [
      {
        id: Number,
        name: String,
      },
    ],

    voteAverage: {
      type: Number,
      default: 0,
    },

    voteCount: {
      type: Number,
      default: 0,
    },

    popularity: {
      type: Number,
      default: 0,
    },

    runtime: {
      type: Number,
    },

    status: {
      type: String,
    },

    originalLanguage: {
      type: String,
    },

    cachedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Media", mediaSchema);