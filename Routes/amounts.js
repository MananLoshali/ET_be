import express from "express";
import { addAmounts } from "../Controllers/add_income_expense.js";
import { deleteAmounts } from "../Controllers/delete_income_expense.js";
import { getAmounts } from "../Controllers/get_income_expense.js";

import {
  verifyToken,
  verifyTokenAndAuthorization,
} from "../Middlewares/verifyToken.js";

const router = express.Router();

// ADD INCOME AND EXPENSES
router.post("/add/:id", addAmounts); //id is user id

// DELETE INCOME AND EXPENSES
// router.delete("/delete/:id", verifyToken, deleteAmounts); //id is amount's id
router.delete("/delete/:id", deleteAmounts);

// GET INCOMES AND EXPENSES
// router.get("/get/:id", verifyTokenAndAuthorization, getAmounts); //id is user id
router.get("/get/:id", getAmounts); //id is user id

export default router;
