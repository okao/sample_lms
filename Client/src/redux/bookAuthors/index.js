import { createSlice, createSelector } from "@reduxjs/toolkit";
// reducer functions
import {
  getBookAuthors,
  createBookAuthor,
  updateBookAuthor,
  deleteBookAuthor,
} from "./book_authors.utils";

const INITIAL_STATE = { bookAuthors: [], loading: false, error: "" };

const BookAuthorsSlice = createSlice({
  name: "book_authors",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBookAuthors.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBookAuthors.fulfilled, (state, action) => {
        state.loading = false;
        state.bookAuthors = action.payload;
      })
      .addCase(getBookAuthors.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ||
          "Something went wrong while fetching all book authors...";
      })
      .addCase(createBookAuthor.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBookAuthor.fulfilled, (state, action) => {
        state.loading = false;
        state.bookAuthors = [...state.bookAuthors, action.payload];
      })
      .addCase(createBookAuthor.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ||
          "Something went wrong while creating a new book author...";
      })
      .addCase(updateBookAuthor.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBookAuthor.fulfilled, (state, action) => {
        state.loading = false;
        state.authors = state.bookAuthors.map((author) =>
          author.author_id === action.payload.author_id
            ? action.payload
            : author
        );
      })
      .addCase(updateBookAuthor.rejected, (state, action) => {
        state.loadingBook = false;
        state.error =
          action.error.message ||
          "Something went wrong while updating a book author...";
      })
      .addCase(deleteBookAuthor.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBookAuthor.fulfilled, (state, action) => {
        state.loading = false;
        state.authors = state.bookAuthors.filter(
          (author) => author.author_id !== action.payload.author_id
        );
      })
      .addCase(deleteBookAuthor.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ||
          "Something went wrong while deleting a author...";
      });
  },
});

export const SelectBookAuthors = (state) => state.authors.bookAuthors;

export const SelectBookAuthorCount = createSelector(
  [SelectBookAuthors],
  (authors) => {
    return authors.reduce((accumulator) => accumulator + 1, 0);
  }
);

export const SelectBookAuthorsWithKeys = createSelector(
  [SelectBookAuthors],
  (borrowers) =>
    borrowers.map((borrower, index) => {
      return { ...borrower, key: index + 1 };
    })
);

export const SelectAuthorByIsbn = (isbn) =>
  createSelector([SelectBookAuthors], (bookAuthors) =>
    isbn ? bookAuthors.find((author) => author.isbn === isbn) : null
  );

export default BookAuthorsSlice.reducer;
