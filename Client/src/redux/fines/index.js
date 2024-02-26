import { createSlice, createSelector, isAnyOf } from "@reduxjs/toolkit";
// reducer functions
import {
  getFines,
  refreshFines,
  createFine,
  updateFine,
  updateFines,
  deleteFine,
} from "./fines.utils";

const INITIAL_STATE = { fines: [], loading: false, error: "" };

const FinesSlice = createSlice({
  name: "fines",
  initialState: INITIAL_STATE,
  reducers: {
    // FILTER FINES BASED ON PAID VALUE
    filter(state) {
      state.fines = state.fines.filter((fine) => fine.paid === false);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createFine.pending, (state) => {
        state.loading = true;
      })
      .addCase(createFine.fulfilled, (state, action) => {
        state.loading = false;
        state.fines = [...state.fines, action.payload];
      })
      .addCase(createFine.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ||
          "Something went wrong while creating a new fines...";
      })
      .addCase(updateFine.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateFine.fulfilled, (state, action) => {
        state.loading = false;
        state.fines = state.fines.map((fine) =>
          fine.loan_id === action.payload.loan_id ? action.payload : fine
        );
      })
      .addCase(updateFine.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ||
          "Something went wrong while updating a fines...";
      })
      .addCase(deleteFine.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteFine.fulfilled, (state, action) => {
        state.loading = false;
        state.fines = state.fines.filter(
          (fine) => fine.loan_id !== action.payload.loan_id
        );
      })
      .addCase(deleteFine.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ||
          "Something went wrong while deleting a fines...";
      })
      .addMatcher(
        isAnyOf(getFines.pending, refreshFines.pending, updateFines.pending),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          getFines.fulfilled,
          refreshFines.fulfilled,
          updateFines.fulfilled
        ),
        (state, action) => {
          state.loading = false;
          state.fines = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(getFines.rejected, refreshFines.rejected, updateFines.rejected),
        (state, action) => {
          state.loading = false;
          state.error =
            action.error.message ||
            "Something went wrong while fetching all fines...";
        }
      );
  },
});

export const SelectFines = (state) => state.fines.fines;

export const SelectFineCount = createSelector([SelectFines], (fines) =>
  fines.reduce((accumulator) => accumulator + 1, 0)
);

export const SelectFinesById = (loan_id) =>
  createSelector([SelectFines], (fines) =>
    fines.filter((fine) => fine.loan_id !== loan_id)
  );

export const SelectFineAmountById = (loan_id) =>
  createSelector([SelectFinesById(loan_id)], (fine) => fine.fine_amout);

export const { filter } = FinesSlice.actions;
export default FinesSlice.reducer;
