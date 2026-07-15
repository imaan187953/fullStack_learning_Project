const qdrant = require("../config/qdrant");

const COLLECTION_NAME = "movies";

/**
 * Create Collection
 */
const createCollection = async () => {
  try {
    const collections = await qdrant.getCollections();

    const exists = collections.collections.some(
      (collection) => collection.name === COLLECTION_NAME
    );

    if (exists) {
      console.log("Collection already exists.");
      return;
    }

    await qdrant.createCollection(COLLECTION_NAME, {
      vectors: {
        size: 768,
        distance: "Cosine",
      },
    });

    console.log("Collection created successfully.");
  } catch (error) {
    throw error;
  }
};

/**
 * Check if a point already exists
 */
const pointExists = async (id) => {
  try {
    const result = await qdrant.retrieve(COLLECTION_NAME, {
      ids: [id],
      with_payload: false,
      with_vector: false,
    });

    return result.length > 0;
  } catch (error) {
    throw error;
  }
};

/**
 * Insert / Update a media point
 */
const upsertMedia = async (media, embedding, document) => {
  try {
    await qdrant.upsert(COLLECTION_NAME, {
      wait: true,
      points: [
        {
          id: media.tmdbId,

          vector: embedding,

          payload: {
            tmdbId: media.tmdbId,
            mediaType: media.mediaType,
            title: media.title,
            overview: media.overview,
            genres: media.genres,
            document,
            releaseDate:
              media.release_date ||
              media.first_air_date ||
              media.air_date ||
              null,
            voteAverage: media.vote_average,
            language: media.original_language,
          },
        },
      ],
    });
  } catch (error) {
    throw error;
  }
};

/**
 * Semantic Search
 */
const searchSimilar = async (
  embedding,
  limit = 10
) => {
  try {
    const results = await qdrant.search(COLLECTION_NAME, {
      vector: embedding,
      limit,
      with_payload: true,
    });

    return results;
  } catch (error) {
    throw error;
  }
};

/**
 * Count Stored Media
 */
const countPoints = async () => {
  const result = await qdrant.count(COLLECTION_NAME);

  return result.count;
};

/**
 * Delete Media
 */
const deletePoint = async (id) => {
  await qdrant.delete(COLLECTION_NAME, {
    wait: true,
    points: [id],
  });
};

module.exports = {
  COLLECTION_NAME,

  createCollection,

  pointExists,

  upsertMedia,

  searchSimilar,

  countPoints,

  deletePoint,
};