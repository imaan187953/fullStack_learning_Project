import api from "./axios";

/**
 * Search Movies
 */
export const searchMovies = async (query) => {
  const response = await api.get("/media/search/movies", {
    params: { q: query },
  });

  return response.data;
};

/**
 * Search TV Shows
 */
export const searchTVShows = async (query) => {
  const response = await api.get("/media/search/tv", {
    params: { q: query },
  });

  return response.data;
};

/**
 * Trending Movies
 */
export const getTrendingMovies = async () => {
  const response = await api.get("/media/trending/movies");

  return response.data;
};

/**
 * Trending TV
 */
export const getTrendingTV = async () => {
  const response = await api.get("/media/trending/tv");

  return response.data;
};

/**
 * Movie Details
 */
export const getMovieDetails = async (id) => {
  const response = await api.get(`/media/movie/${id}`);

  return response.data;
};

/**
 * TV Details
 */
export const getTVDetails = async (id) => {
  const response = await api.get(`/media/tv/${id}`);

  return response.data;
};

/**
 * Season Details
 */
export const getSeasonDetails = async (tvId, seasonNumber) => {
  const response = await api.get(
    `/media/tv/${tvId}/season/${seasonNumber}`
  );

  return response.data;
};