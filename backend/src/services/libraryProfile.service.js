const Rating = require("../models/rating.model");
const Review = require("../models/review.model");
const List = require("../models/list.model");
const ListItem = require("../models/listItem.model");

/**
 * Build the complete user profile
 */
const buildLibraryProfile = async (userId) => {

  /* ===========================
      HIGH RATINGS
  =========================== */

  const ratings = await Rating.find({
    user: userId,
    rating: { $gte: 7 },
  }).populate("media");

  /* ===========================
      REVIEWS
  =========================== */

  const reviews = await Review.find({
    user: userId,
  }).populate("media");

  /* ===========================
      USER LISTS
  =========================== */

  const lists = await List.find({
    owner: userId,
  });

  const listIds = lists.map((list) => list._id);

  const listItems = await ListItem.find({
    list: { $in: listIds },
  })
    .populate("media")
    .populate("list");

  return {
    ratings,
    reviews,
    lists,
    listItems,
  };
};

/**
 * Convert profile into a semantic preference document.
 * This document becomes the query for Qdrant.
 */
const buildProfileDocument = (profile) => {

  let document = "";

  /* ===========================
     HIGHLY RATED MEDIA
  =========================== */

  document += `
HIGHLY RATED MEDIA

The user explicitly gave high ratings to these titles.
These are strong signals of the user's interests.

`;

  profile.ratings.forEach((item) => {

    if (!item.media) return;

    document += `Title: ${item.media.title}\n`;

    document += `Type: ${item.media.mediaType}\n`;

    document += `Rating: ${item.rating}/10\n`;

    if (item.media.genres?.length) {

      const genres = item.media.genres
        .map((g) => g.name || g)
        .join(", ");

      document += `Genres: ${genres}\n`;
    }

    if (item.media.overview) {
      document += `Overview: ${item.media.overview}\n`;
    }

    document += "\n";
  });


  /* ===========================
     USER REVIEWS
  =========================== */

  document += `
USER REVIEWS

These are titles the user actively engaged with
by writing a review.

`;

  profile.reviews.forEach((item) => {

    if (!item.media) return;

    document += `Title: ${item.media.title}\n`;

    document += `Type: ${item.media.mediaType}\n`;

    document += `Review: ${item.review}\n`;

    if (item.media.genres?.length) {

      const genres = item.media.genres
        .map((g) => g.name || g)
        .join(", ");

      document += `Genres: ${genres}\n`;
    }

    if (item.media.overview) {
      document += `Overview: ${item.media.overview}\n`;
    }

    document += "\n";
  });


  /* ===========================
     USER LISTS
  =========================== */

  document += `
USER LISTS

The user intentionally added these titles to
their personal lists. These titles are important
signals of the user's interests.

`;

  profile.listItems.forEach((item) => {

    if (!item.media) return;

    document += `List: ${item.list?.name || "Unnamed List"}\n`;

    document += `Title: ${item.media.title}\n`;

    document += `Type: ${item.media.mediaType}\n`;

    if (item.media.genres?.length) {

      const genres = item.media.genres
        .map((g) => g.name || g)
        .join(", ");

      document += `Genres: ${genres}\n`;
    }

    if (item.media.overview) {
      document += `Overview: ${item.media.overview}\n`;
    }

    if (item.notes) {
      document += `User Notes: ${item.notes}\n`;
    }

    document += "\n";
  });


  /* ===========================
     TASTE INTERPRETATION
  =========================== */

  document += `
TASTE INTERPRETATION

Use all available user signals when understanding
the user's entertainment preferences.

Highly rated media represents strong explicit interest.

Reviewed media represents titles the user actively
engaged with.

Listed media represents titles the user intentionally
saved or organized.

The user may have multiple different interests.

Do not assume that one highly rated title represents
the user's entire taste.

Look for patterns across:

- genres
- themes
- tone
- storytelling style
- character types
- relationships
- emotional style
- overall entertainment preferences

Recommendations should reflect the user's overall
taste rather than focusing on only one title.
`;

  return document;
};

module.exports = {
  buildLibraryProfile,
  buildProfileDocument,
};