/**
 * Builds a semantic document for embedding.
 * The quality of this document directly affects
 * the quality of semantic search in Qdrant.
 */

const buildMediaDocument = (media) => {
  const sections = [];

  /* ------------------------------------------
     TITLE
  ------------------------------------------ */

  sections.push(`Title: ${media.title}`);

  /* ------------------------------------------
     MEDIA TYPE
  ------------------------------------------ */

  switch (media.mediaType) {
    case "movie":
      sections.push("Type: Movie");
      break;

    case "tv":
      sections.push("Type: Television Series");
      break;

    case "season":
      sections.push("Type: TV Season");
      break;

    default:
      sections.push(`Type: ${media.mediaType}`);
  }

  /* ------------------------------------------
     GENRES
  ------------------------------------------ */

  if (media.genres && media.genres.length) {
    const genreNames = media.genres
      .map((genre) =>
        typeof genre === "string"
          ? genre
          : genre.name
      )
      .join(", ");

    sections.push(`Genres: ${genreNames}`);
  }

  /* ------------------------------------------
     OVERVIEW
  ------------------------------------------ */

  if (
    media.overview &&
    media.overview.trim().length
  ) {
    sections.push(`Overview: ${media.overview}`);
  }

  /* ------------------------------------------
     RELEASE DATE
  ------------------------------------------ */

  const releaseDate =
    media.release_date ||
    media.first_air_date ||
    media.air_date;

  if (releaseDate) {
    sections.push(`Release Date: ${releaseDate}`);
  }

  /* ------------------------------------------
     LANGUAGE
  ------------------------------------------ */

  if (media.original_language) {
    sections.push(
      `Original Language: ${media.original_language}`
    );
  }

  /* ------------------------------------------
     RATING
  ------------------------------------------ */

  if (media.vote_average) {
    sections.push(
      `TMDB Rating: ${media.vote_average}/10`
    );
  }

  /* ------------------------------------------
     SEASON DETAILS
  ------------------------------------------ */

  if (media.mediaType === "season") {
    if (media.season_number !== undefined) {
      sections.push(
        `Season Number: ${media.season_number}`
      );
    }

    if (media.episode_count) {
      sections.push(
        `Episodes: ${media.episode_count}`
      );
    }
  }

  /* ------------------------------------------
     FINAL DOCUMENT
  ------------------------------------------ */

  return sections.join("\n\n");
};

module.exports = {
  buildMediaDocument,
};