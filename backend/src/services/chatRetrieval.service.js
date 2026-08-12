const {
  buildUserPreferences,
} = require("./preference.service");

const {
  retrieveRelevantMedia,
} = require("./rag.service");

const retrieveChatContext = async (
  userId,
  question
) => {
  const {
    preferenceDocument,
  } = await buildUserPreferences(userId);

  const query = `
User Profile

${preferenceDocument}

User Question

${question}
`;

  const media =
    await retrieveRelevantMedia(query, 10);

  return {
    preferenceDocument,
    media,
  };
};

module.exports = {
  retrieveChatContext,
};