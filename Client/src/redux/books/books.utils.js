import * as api from "../../api/books";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getBooks = createAsyncThunk("posts/getBooks", async () => {
  try {
    const response = await api.fetchBooks();
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const createBook = createAsyncThunk("posts/createBook", async (book) => {
  try {
    const response = await api.createBook(book);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const updateBook = createAsyncThunk(
  "posts/updateBook",
  async (id, book) => {
    try {
      const response = await api.updateBook(id, book);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const deleteBook = createAsyncThunk("posts/deleteBook", async (id) => {
  try {
    const response = await api.deleteBook(id);
    return response.data;
  } catch (error) {
    return error.message;
  }
});
