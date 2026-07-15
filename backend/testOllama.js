const ollama = require("./src/config/ollama");

async function test() {
  try {
    const models = await ollama.list();
    console.log(models);
  } catch (err) {
    console.error(err);
  }
}

test();