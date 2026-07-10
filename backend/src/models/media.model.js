const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    tmdbId: {
      type: Number,
      required: true,
    },

    mediaType: {
      type: String,
      enum: ["movie", "tv", "season"],
      required: true,
    },

    // Only used for seasons
    tvId: {
      type: Number,
      default: null,
    },

    // Only used for seasons
    seasonNumber: {
      type: Number,
      default: null,
    },

    // Only used for seasons
    parentTitle: {
      type: String,
      default: null,
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

    numberOfSeasons: {
  type: Number,
  default: null,
   },

   numberOfEpisodes: {
  type: Number,
  default: null,
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

// A TMDB ID can exist for different media types (movie, tv, season)
mediaSchema.index(
  {
    tmdbId: 1,
    mediaType: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model("Media", mediaSchema);