import api from "./axios";

/**
 * Register a new user
 */
export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

/**
 * Login user
 */
export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

/**
 * Get current logged-in user
 */
export const getProfile = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};

/**
 * Update user profile
 */
export const updateProfile = async (userData) => {
  const response = await api.put("/auth/profile", userData);
  return response.data;
};

/**
 * Delete account
 */
export const deleteAccount = async () => {
  const response = await api.delete("/auth/profile");
  return response.data;
};