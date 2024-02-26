import * as api from "../../api/bookAuthors";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getBookAuthors = createAsyncThunk(
  "posts/getBookAuthors",
  async () => {
    try {
      const response = await api.fetchBookAuthors();
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const createBookAuthor = createAsyncThunk(
  "posts/createBookAuthor",
  async (bookAuthor) => {
    try {
      const response = await api.createBookAuthor(bookAuthor);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const updateBookAuthor = createAsyncThunk(
  "posts/updateBookAuthor",
  async ({ id, bookAuthor }) => {
    try {
      const response = await api.updateBookAuthor(id, bookAuthor);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const deleteBookAuthor = createAsyncThunk(
  "posts/deleteBookAuthor",
  async (id) => {
    try {
      const response = await api.deleteBookAuthor(id);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
