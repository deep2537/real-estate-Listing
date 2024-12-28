import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from './routes/User.routes.js';
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import listingRouter from "./routes/listing.routes.js";
import cors from "cors";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("Successfully connected to MongoDb");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);
app.use("/api/listing",listingRouter);
app.use((err,req,res,next)=>{
  const statusCode =err.statusCode || 500;
  const message =err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success:false,
    statusCode,
    message,
  });
})