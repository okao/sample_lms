import { createSlice, createSelector } from "@reduxjs/toolkit";
// reducer functions
import {
  getBorrowers,
  createBorrower,
  updateBorrower,
  deleteBorrower,
} from "./borrowers.utils";

const INITIAL_STATE = { borrowers: [], loading: false, error: "" };

const BorrowersSlice = createSlice({
  name: "borrowers",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBorrowers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBorrowers.fulfilled, (state, action) => {
        state.loading = false;
        state.borrowers = action.payload;
      })
      .addCase(getBorrowers.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ||
          "Something went wrong while fetching all borrowers...";
      })
      .addCase(createBorrower.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBorrower.fulfilled, (state, action) => {
        state.loading = false;
        state.borrowers = [...state.borrowers, action.payload];
      })
      .addCase(createBorrower.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ||
          "Something went wrong while creating a new borrower...";
      })
      .addCase(updateBorrower.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBorrower.fulfilled, (state, action) => {
        state.loading = false;
        state.borrowers = state.borrowers.map((borrower) =>
          borrower.card_id === action.payload.card_id
            ? action.payload
            : borrower
        );
      })
      .addCase(updateBorrower.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ||
          "Something went wrong while updating a borrower...";
      })
      .addCase(deleteBorrower.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBorrower.fulfilled, (state, action) => {
        state.loading = false;
        state.borrowers = state.borrowers.filter(
          (borrower) => borrower.card_id !== action.payload.card_id
        );
      })
      .addCase(deleteBorrower.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ||
          "Something went wrong while deleting a borrower...";
      });
  },
});

export const SelectBorrowers = (state) => state.borrowers.borrowers;

export const SelectBorrowerCount = createSelector(
  [SelectBorrowers],
  (borrowers) => {
    return borrowers.reduce((accumulator) => accumulator + 1, 0);
  }
);

export const SelectBorrowersWithKeys = createSelector(
  [SelectBorrowers],
  (borrowers) =>
    borrowers.map((borrower, index) => {
      return { ...borrower, key: index + 1 };
    })
);

export const SelectBorrowerById = (card_id) =>
  createSelector([SelectBorrowers], (borrowers) =>
    card_id ? borrowers.find((borrower) => borrower.card_id === card_id) : null
  );

export const SelectBorrowerBySsn = (ssn) =>
  createSelector([SelectBorrowers], (borrowers) =>
    ssn ? borrowers.find((borrower) => borrower.ssn === ssn) : null
  );

export default BorrowersSlice.reducer;
