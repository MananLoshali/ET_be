import express from "express";
import { signUpUser } from "../Controllers/sign_up.js";
import { signInUser } from "../Controllers/sign_in.js";

const router = express.Router();

//  REGISTER ROUTE
router.post("/signup", signUpUser);

//  LOGIN ROUTE
router.post("/signin", signInUser);

export default router;
