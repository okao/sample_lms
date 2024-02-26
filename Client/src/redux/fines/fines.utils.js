import * as api from "../../api/fines";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getFines = createAsyncThunk("posts/getFines", async () => {
  try {
    const response = await api.fetchFines();
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const refreshFines = createAsyncThunk(
  "posts/refreshFines",
  async (date) => {
    try {
      const response = await api.refreshFines(date);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const createFine = createAsyncThunk("posts/createFine", async (loan) => {
  try {
    const response = await api.createFine(loan);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const updateFine = createAsyncThunk(
  "posts/updateFine",
  async ({ loan_id, fine }) => {
    try {
      const response = await api.updateFine(loan_id, fine);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const updateFines = createAsyncThunk(
  "posts/updateFines",
  async (fines) => {
    try {
      const response = await api.updateFines(fines);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const deleteFine = createAsyncThunk("posts/deleteFine", async (id) => {
  try {
    const response = await api.deleteFine(id);
    return response.data;
  } catch (error) {
    return error.message;
  }
});
