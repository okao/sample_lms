import * as api from "../../api/loans";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getLoans = createAsyncThunk("posts/getLoans", async () => {
  try {
    const response = await api.fetchLoans();
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const createLoan = createAsyncThunk("posts/createLoan", async (loan) => {
  try {
    const response = await api.createLoan(loan);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const updateLoan = createAsyncThunk(
  "posts/updateLoan",
  async ({ loan_id, loan }) => {
    try {
      const response = await api.updateLoan(loan_id, loan);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const updateLoans = createAsyncThunk(
  "posts/updateLoans",
  async (loans) => {
    try {
      const response = await api.updateLoans(loans);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const deleteLoan = createAsyncThunk("posts/deleteLoan", async (id) => {
  try {
    const response = await api.deleteLoan(id);
    return response.data;
  } catch (error) {
    return error.message;
  }
});
