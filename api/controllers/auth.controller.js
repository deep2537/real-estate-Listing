import User from "../models/User.model.js";
import bcryptjs from "bcryptjs";
export const signup=async (req,res)=>{
    const {username,email,password}=req.body;
    const hashedpassword=bcryptjs.hashSync(password,12);
    const newUser= new User({username,email,password: hashedpassword});
    try{
    await newUser.save();
    res.status(201).json({
        message:"User Created Successfully"
    })
    }
    catch(error){
        res.status(500).json(error.errmsg)
    }
}