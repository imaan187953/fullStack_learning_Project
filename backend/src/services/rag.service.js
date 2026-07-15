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
    /*
     * Step 1
     * Generate embedding
     */
    const vector = await createEmbedding(queryDocument);

    /*
     * Step 2
     * Search Qdrant
     */
    const searchResults =
      await qdrantClient.search("movies", {
        vector,
        limit,
        with_payload: true,
      });

    /*
     * Step 3
     * Normalize results
     */
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