import express from "express";
import signUpRoute from "./Routes/auth.js";
import signInRoute from "./Routes/auth.js";
import AmountsRoute from "./Routes/amounts.js";
import { connectDB } from "./data/database.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

const PORT = process.env.PORT || 3500;

const app = express();

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

app.use(cors());

// {
//   origin: [process.env.FRONTEND_URL],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true,
// }

app.use(express.json());
dotenv.config({ path: ".env" });
app.use(cookieParser());

connectDB();

// AUTH ROUTE ( Login and Register )

app.use("/api/v1/auth", signUpRoute);
app.use("/api/v1/auth", signInRoute);

// Modify INCOME AND EXPENSE ROUTE (MODIFICATON include adding ,deleting the incomes and expenses)

app.use("/api/v1/amounts", AmountsRoute);

app.listen(PORT, () => {
  console.log("Listening.... at port..." + PORT);
});
