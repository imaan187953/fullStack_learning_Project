const axios = require("axios");

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    accept: "application/json",
  },
});

/* ===========================
   MOVIES
=========================== */

// Search Movies
const searchMovies = async (query) => {
  const response = await tmdb.get("/search/movie", {
    params: { query },
  });

  return response.data;
};

// Movie Details
const getMovieDetails = async (movieId) => {
  const response = await tmdb.get(`/movie/${movieId}`);

  return response.data;
};

// Trending Movies
const getTrendingMovies = async () => {
  const response = await tmdb.get("/trending/movie/week");

  return response.data;
};

/* ===========================
   TV SHOWS
=========================== */

// Search TV Shows
const searchTVShows = async (query) => {
  const response = await tmdb.get("/search/tv", {
    params: { query },
  });

  return response.data;
};

// TV Show Details
const getTVDetails = async (tvId) => {
  const response = await tmdb.get(`/tv/${tvId}`);

  return response.data;
};

// Trending TV Shows
const getTrendingTVShows = async () => {
  const response = await tmdb.get("/trending/tv/week");

  return response.data;
};

/* ===========================
   SEASONS
=========================== */

// Season Details
const getSeasonDetails = async (tvId, seasonNumber) => {
  const response = await tmdb.get(
    `/tv/${tvId}/season/${seasonNumber}`
  );

  return response.data;
};

module.exports = {
  // Movies
  searchMovies,
  getMovieDetails,
  getTrendingMovies,

  // TV Shows
  searchTVShows,
  getTVDetails,
  getTrendingTVShows,

  // Seasons
  getSeasonDetails,
};