const {
  buildUserPreferences,
} = require("./preference.service");

const {
  retrieveRelevantMedia,
} = require("./rag.service");

const {
  generateResponse,
} = require("./ollama.service");

const {
  buildChatPrompt,
} = require("../utils/chatPromptBuilder");

/**
 * AI Chat
 */
const chat = async (
  userId,
  message
) => {

  /*
   * Build user profile
   */
  const {
    preferenceDocument,
  } = await buildUserPreferences(userId);

  /*
   * Improve semantic retrieval
   */

  const retrievalDocument = `

${preferenceDocument}

====================================================

CURRENT USER REQUEST

${message}

`;

  /*
   * Retrieve relevant media
   */

  const retrievedMedia =
    await retrieveRelevantMedia(
      retrievalDocument,
      10
    );

  /*
   * Build prompt
   */

  const prompt =
    buildChatPrompt(
      preferenceDocument,
      retrievedMedia,
      message
    );

  /*
   * Ask Ollama
   */

  const reply =
    await generateResponse(prompt);

  return reply;

};

module.exports = {
  chat,
};