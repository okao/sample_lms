// IMPORT EXPRESS
import express from "express";

// DEFINE ROUTER
const borrowerRouter = express.Router();

// IMPORT SERVICES
import {
    createBorrower,
    getAllBorrowers,
    getBorrower,
    removeBorrower,
    updateBorrower,
    getBorrowerBySSN
} from "../services/bookBorrower.service";

console.log("[server] Routing borrower Request")

// DEFINE ROUTES
borrowerRouter.get("/", getAllBorrowers);
borrowerRouter.get("/:card_id", getBorrower);
borrowerRouter.get("/ssn/:ssn", getBorrowerBySSN);
borrowerRouter.post("/", createBorrower);
borrowerRouter.delete("/:card_id", removeBorrower)
borrowerRouter.put("/:card_id", updateBorrower)
// EXPORT ROUTER 
export default borrowerRouter;