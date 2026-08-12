const {
  chat,
} = require("../services/aiChat.service");

/**
 * AI Chat Controller
 */
const chatWithAI = async (req, res) => {
  try {

    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required.",
      });
    }

    const response = await chat(
      req.user._id,
      message
    );

    return res.status(200).json({
      success: true,
      reply: response,
    });

  } catch (error) {

    console.error(
      "AI Chat Error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  chatWithAI,
};