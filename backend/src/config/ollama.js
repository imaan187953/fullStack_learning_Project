const { Ollama } = require("ollama");

const ollama = new Ollama({
  host: "https://singles-tomorrow-enclosure-enemies.trycloudflare.com/",
});

module.exports = ollama;