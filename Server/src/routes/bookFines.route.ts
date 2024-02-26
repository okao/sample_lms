import express from "express";
import { createFine, deleteFine, getAllFines, getFine, updateFine, updateFines, refreshFines } from "../services/bookFines.service";

// DEFINE ROUTER
const finesRouter = express.Router();

console.log("[server] Routing bookFines Request")


// IMPLEMENT ROUTES
finesRouter.get("/", getAllFines);
finesRouter.get("/:loan_id", getFine);
finesRouter.post("/", createFine);
finesRouter.put("/", updateFines);
finesRouter.put("/refresh", refreshFines);
finesRouter.put("/:loan_id", updateFine);
finesRouter.delete("/:loan_id", deleteFine);


export default finesRouter;