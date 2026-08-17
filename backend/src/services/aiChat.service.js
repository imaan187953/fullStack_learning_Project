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
 * Determines whether the user message actually
 * requires movie/TV retrieval.
 *
 * Casual conversation should NOT trigger RAG.
 */
const requiresMediaRetrieval = (message) => {

  const text = message
    .toLowerCase()
    .trim();

  // ------------------------------------------
  // Casual conversation
  // ------------------------------------------

  const casualPatterns = [
    /^(hi|hello|hey|hiya|heyy|heyyy)$/i,

    /^how are you\??$/i,

    /^how are you doing\??$/i,

    /^what's up\??$/i,

    /^whats up\??$/i,

    /^good morning$/i,

    /^good afternoon$/i,

    /^good evening$/i,

    /^good night$/i,

    /^thanks?$/i,

    /^thank you$/i,

    /^thx$/i,

    /^okay$/i,

    /^ok$/i,

    /^great$/i,

    /^nice$/i,

    /^cool$/i,

    /^bye$/i,

    /^goodbye$/i,
  ];

  if (
    casualPatterns.some(
      (pattern) => pattern.test(text)
    )
  ) {
    return false;
  }


  // ------------------------------------------
  // Explicit media/recommendation intent
  // ------------------------------------------

  const mediaPatterns = [

    // recommendation
    /\brecommend\b/,
    /\brecommendation\b/,
    /\bsuggest\b/,
    /\bsuggestion\b/,
    /\bwhat should i watch\b/,
    /\bwhat can i watch\b/,
    /\bwhat do you recommend\b/,
    /\bwhat should i see\b/,

    // movies
    /\bmovie\b/,
    /\bmovies\b/,
    /\bfilm\b/,
    /\bfilms\b/,

    // television
    /\btv\b/,
    /\bshow\b/,
    /\bshows\b/,
    /\bseries\b/,
    /\bseason\b/,
    /\bseasons\b/,
    /\bepisode\b/,
    /\bepisodes\b/,

    // genres
    /\baction\b/,
    /\bcomedy\b/,
    /\bhorror\b/,
    /\bthriller\b/,
    /\bromance\b/,
    /\bromantic\b/,
    /\bdrama\b/,
    /\bsci[- ]?fi\b/,
    /\bscience fiction\b/,
    /\bfantasy\b/,
    /\bmystery\b/,
    /\badventure\b/,
    /\banimation\b/,
    /\banimated\b/,
    /\bdocumentary\b/,

    // media-related questions
    /\bwatch\b/,
    /\bwatched\b/,
    /\bwatching\b/,
    /\bfilm\b/,
    /\bactor\b/,
    /\bactress\b/,
    /\bdirector\b/,
    /\bcharacter\b/,
    /\bplot\b/,
    /\bstory\b/,
    /\bstories\b/,
    /\bending\b/,
    /\bsimilar to\b/,
    /\blike this\b/,
    /\blike that\b/,

  ];

  return mediaPatterns.some(
    (pattern) => pattern.test(text)
  );
};


/**
 * AI Chat
 */
const chat = async (
  userId,
  message
) => {

  if (!message || !message.trim()) {
    throw new Error(
      "Message is required."
    );
  }

  const shouldRetrieve =
    requiresMediaRetrieval(message);


  // ==================================================
  // CASUAL CONVERSATION
  // ==================================================

  if (!shouldRetrieve) {

    console.log(
      "AI CHAT: Casual conversation - RAG skipped"
    );

    const prompt = `
You are CineTrack AI, a friendly movie and TV
assistant.

The user is having a casual conversation.

Do NOT recommend movies or TV shows unless the
user explicitly asks for recommendations.

Do NOT use movie database information.

Respond naturally, briefly, and conversationally.

USER MESSAGE:
${message}

ANSWER:
`;

    return await generateResponse(prompt);
  }


  // ==================================================
  // MEDIA / RECOMMENDATION REQUEST
  // ==================================================

  console.log(
    "AI CHAT: Media request - RAG enabled"
  );


  // ------------------------------------------
  // Build user profile
  // ------------------------------------------

  const {
    preferenceDocument,
  } = await buildUserPreferences(userId);


  // ------------------------------------------
  // Build semantic retrieval query
  // ------------------------------------------

  const retrievalDocument = `

${preferenceDocument}

====================================================

CURRENT USER REQUEST

${message}

`;


  // ------------------------------------------
  // Retrieve relevant media
  // ------------------------------------------

  const retrievedMedia =
    await retrieveRelevantMedia(
      retrievalDocument,
      10
    );


  // ------------------------------------------
  // Build recommendation prompt
  // ------------------------------------------

  const prompt =
    buildChatPrompt(
      preferenceDocument,
      retrievedMedia,
      message
    );


  // ------------------------------------------
  // Generate response
  // ------------------------------------------

  const reply =
    await generateResponse(prompt);


  return reply;
};


module.exports = {
  chat,
};