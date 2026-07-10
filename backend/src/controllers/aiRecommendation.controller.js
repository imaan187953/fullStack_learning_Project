const {
  generateRecommendations,
} = require("../services/aiRecommendation.service");

const getRecommendations = async (req, res) => {
  try {
    const recommendations = await generateRecommendations(req.user._id);

    res.status(200).json({
      success: true,
      recommendations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getRecommendations,
};