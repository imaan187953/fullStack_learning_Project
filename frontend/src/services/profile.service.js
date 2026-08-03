import api from "./axios";

export const updateProfile = async (profileData) => {
  const response = await api.put("/auth/profile", profileData);

  return response.data;
};

export const deleteAccount = async () => {
  const response = await api.delete("/auth/profile");

  return response.data;
};

/**
 * Get profile statistics
 */
export const getProfileStats = async () => {
  const response = await api.get("/users/profile/stats");
  return response.data;
};