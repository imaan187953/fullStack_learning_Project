const {
  generateEmbedding,
} = require("../services/ollama.service");

async function test() {
  const vector = await generateEmbedding(
    "Interstellar is a science fiction movie."
  );

  console.log("Dimensions:", vector.length);

  console.log(vector.slice(0,5));
}

test();