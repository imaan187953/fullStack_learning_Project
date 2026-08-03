import api from "./axios";

/**
 * Create Rating
 */
export const createRating = async (mediaId, rating) => {
  const response = await api.post("/ratings", {
    mediaId,
    rating,
  });

  return response.data;
};

/**
 * Get My Rating
 */
export const getMyRating = async (mediaId) => {
  const response = await api.get(`/ratings/${mediaId}`);

  return response.data;
};

/**
 * Update Rating
 */
export const updateRating = async (mediaId, rating) => {
  const response = await api.patch(`/ratings/${mediaId}`, {
    rating,
  });

  return response.data;
};

/**
 * Delete Rating
 */
export const deleteRating = async (mediaId) => {
  const response = await api.delete(`/ratings/${mediaId}`);

  return response.data;
};

/**
 * Average Rating
 */
export const getAverageRating = async (mediaId) => {
  const response = await api.get(
    `/ratings/${mediaId}/average`
  );

  return response.data;
};

/**
 * Get all ratings of logged-in user
 */
export const getMyRatings = async () => {
  const response = await api.get("/ratings/my");
  return response.data;
};