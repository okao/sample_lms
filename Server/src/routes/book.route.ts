import express from "express";

// DEFINE ROUTER
const bookRouter = express.Router();

// IMPORT SERVICES
import { createBook, deleteBook, getAllBooks, getBook, updateBook } from "../services/book.service";

console.log("[server] Routing book call")


// IMPLEMENT ROUTES
bookRouter.get("/", getAllBooks);
bookRouter.get("/:isbn", getBook);
bookRouter.post("/", createBook);
bookRouter.put("/:isbn", updateBook);
bookRouter.delete("/:isbn", deleteBook);


export default bookRouter;