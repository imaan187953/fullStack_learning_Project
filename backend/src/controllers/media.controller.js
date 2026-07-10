const Media = require("../models/media.model");

const {
  searchMovies,
  searchTVShows,
  getMovieDetails,
  getTVDetails,
  getSeasonDetails,
  getTrendingMovies,
  getTrendingTVShows,
} = require("../services/tmdb.service");

/* ===========================
   SEARCH MOVIES
=========================== */

const searchMovie = async (req, res) => {
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

/* ===========================
   SEARCH TV SHOWS
=========================== */

const searchTV = async (req, res) => {

  try {

    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const tvShows = await searchTVShows(q);

    res.status(200).json({
      success: true,
      results: tvShows.results,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

/* ===========================
   MOVIE DETAILS
=========================== */

const getMovie = async (req, res) => {

  try {

    const tmdbId = Number(req.params.id);

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

    const tmdbMovie = await getMovieDetails(tmdbId);

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

    res.status(200).json({
      success: true,
      source: "tmdb",
      movie,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

/* ===========================
   TV DETAILS
=========================== */

const getTV = async (req, res) => {

  try {

    const tmdbId = Number(req.params.id);

    let tv = await Media.findOne({
      tmdbId,
      mediaType: "tv",
    });

    if (tv) {

      return res.status(200).json({
        success: true,
        source: "database",
        tv,
      });

    }

    const tmdbTV = await getTVDetails(tmdbId);

    tv = await Media.create({

      tmdbId: tmdbTV.id,

      mediaType: "tv",

      title: tmdbTV.name,

      originalTitle: tmdbTV.original_name,

      overview: tmdbTV.overview,

      posterPath: tmdbTV.poster_path,

      backdropPath: tmdbTV.backdrop_path,

      releaseDate: tmdbTV.first_air_date,

      genres: tmdbTV.genres,

      voteAverage: tmdbTV.vote_average,

      voteCount: tmdbTV.vote_count,

      popularity: tmdbTV.popularity,

      status: tmdbTV.status,

      originalLanguage: tmdbTV.original_language,

      numberOfSeasons: tmdbTV.number_of_seasons,

      numberOfEpisodes: tmdbTV.number_of_episodes,

    });

    res.status(200).json({
      success: true,
      source: "tmdb",
      tv,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

/* ===========================
   SEASON DETAILS
=========================== */

const getSeason = async (req, res) => {

  try {

    const tvId = Number(req.params.tvId);

    const seasonNumber = Number(req.params.seasonNumber);

    let season = await Media.findOne({
      tvId,
      seasonNumber,
      mediaType: "season",
    });

    if (season) {

      return res.status(200).json({
        success: true,
        source: "database",
        season,
      });

    }

    const tv = await getTVDetails(tvId);

    const tmdbSeason = await getSeasonDetails(tvId, seasonNumber);

    season = await Media.create({

      tmdbId: tmdbSeason.id,

      mediaType: "season",

      tvId,

      seasonNumber,

      parentTitle: tv.name,

      title: tmdbSeason.name,

      overview: tmdbSeason.overview,

      posterPath: tmdbSeason.poster_path,

      releaseDate: tmdbSeason.air_date,

      voteAverage: tmdbSeason.vote_average,

    });

    res.status(200).json({

      success: true,

      source: "tmdb",

      season,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

/* ===========================
   TRENDING
=========================== */

const trendingMovies = async (req, res) => {

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

const trendingTV = async (req, res) => {

  try {

    const tv = await getTrendingTVShows();

    res.status(200).json({

      success: true,

      results: tv.results,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

module.exports = {

  searchMovie,

  searchTV,

  getMovie,

  getTV,

  getSeason,

  trendingMovies,

  trendingTV,

};