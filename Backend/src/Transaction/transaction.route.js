import { Router } from "express";
const TransactionRouter = Router();
import { createTransaction, updateTransaction, deleteTransaction, getTransactions } from "./transaction.controller.js";
// import { AdminUserGuard } from "..middleware/middleware/guard.js";
import { AdminUserGuard } from "../middleware/guard.js";


TransactionRouter.post("/create", AdminUserGuard, createTransaction);
TransactionRouter.put("/update/:id",AdminUserGuard, updateTransaction);
TransactionRouter.delete("/delete/:id",AdminUserGuard, deleteTransaction);
TransactionRouter.get("/get",AdminUserGuard,  getTransactions);

export default TransactionRouter;
