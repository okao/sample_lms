import express from "express";
import { createAuthor, deleteAuthor, getAllAuthors, getAuthor, updateAuthor } from "../services/authors.service";

// DEFINE ROUTER
const authorRouter = express.Router();

// IMPORT SERVICES
console.log("[server] Routing author endpoint")

// IMPLEMENT ROUTES
authorRouter.get("/", getAllAuthors);
authorRouter.get("/:isbn", getAuthor);
authorRouter.post("/", createAuthor);
authorRouter.put("/:isbn", updateAuthor);
authorRouter.delete("/:isbn", deleteAuthor);


export default authorRouter;