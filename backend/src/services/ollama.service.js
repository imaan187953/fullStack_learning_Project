const ollama = require("../config/ollama");

/**
 * Generate embedding using nomic-embed-text
 */
const generateEmbedding = async (text) => {
  try {
    if (!text || !text.trim()) {
      throw new Error("Text is required for embedding.");
    }

    const response = await ollama.embed({
      model: "nomic-embed-text:latest",
      input: text,
    });

    return response.embeddings[0];
  } catch (error) {
    console.error("Embedding Error:", error.message);
    throw error;
  }
};

/**
 * Generate AI recommendations using Qwen
 */
const generateResponse = async (prompt) => {
  try {
    if (!prompt || !prompt.trim()) {
      throw new Error("Prompt is required.");
    }

    const response = await ollama.chat({
      model: "qwen2.5:3b",

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],

      options: {
        temperature: 0.3,
        top_p: 0.9,
        num_ctx: 4096,
      },

      stream: false,
    });

    return response.message.content;
  } catch (error) {
    console.error("Ollama Chat Error:", error.message);
    throw error;
  }
};

module.exports = {
  generateEmbedding,
  generateResponse,
};