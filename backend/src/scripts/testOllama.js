require("dotenv").config();

const ollama = require("../config/ollama");

async function test() {
  try {
    const response = await ollama.chat({
      model: "gemma4",
      messages: [
        {
          role: "user",
          content: "Say hello in one short sentence.",
        },
      ],
      stream: false,
    });

    console.log("OLLAMA CLOUD WORKING ✅");
    console.log(response.message.content);
  } catch (error) {
    console.error("OLLAMA CLOUD FAILED ❌");
    console.error(error.message);

    if (error.response) {
      console.error(error.response.data);
    }
  }
}

test();