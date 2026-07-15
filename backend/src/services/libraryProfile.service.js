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
 * Convert profile into one object
 * that later becomes an embedding.
 */
const buildProfileDocument = (profile) => {

  let document = "";

  /* ===========================
      RATINGS
  =========================== */

  document += "HIGHLY RATED MEDIA\n\n";

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

    document += `Overview: ${item.media.overview}\n\n`;

  });

  /* ===========================
      REVIEWS
  =========================== */

  document += "\nUSER REVIEWS\n\n";

  profile.reviews.forEach((item) => {

    if (!item.media) return;

    document += `Title: ${item.media.title}\n`;

    document += `Review: ${item.review}\n\n`;

  });

  /* ===========================
      LISTS
  =========================== */

  document += "\nUSER LISTS\n\n";

  profile.listItems.forEach((item) => {

    if (!item.media) return;

    document += `List: ${item.list.name}\n`;

    document += `Title: ${item.media.title}\n`;

    if (item.notes) {
      document += `Notes: ${item.notes}\n`;
    }

    document += "\n";

  });

  return document;
};

module.exports = {
  buildLibraryProfile,
  buildProfileDocument,
};