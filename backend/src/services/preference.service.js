const {
  buildLibraryProfile,
  buildProfileDocument,
} = require("./libraryProfile.service");

/**
 * Builds the user's semantic preference document.
 * This document will later be embedded and used
 * as the query for Qdrant semantic search.
 */
const buildUserPreferences = async (userId) => {

  // Step 1: Get the user's library profile
  const profile = await buildLibraryProfile(userId);


  // Step 2: Convert it into a text document
  const profileDocument = buildProfileDocument(profile);


  // Step 3: Calculate statistics

  const totalRatings = profile.ratings.length;
  const totalReviews = profile.reviews.length;
  const totalLists = profile.lists.length;


  // Step 4: Count favorite genres

  const genreFrequency = {};

  profile.ratings.forEach((item) => {

    if (!item.media || !item.media.genres)
      return;


    item.media.genres.forEach((genre) => {

      const genreName =
        typeof genre === "string"
          ? genre
          : genre.name;


      genreFrequency[genreName] =
        (genreFrequency[genreName] || 0) + 1;

    });

  });


  const favoriteGenres =
    Object.entries(genreFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map((item) => item[0]);



  // Step 5: Detect new user (cold start)

  const isNewUser =
    totalRatings === 0 &&
    totalReviews === 0 &&
    totalLists === 0;



  // Step 6: Create preference document

  let preferenceDocument;


  if (isNewUser) {

    preferenceDocument = `

You are analyzing a new CineTrack user.

The user has no ratings,
no reviews,
and no custom lists.

There is no available information about this user's entertainment preferences.

This is a cold-start recommendation scenario.

Do not assume:
- favorite genres
- favorite themes
- preferred storytelling styles
- viewing habits

Only provide general recommendations suitable for a new user.

`;

  } else {


    preferenceDocument = `

You are analyzing a CineTrack user's entertainment preferences.


=========================
PROFILE SUMMARY
=========================

Highly Rated Titles:
${totalRatings}


Written Reviews:
${totalReviews}


Custom Lists:
${totalLists}


Favorite Genres:
${favoriteGenres.join(", ") || "Unknown"}



=========================
USER LIBRARY
=========================

${profileDocument}



=========================
GOAL
=========================

Understand the user's taste,
favorite genres,
preferred themes,
preferred storytelling style,
and entertainment interests.

This document will be used for semantic retrieval.

`;

  }



  // Step 7: Return data

  return {

    preferenceDocument,

    favoriteGenres,

    statistics: {

      ratings: totalRatings,

      reviews: totalReviews,

      lists: totalLists,

    },

  };

};



module.exports = {
  buildUserPreferences,
};