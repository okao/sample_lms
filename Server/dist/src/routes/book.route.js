"use strict";
// router.get("/:id", getBorrowers)
// router.post("/", createPost);
// router.patch("/:id", updatePost);
// router.delete("/:id", deletePost);
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// DEFINE ROUTER
const borrowerRouter = express_1.default.Router();
// IMPORT SERVICES
const book_service_1 = require("../services/book.service");
// / 
borrowerRouter.get("/", book_service_1.getAllBooks);
borrowerRouter.get("/:id", book_service_1.getBook);
borrowerRouter.post("/", book_service_1.createBook);
exports.default = borrowerRouter;
