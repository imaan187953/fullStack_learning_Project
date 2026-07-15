const {
  generateRecommendations,
} = require("../services/recommendation.service");

/**
 * Generate AI Recommendations
 */
const getRecommendations = async (req, res) => {
  try {
    const userId = req.user._id;

    console.log(
      `Generating recommendations for user ${userId}`
    );

    const recommendations =
      await generateRecommendations(userId);

    return res.status(200).json({
      success: true,
      message: "Recommendations generated successfully.",
      data: recommendations,
    });

  } catch (error) {

    console.error(
      "Recommendation Controller Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to generate recommendations.",
      error: error.message,
    });

  }
};

module.exports = {
  getRecommendations,
};