const { generateEmbedding } = require("./ollama.service");

/**
 * Generates an embedding vector from a media document.
 * This service acts as a wrapper around Ollama so the rest
 * of the application doesn't directly communicate with it.
 */

const createEmbedding = async (document) => {
  try {
    if (!document || document.trim() === "") {
      throw new Error("Document is required for embedding.");
    }

    const embedding = await generateEmbedding(document);

    return embedding;
  } catch (error) {
    throw error;
  }
};

/**
 * Generate embeddings for multiple documents.
 * This is useful when ingesting many movies/TV shows.
 */

const createBatchEmbeddings = async (documents) => {
  try {
    const embeddings = [];

    for (const document of documents) {
      const embedding = await createEmbedding(document);

      embeddings.push({
        document,
        embedding,
      });
    }

    return embeddings;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createEmbedding,
  createBatchEmbeddings,
};