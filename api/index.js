import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const app = express();
import userRouter from './routes/User.routes.js'
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