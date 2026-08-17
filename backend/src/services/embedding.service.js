require("dotenv").config();

/**
 * Generate a Nomic embedding using the Hugging Face
 * CineTrack Embeddings Space.
 *
 * The Space runs:
 * nomic-ai/nomic-embed-text-v1.5
 *
 * Output: 768-dimensional vector
 */

const HF_EMBEDDING_URL =
  "https://eman005-cinetrack-embeddings.hf.space";

const createEmbedding = async (document) => {
  try {
    if (!document || !document.trim()) {
      throw new Error(
        "Document is required for embedding."
      );
    }

    if (!process.env.HF_TOKEN) {
      throw new Error(
        "HF_TOKEN is not configured."
      );
    }

    // ------------------------------------------
    // 1. Send embedding request
    // ------------------------------------------

    const response = await fetch(
      `${HF_EMBEDDING_URL}/gradio_api/call/embed`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
        },

        body: JSON.stringify({
          data: [document],
        }),
      }
    );

    if (!response.ok) {
      const errorText =
        await response.text();

      throw new Error(
        `Hugging Face embedding request failed: ${response.status} ${errorText}`
      );
    }

    const event =
      await response.json();

    if (!event.event_id) {
      throw new Error(
        "Hugging Face did not return an event ID."
      );
    }

    // ------------------------------------------
    // 2. Wait for embedding result
    // ------------------------------------------

    const resultResponse =
      await fetch(
        `${HF_EMBEDDING_URL}/gradio_api/call/embed/${event.event_id}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.HF_TOKEN}`,
          },
        }
      );

    if (!resultResponse.ok) {
      const errorText =
        await resultResponse.text();

      throw new Error(
        `Hugging Face embedding result failed: ${resultResponse.status} ${errorText}`
      );
    }

    const resultText =
      await resultResponse.text();

    // ------------------------------------------
    // 3. Parse Gradio event response
    // ------------------------------------------

    const lines =
      resultText.split("\n");

    const completeLine =
      lines.find((line) =>
        line.startsWith("data:")
      );

    if (!completeLine) {
      throw new Error(
        "No embedding data received from Hugging Face."
      );
    }

    const data =
      JSON.parse(
        completeLine.substring(5).trim()
      );

    const embedding = data[0];

    // ------------------------------------------
    // 4. Validate vector
    // ------------------------------------------

    if (
      !Array.isArray(embedding)
    ) {
      throw new Error(
        "Invalid embedding format received."
      );
    }

    if (embedding.length !== 768) {
      throw new Error(
        `Invalid embedding dimension: ${embedding.length}. Expected 768.`
      );
    }

    console.log(
      `Embedding generated successfully: ${embedding.length} dimensions`
    );

    return embedding;

  } catch (error) {

    console.error(
      "Embedding Error:",
      error.message
    );

    throw error;
  }
};


/**
 * Generate embeddings for multiple documents.
 */
const createBatchEmbeddings = async (
  documents
) => {
  try {

    const embeddings = [];

    for (
      const document of documents
    ) {

      const embedding =
        await createEmbedding(
          document
        );

      embeddings.push({
        document,
        embedding,
      });
    }

    return embeddings;

  } catch (error) {

    console.error(
      "Batch Embedding Error:",
      error.message
    );

    throw error;
  }
};


module.exports = {
  createEmbedding,
  createBatchEmbeddings,
};