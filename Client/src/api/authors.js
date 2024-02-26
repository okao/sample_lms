import axios from "axios";

const url = "http://localhost:3001/authors";

export const fetchAuthors = () => axios.get(url);
export const createAuthor = (newAuthor) => axios.post(url, newAuthor);
export const updateAuthor = (id, updatedAuthor) =>
  axios.patch(`${url}/${id}`, updatedAuthor);
export const deleteAuthor = (id) => axios.delete(`${url}/${id}`);
