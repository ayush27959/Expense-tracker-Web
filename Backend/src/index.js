import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.listen(3030, () => {
  console.log("server is running on port 3030");
});
//data base connection
import mongoose from "mongoose";
mongoose.connect(process.env.DB_URL)
.then(()=>console.log("Database connected ! "))
.catch(()=>console.log("Database not connected ! "));

//store token in the cookie
import cookieParser from 'cookie-parser';
import cors from "cors";
app.use(cookieParser());
app.use(cors({
  origin: process.env.DOMAIN,
  credentials: true,
}))

import morgan from "morgan";
app.use(morgan('dev'));
app.use(express.json()); // ✅ important
app.use(express.urlencoded({extended:false})); // ✅ important

// Routes
import userRouter from "./user/user.routes.js";
import TransactionRouter from "./Transaction/transaction.route.js";
import DashboardRouter from "./dashboard/dashboard.route.js";
app.use("/api/user", userRouter);
app.use("/api/transaction", TransactionRouter);
app.use("/api/dashboard",DashboardRouter);

//dashboard payment 
