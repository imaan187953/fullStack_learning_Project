const STORAGE_KEY = "cinetrack_ai_recommendations";

export const saveRecommendations = (data) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  );
};

export const loadRecommendations = () => {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) return null;

  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
};

export const clearRecommendations = () => {
  localStorage.removeItem(STORAGE_KEY);
};