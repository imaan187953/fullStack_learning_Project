const { buildMediaDocument } = require("../utils/documentBuilder");

const movie = {
  title: "Interstellar",
  mediaType: "movie",
  genres: [
    { name: "Science Fiction" },
    { name: "Adventure" }
  ],
  overview:
    "A team of explorers travel through a wormhole.",
  release_date: "2014-11-07",
  vote_average: 8.4,
  original_language: "en",
};

console.log(buildMediaDocument(movie));