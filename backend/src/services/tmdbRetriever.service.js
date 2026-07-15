const {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getTrendingTVShows,
  getPopularTVShows,
  getTopRatedTVShows,
  getTVDetails,
  getSeasonDetails,
} = require("./tmdb.service");

const axios = require("axios");

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    accept: "application/json",
  },
});

/* =====================================================
   GENRE MAP
===================================================== */

let movieGenreMap = {};
let tvGenreMap = {};

const loadGenres = async () => {
  if (
    Object.keys(movieGenreMap).length &&
    Object.keys(tvGenreMap).length
  ) {
    return;
  }

  const [movieGenres, tvGenres] = await Promise.all([
    tmdb.get("/genre/movie/list"),
    tmdb.get("/genre/tv/list"),
  ]);

  movieGenres.data.genres.forEach((genre) => {
    movieGenreMap[genre.id] = genre.name;
  });

  tvGenres.data.genres.forEach((genre) => {
    tvGenreMap[genre.id] = genre.name;
  });
};

/* =====================================================
   HELPERS
===================================================== */

const removeDuplicates = (items) => {
  const unique = new Map();

  items.forEach((item) => {
    unique.set(item.id, item);
  });

  return [...unique.values()];
};

const resolveGenres = (genreIds, type) => {
  const map =
    type === "movie"
      ? movieGenreMap
      : tvGenreMap;

  return genreIds.map((id) => ({
    id,
    name: map[id] || "Unknown",
  }));
};

/* =====================================================
   NORMALIZATION
===================================================== */

const normalizeMovie = (movie) => ({
  tmdbId: movie.id,

  mediaType: "movie",

  title: movie.title,

  overview: movie.overview,

  genres: resolveGenres(
    movie.genre_ids,
    "movie"
  ),

  release_date: movie.release_date,

  vote_average: movie.vote_average,

  original_language:
    movie.original_language,
});

const normalizeTV = (tv) => ({
  tmdbId: tv.id,

  mediaType: "tv",

  title: tv.name,

  overview: tv.overview,

  genres: resolveGenres(
    tv.genre_ids,
    "tv"
  ),

  first_air_date: tv.first_air_date,

  vote_average: tv.vote_average,

  original_language:
    tv.original_language,
});

const normalizeSeason = (
  season,
  showName,
  tvId
) => ({
  tmdbId: season.id,

  tvId,

  mediaType: "season",

  title: `${showName} - Season ${season.season_number}`,

  season_number: season.season_number,

  episode_count: season.episode_count,

  overview: season.overview,

  genres: [],

  air_date: season.air_date,

  vote_average:
    season.vote_average || 0,

  original_language: "Unknown",
});

/* =====================================================
   FETCH MOVIES
===================================================== */

const fetchMovies = async () => {
  await loadGenres();

  const [
    trending,
    popular,
    topRated,
  ] = await Promise.all([
    getTrendingMovies(),
    getPopularMovies(),
    getTopRatedMovies(),
  ]);

  const movies = removeDuplicates([
    ...trending.results,
    ...popular.results,
    ...topRated.results,
  ]);

  return movies.map(normalizeMovie);
};

/* =====================================================
   FETCH TV
===================================================== */

const fetchTVShows = async () => {
  await loadGenres();

  const [
    trending,
    popular,
    topRated,
  ] = await Promise.all([
    getTrendingTVShows(),
    getPopularTVShows(),
    getTopRatedTVShows(),
  ]);

  const shows = removeDuplicates([
    ...trending.results,
    ...popular.results,
    ...topRated.results,
  ]);

  return shows.map(normalizeTV);
};

/* =====================================================
   FETCH SEASONS
===================================================== */

const fetchSeasons = async (
  tvShows
) => {
  const seasons = [];

  for (const show of tvShows) {
    try {
      const details = await getTVDetails(
        show.tmdbId
      );

      if (!details.seasons) continue;

      for (const season of details.seasons) {
        const fullSeason =
          await getSeasonDetails(
            show.tmdbId,
            season.season_number
          );

        seasons.push(
          normalizeSeason(
            fullSeason,
            details.name,
            show.tmdbId
          )
        );
      }
    } catch (err) {
      console.log(
        `Skipping ${show.title}: ${err.message}`
      );
    }
  }

  return seasons;
};

module.exports = {
  fetchMovies,
  fetchTVShows,
  fetchSeasons,
};