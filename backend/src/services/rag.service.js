const qdrantClient = require("../config/qdrant");

const {
  createEmbedding,
} = require("./embedding.service");

/**
 * Search Qdrant using a semantic query.
 *
 * @param {string} queryDocument
 * @param {number} limit
 * @returns {Array}
 */
const retrieveRelevantMedia = async (
  queryDocument,
  limit = 10
) => {
  try {

    console.log("\n========== QUERY SENT TO QDRANT ==========");
    console.log(queryDocument);
    console.log("===========================================\n");

    const vector =
      await createEmbedding(queryDocument);

    const searchResults =
      await qdrantClient.search("movies", {
        vector,
        limit,
        with_payload: true,
      });

    console.log("\n========== QDRANT RESULTS ==========");

    searchResults.forEach((item, index) => {

      const movie = item.payload;

      console.log(
        `${index + 1}. ${movie.title}`
      );

      console.log(
        `   Score: ${item.score}`
      );

      console.log(
        `   Genres: ${(movie.genres || [])
          .map((g) => g.name || g)
          .join(", ")
        }`
      );
    });

    console.log("====================================\n");

    // keep the rest of your existing code...

    // Existing normalization
    const media = searchResults.map((item) => ({
    score: item.score,

    tmdbId: item.payload.tmdbId,

    title: item.payload.title,

    mediaType: item.payload.mediaType,

    overview: item.payload.overview,

    genres: item.payload.genres || [],

    popularity:
        item.payload.popularity || 0,

    voteAverage:
        item.payload.voteAverage || 0,

    releaseDate:
        item.payload.releaseDate || "",

    posterPath:
        item.payload.posterPath || "",

    numberOfSeasons:
        item.payload.numberOfSeasons || 0,

    numberOfEpisodes:
        item.payload.numberOfEpisodes || 0,
}));

    return media;

  } catch (error) {

    console.error(
      "Qdrant Retrieval Error:",
      error.message
    );

    throw error;
  }
};

/**
 * Debug helper.
 * Prints retrieved titles.
 */
const printRetrievedMedia = (media) => {

  console.log("\n");

  console.log("Retrieved Media");

  console.log("------------------------");

  media.forEach((movie, index) => {

    console.log(
      `${index + 1}. ${movie.title} (${movie.score.toFixed(3)})`
    );

  });

  console.log("\n");

};

module.exports = {
  retrieveRelevantMedia,
  printRetrievedMedia,
};