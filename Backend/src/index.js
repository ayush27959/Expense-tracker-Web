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

// ✅ Dynamic CORS Setup: अब यह वेंसल के सभी Preview और Main लिंक्स को ऑटोमैटिकली अलाउ करेगा
app.use(cors({
  origin: function (origin, callback) {
    // बिना ऑरिजिन (जैसे Postman) या लोकलहोस्ट या कोई भी वेंसल सबडोमेन (.vercel.app) हो तो अलाउ करें
    if (!origin || origin.startsWith("http://localhost") || origin.endsWith(".vercel.app")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
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