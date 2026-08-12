const {
    buildLibraryProfile,
    buildProfileDocument,
} = require("./libraryProfile.service");

/**
 * Builds the user's semantic preference document.
 *
 * Ratings, reviews, and list items are all used
 * as signals of the user's entertainment taste.
 */
const buildUserPreferences = async (userId) => {

    // ==========================================
    // STEP 1: Get complete user profile
    // ==========================================

    const profile =
        await buildLibraryProfile(userId);


    // ==========================================
    // STEP 2: Build semantic profile document
    // ==========================================

    const profileDocument =
        buildProfileDocument(profile);


    // ==========================================
    // STEP 3: Calculate statistics
    // ==========================================

    const totalRatings =
        profile.ratings.length;

    const totalReviews =
        profile.reviews.length;

    const totalLists =
        profile.lists.length;


    // ==========================================
    // STEP 4: Calculate favorite genres
    //
    // Ratings = strong signal
    // Reviews = strong signal
    // Lists = meaningful signal
    // ==========================================

    const genreFrequency = {};


    // ------------------------------------------
    // Genres from highly rated media
    // ------------------------------------------

    profile.ratings.forEach((item) => {

        if (!item.media?.genres) return;

        item.media.genres.forEach((genre) => {

            const genreName =
                typeof genre === "string"
                    ? genre
                    : genre.name;

            if (!genreName) return;

            // Strong signal
            genreFrequency[genreName] =
                (genreFrequency[genreName] || 0) + 3;
        });
    });


    // ------------------------------------------
    // Genres from reviewed media
    // ------------------------------------------

    profile.reviews.forEach((item) => {

        if (!item.media?.genres) return;

        item.media.genres.forEach((genre) => {

            const genreName =
                typeof genre === "string"
                    ? genre
                    : genre.name;

            if (!genreName) return;

            // Strong signal
            genreFrequency[genreName] =
                (genreFrequency[genreName] || 0) + 2;
        });
    });


    // ------------------------------------------
    // Genres from user's lists
    // ------------------------------------------

    profile.listItems.forEach((item) => {

        if (!item.media?.genres) return;

        item.media.genres.forEach((genre) => {

            const genreName =
                typeof genre === "string"
                    ? genre
                    : genre.name;

            if (!genreName) return;

            // Meaningful signal
            genreFrequency[genreName] =
                (genreFrequency[genreName] || 0) + 2;
        });
    });


    // ------------------------------------------
    // Top 5 genres
    // ------------------------------------------

    const favoriteGenres =
        Object.entries(genreFrequency)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([genre]) => genre);


    // ==========================================
    // STEP 5: Cold-start detection
    // ==========================================

    const isNewUser =
        totalRatings === 0 &&
        totalReviews === 0 &&
        totalLists === 0;


    // ==========================================
    // STEP 6: Build final preference document
    // ==========================================

    let preferenceDocument;


    if (isNewUser) {

        preferenceDocument = `
You are analyzing a new CineTrack user.

The user has no ratings,
no reviews,
and no custom lists.

There is no available information about
this user's entertainment preferences.

This is a cold-start recommendation scenario.

Do not assume:

- favorite genres
- favorite themes
- preferred storytelling styles
- viewing habits

Only provide general recommendations suitable
for a new user.
`;

    } else {

        preferenceDocument = `
You are analyzing a CineTrack user's
entertainment preferences.

USER ACTIVITY SUMMARY

Highly Rated Titles:
${totalRatings}

Written Reviews:
${totalReviews}

Custom Lists:
${totalLists}

Favorite Genres:
${favoriteGenres.join(", ") || "Unknown"}


IMPORTANT TASTE SIGNALS

The user's entertainment taste should be
understood using ALL available signals.

Highly rated media represents strong explicit
interest.

Reviewed media represents titles the user
actively engaged with.

Listed media represents titles the user
intentionally saved or organized.

The user can have multiple different interests.

Do NOT assume that one highly rated title
represents the user's entire taste.

Look for patterns across:

- genres
- themes
- tone
- storytelling style
- character types
- relationships
- emotional style
- entertainment preferences


${profileDocument}


Use the complete profile to understand
the user's overall taste.

This document will be used as the semantic
query for movie and TV recommendation retrieval.
`;
    }


    // ==========================================
    // STEP 7: Return data
    // ==========================================

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