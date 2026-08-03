import api from "./axios";

/**
 * Get all reviews for a media
 */
export const getReviews = async (mediaId) => {
  const response = await api.get(`/reviews/media/${mediaId}`);

  return response.data;
};

/**
 * Get my review
 */
export const getMyReview = async (mediaId) => {
  const response = await api.get(`/reviews/my/${mediaId}`);

  return response.data;
};

/**
 * Create review
 */
export const createReview = async (mediaId, review) => {
  const response = await api.post("/reviews", {
    mediaId,
    review,
  });

  return response.data;
};

/**
 * Update review
 */
export const updateReview = async (reviewId, review) => {
  const response = await api.patch(`/reviews/${reviewId}`, {
    review,
  });

  return response.data;
};

/**
 * Delete review
 */
export const deleteReview = async (reviewId) => {
  const response = await api.delete(`/reviews/${reviewId}`);

  return response.data;
};

/**
 * Get all reviews of logged-in user
 */
export const getMyReviews = async () => {
  const response = await api.get("/reviews/my");
  return response.data;
};