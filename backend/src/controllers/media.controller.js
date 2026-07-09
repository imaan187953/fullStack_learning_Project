const Media = require("../models/media.model");

const {
  searchMovies,
  getMovieDetails,
  getTrendingMovies,
} = require("../services/tmdb.service");

// Search Movies
const search = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const movies = await searchMovies(q);

    res.status(200).json({
      success: true,
      results: movies.results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Movie Details (with cache)
const getMovie = async (req, res) => {
  try {
    const tmdbId = Number(req.params.id);

    // 1. Check MongoDB first
    let movie = await Media.findOne({
      tmdbId,
      mediaType: "movie",
    });

    if (movie) {
      return res.status(200).json({
        success: true,
        source: "database",
        movie,
      });
    }

    // 2. Fetch from TMDB
    const tmdbMovie = await getMovieDetails(tmdbId);

    // 3. Save in MongoDB
    movie = await Media.create({
      tmdbId: tmdbMovie.id,
      mediaType: "movie",

      title: tmdbMovie.title,
      originalTitle: tmdbMovie.original_title,

      overview: tmdbMovie.overview,

      posterPath: tmdbMovie.poster_path,

      backdropPath: tmdbMovie.backdrop_path,

      releaseDate: tmdbMovie.release_date,

      genres: tmdbMovie.genres,

      voteAverage: tmdbMovie.vote_average,

      voteCount: tmdbMovie.vote_count,

      popularity: tmdbMovie.popularity,

      runtime: tmdbMovie.runtime,

      status: tmdbMovie.status,

      originalLanguage: tmdbMovie.original_language,
    });

    return res.status(200).json({
      success: true,
      source: "tmdb",
      movie,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Trending Movies
const trending = async (req, res) => {
  try {
    const movies = await getTrendingMovies();

    res.status(200).json({
      success: true,
      results: movies.results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  search,
  getMovie,
  trending,
};