"use strict";
// router.get("/:id", getBorrowers)
// router.post("/", createPost);
// router.patch("/:id", updatePost);
// router.delete("/:id", deletePost);
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// IMPORT EXPRESS
const express_1 = __importDefault(require("express"));
// DEFINE ROUTER
const borrowerRouter = express_1.default.Router();
// IMPORT SERVICES
const bookBorrower_service_1 = require("../services/bookBorrower.service");
console.log("[server] Routing Borrower Request");
// DEFINE ROUTES
borrowerRouter.get("/", bookBorrower_service_1.getAllBorrowers);
borrowerRouter.get("/:id", bookBorrower_service_1.getBorrower);
borrowerRouter.post("/", bookBorrower_service_1.createBorrower);
// EXPORT ROUTER 
exports.default = borrowerRouter;
