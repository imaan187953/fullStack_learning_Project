const { Ollama } = require("ollama");

const ollama = new Ollama({
  host: "https://brad-spin-highways-determined.trycloudflare.com",
});

module.exports = ollama;