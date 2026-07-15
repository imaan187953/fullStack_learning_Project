const { buildMediaDocument } = require("../utils/documentBuilder");

const {
  createEmbedding,
} = require("../services/embedding.service");

async function test() {

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

    original_language: "en"

  };

  const document = buildMediaDocument(movie);

  const embedding = await createEmbedding(document);

  console.log("Dimensions:", embedding.length);

  console.log(embedding.slice(0, 5));

}

test();