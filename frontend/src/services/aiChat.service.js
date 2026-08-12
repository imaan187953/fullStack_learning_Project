import api from "./axios";

export const askCineTrackAI = async (message) => {
  const response = await api.post("/ai/chat", {
    message,
  });

  return response.data;
};