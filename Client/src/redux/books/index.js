import { createSlice, createSelector } from "@reduxjs/toolkit";
import Search from "antd/es/transfer/search";
// reducer functions
import { getBooks, createBook, updateBook, deleteBook } from "./books.utils";

const INITIAL_STATE = { books: [], loading: false, error: "" };

const BooksSlice = createSlice({
  name: "books",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ||
          "Something went wrong while fetching all books...";
      })
      .addCase(createBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books = [...state.books, action.payload];
      })
      .addCase(createBook.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ||
          "Something went wrong while creating a new book...";
      })
      .addCase(updateBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books = state.books.map((book) =>
          book.isbn === action.payload.isbn ? action.payload : book
        );
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ||
          "Something went wrong while updating a book...";
      })
      .addCase(deleteBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books = state.books.filter(
          (book) => book.isbn !== action.payload.isbn
        );
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ||
          "Something went wrong while deleting a book...";
      });
  },
});

export const SelectBooks = (state) => state.books.books;

export const SelectBooksWithKeys = createSelector([SelectBooks], (books) =>
  books.map((book, index) => {
    return { ...book, key: index + 1 };
  })
);

export const SelectBookCount = createSelector([SelectBooks], (books) => {
  return books.reduce((accumulator) => accumulator + 1, 0);
});

export const SelectBookById = (isbn) =>
  createSelector([SelectBooks], (books) =>
    isbn ? books.find((book) => book.isbn === isbn) : null
  );

export default BooksSlice.reducer;
