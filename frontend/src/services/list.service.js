import api from "./axios";

/**
 * Get all lists of logged-in user
 */
export const getMyLists = async () => {
  const response = await api.get("/lists");
  return response.data;
};

/**
 * Create new list
 */
export const createList = async (listData) => {
  const response = await api.post("/lists", listData);
  return response.data;
};

/**
 * Get single list
 */
export const getListById = async (listId) => {
  const response = await api.get(`/lists/${listId}`);
  return response.data;
};

/**
 * Update list
 */
export const updateList = async (listId, data) => {
  const response = await api.put(`/lists/${listId}`, data);
  return response.data;
};

/**
 * Delete list
 */
export const deleteList = async (listId) => {
  const response = await api.delete(`/lists/${listId}`);
  return response.data;
};

/**
 * Get all items in a list
 */
export const getListItems = async (listId) => {
  const response = await api.get(`/lists/${listId}/items`);
  return response.data;
};

/**
 * Add movie or TV show to a list
 */
export const addItemToList = async (listId, mediaData) => {
  const response = await api.post(
    `/lists/${listId}/items`,
    mediaData
  );

  return response.data;
};

/**
 * Remove item from a list
 */
export const removeItemFromList = async (
  listId,
  itemId
) => {
  const response = await api.delete(
    `/lists/${listId}/items/${itemId}`
  );

  return response.data;
};