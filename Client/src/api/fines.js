import axios from "axios";

const url = "http://localhost:3001/fines";

export const fetchFines = () => axios.get(url);
export const createFine = (newFine) => axios.post(url, newFine);
export const updateFine = (id, updatedFine) =>
  axios.put(`${url}/${id}`, updatedFine);
export const updateFines = (updatedFines) => axios.put(`${url}`, updatedFines);
export const deleteFine = (id) => axios.delete(`${url}/${id}`);
export const refreshFines = (date) => axios.put(`${url}/refresh`, date);
