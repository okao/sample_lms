import * as api from "../../api/authors";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAuthors = createAsyncThunk("posts/getAuthors", async () => {
  try {
    const response = await api.fetchAuthors();
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const createAuthor = createAsyncThunk(
  "posts/createAuthor",
  async (author) => {
    try {
      const response = await api.createAuthor(author);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const updateAuthor = createAsyncThunk(
  "posts/updateAuthor",
  async (id, author) => {
    try {
      const response = await api.updateAuthor({ id, author });
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const deleteAuthor = createAsyncThunk(
  "posts/deleteAuthor",
  async (id) => {
    try {
      const response = await api.deleteAuthor(id);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
