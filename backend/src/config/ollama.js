const { Ollama } = require("ollama");

const ollama = new Ollama({
  host: "http://127.0.0.1:11434",
});

module.exports = ollama;