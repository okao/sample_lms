// IMPORT EXPRESS
import express from "express";

// DEFINE ROUTER
const bookAuthorRouter = express.Router();

// IMPORT SERVICES
import {
    createBookAuthor,
    getAllBookAuthors,
    getBookAuthor,
    deleteBookAuthor,
    updateBookAuthor
} from "../services/bookAuthors.service";

console.log("[server] Routing bookAuthor Request")

// DEFINE ROUTES
bookAuthorRouter.get("/", getAllBookAuthors);
bookAuthorRouter.get("/:id", getBookAuthor);
bookAuthorRouter.post("/", createBookAuthor);
bookAuthorRouter.delete("/:id", deleteBookAuthor)
bookAuthorRouter.put("/:id", updateBookAuthor)

// EXPORT ROUTER 
export default bookAuthorRouter;