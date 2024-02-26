import { configureStore, combineReducers } from "@reduxjs/toolkit";
// to display actions to the dev console
import logger from "redux-logger";
// to allow async operation in the redux store
import thunk from "redux-thunk";
// brings back the data from local storage when the page is reloaded.
import { persistStore, persistReducer } from "redux-persist";
// defaults to localStorage for web
import storage from "redux-persist/lib/storage";
// reducers
import booksReducer from "./books/index";
import authorsReducer from "./authors/index";
import borrowersReducer from "./borrowers/index";
import finesReducer from "./fines/index";
import loansReducer from "./loans/index";
import bookAuthorsReducer from "./bookAuthors/index";

const middlewares = [thunk];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

const rootReducer = combineReducers({
  books: booksReducer,
  bookAuthors: bookAuthorsReducer,
  authors: authorsReducer,
  borrowers: borrowersReducer,
  fines: finesReducer,
  loans: loansReducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["bookAuthors"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: middlewares,
});

export const persistor = persistStore(store);
