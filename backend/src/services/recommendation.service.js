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
  buildRecommendationPrompt,
} = require("../utils/promptBuilder");


/**
 * Parse JSON safely
 */
const parseAIResponse = (response) => {
  try {
    return JSON.parse(response);
  } catch (error) {
    return {
      raw: response,
    };
  }
};


/**
 * Remove duplicate recommendations
 */
const removeDuplicates = (movies) => {
  const seen = new Set();

  return movies.filter((movie) => {

    if (seen.has(movie.tmdbId))
      return false;

    seen.add(movie.tmdbId);

    return true;

  });
};



/**
 * Generate recommendations
 */
const generateRecommendations = async (userId) => {

  try {


    /*
     * STEP 1
     * Build user preference document
     */
    const {
      preferenceDocument,
      favoriteGenres,
      statistics,
    } = await buildUserPreferences(userId);



    /*
     * STEP 1.5
     * Handle new users (Cold Start)
     */

    const isNewUser =
      statistics.ratings === 0 &&
      statistics.reviews === 0 &&
      statistics.lists === 0;



    if (isNewUser) {

      return {

        statistics,

        favoriteGenres,


        retrievedCount: 0,


        retrievedMedia: [],


        recommendations: [

          {
            tmdbId: 157336,
            title: "Interstellar",
            mediaType: "movie",
            genre: "Science Fiction",
            reason:
              "A highly rated science fiction movie known for its popularity and critical acclaim.",
            confidence: 0.85
          },


          {
            tmdbId: 155,
            title: "The Dark Knight",
            mediaType: "movie",
            genre: "Action, Crime",
            reason:
              "A critically acclaimed movie with strong audience reception.",
            confidence: 0.85
          }

        ],


        message:
          "No viewing history found. Showing popular recommendations.",


        generatedAt:
          new Date(),

      };

    }





    /*
     * STEP 2
     * Retrieve similar media
     */

    let retrievedMedia =
      await retrieveRelevantMedia(
        preferenceDocument,
        15
      );



    /*
     * STEP 3
     * Remove duplicates
     */

    retrievedMedia =
      removeDuplicates(retrievedMedia);



    /*
     * STEP 4
     * Keep only Top 10
     */

    retrievedMedia =
      retrievedMedia.slice(0, 10);



    /*
     * STEP 5
     * Build AI Prompt
     */

    const prompt =
      buildRecommendationPrompt(
        preferenceDocument,
        retrievedMedia
      );



    /*
     * STEP 6
     * Ask Ollama
     */

    const aiResult =
      await generateResponse(prompt);



    /*
     * STEP 7
     * Parse AI JSON
     */

    const parsed =
      parseAIResponse(aiResult);



    /*
     * STEP 8
     * Final Response
     */

    return {

      statistics,

      favoriteGenres,


      retrievedCount:
        retrievedMedia.length,


      retrievedMedia,


      recommendations:
        parsed,


      generatedAt:
        new Date(),

    };



  } catch (error) {


    console.error(
      "Recommendation Error:",
      error.message
    );


    throw error;


  }

};



module.exports = {
  generateRecommendations,
};