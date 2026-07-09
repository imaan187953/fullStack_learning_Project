const axios = require("axios");

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    accept: "application/json",
  },
});

// Search movies
const searchMovies = async (query) => {
  const response = await tmdb.get("/search/movie", {
    params: {
      query,
    },
  });

  return response.data;
};

// Get movie details
const getMovieDetails = async (movieId) => {
  const response = await tmdb.get(`/movie/${movieId}`);

  return response.data;
};

// Trending movies
const getTrendingMovies = async () => {
  const response = await tmdb.get("/trending/movie/week");

  return response.data;
};

module.exports = {
  searchMovies,
  getMovieDetails,
  getTrendingMovies,
};