import axios from "axios";

const url = "http://localhost:3001/books";

// you can export this as well
// export type Book = {
//     isbn: string,
//     title: string
// }

export const fetchBooks = () => axios.get(url);
export const fetchBooksById = (id) => axios.get(`${url}/${id}`);
export const createBook = (newBook) => axios.post(url, newBook);
export const updateBook = (id, updatedBook) =>
  axios.patch(`${url}/${id}`, updatedBook);
export const deleteBook = (id) => axios.delete(`${url}/${id}`);
