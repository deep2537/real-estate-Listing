import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from './routes/User.routes.js';
import authRouter from "./routes/auth.routes.js";
dotenv.config();
const app = express();
app.use(express.json());
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