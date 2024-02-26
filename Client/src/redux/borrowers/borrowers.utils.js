import * as api from "../../api/borrowers";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getBorrowers = createAsyncThunk("posts/getBorrowers", async () => {
  try {
    const response = await api.fetchBorrowers();
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const createBorrower = createAsyncThunk(
  "posts/createBorrower",
  async (borrower) => {
    try {
      const response = await api.createBorrower(borrower);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const updateBorrower = createAsyncThunk(
  "posts/updateBorrower",
  async (id, borrower) => {
    try {
      const response = await api.updateBorrower(id, borrower);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const deleteBorrower = createAsyncThunk(
  "posts/deleteBorrower",
  async (id) => {
    try {
      const response = await api.deleteBorrower(id);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
