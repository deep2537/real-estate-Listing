import express from "express";
import { google, signin, signout, signup } from "../controllers/auth.controller.js";
const router=express.Router();
router.post("/signin",signin);
router.post("/signup",signup);
router.post("/google",google);
router.get("/signout",signout);
export default router;