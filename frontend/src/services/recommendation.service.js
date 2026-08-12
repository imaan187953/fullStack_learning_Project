import api from "./axios";

/**
 * Generate AI Recommendations
 */
export const generateRecommendations = async () => {
  const response = await api.get("/recommendations");

  return response.data;
};