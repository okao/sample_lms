import axios from "axios";

const url = "http://localhost:3001/bookAuthors";

export const fetchBookAuthors = () => axios.get(url);
export const createBookAuthor = (newBookAuthor) =>
  axios.post(url, newBookAuthor);
export const updateBookAuthor = (id, updatedBookAuthor) =>
  axios.patch(`${url}/${id}`, updatedBookAuthor);
export const deleteBookAuthor = (id) => axios.delete(`${url}/${id}`);
