const {
  generateResponse,
} = require("../services/ollama.service");

async function test() {

 const response = await generateResponse(
 "Recommend three sci-fi movies."
 );

 console.log(response);

}

test();