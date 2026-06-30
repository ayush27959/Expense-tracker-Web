import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import cors from "cors";
import morgan from "morgan";

// Routes Imports
import userRouter from "./user/user.routes.js";
import TransactionRouter from "./Transaction/transaction.route.js";
import DashboardRouter from "./dashboard/dashboard.route.js";

dotenv.config();

const app = express();

// Database connection
mongoose.connect(process.env.DB_URL)
  .then(() => console.log("Database connected ! "))
  .catch(() => console.log("Database not connected ! "));

app.use(cookieParser());

// ✅ Fixed CORS: अब यह लोकल और वेंसल के दोनों लिंक्स को एक साथ अलाउ करेगा
app.use(cors({
  origin: [
    "http://localhost:5173", 
    "https://expense-tracker-web-git-master-ayush-kumar-s-projects6.vercel.app",
    "https://expense-tracker-web-pearl.vercel.app"
  ],
  credentials: true,
}));

app.use(morgan('dev'));
app.use(express.json()); // ✅ important
app.use(express.urlencoded({ extended: false })); // ✅ important

// Routes
app.use("/api/user", userRouter);
app.use("/api/transaction", TransactionRouter);
app.use("/api/dashboard", DashboardRouter);

app.listen(3030, () => {
  console.log("server is running on port 3030");
});