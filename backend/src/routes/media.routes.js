const express = require("express");

const router = express.Router();

const {

    searchMovie,
    searchTV,

    getMovie,
    getTV,
    getSeason,

    trendingMovies,
    trendingTV,

} = require("../controllers/media.controller");

// Search
router.get("/search/movies", searchMovie);

router.get("/search/tv", searchTV);

// Trending
router.get("/trending/movies", trendingMovies);

router.get("/trending/tv", trendingTV);

// Details
router.get("/movie/:id", getMovie);

router.get("/tv/:id", getTV);

router.get("/tv/:tvId/season/:seasonNumber", getSeason);

module.exports = router;