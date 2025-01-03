import Listing from "../models/Listing.model.js";
import User from "../models/User.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
export const test=(req,res)=>{
    res.send("hello World");
};
export const updateUser=async(req,res,next)=>{
    if(req.user.id !== req.params.id)   
        return next(errorHandler(401,"You can only update your own account"));
    try {
        if(req.body.password){
            req.body.password=bcryptjs.hashSync(req.body.password,12);
        }
        const updatedUser= await User.findByIdAndUpdate(req.params.id,{
            $set:{
                username:req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar:req.body.avatar
            }
        },{new:true})
        const {password,...rest}=updatedUser._doc;
        res.status(201).json(rest);
    } catch (error) {
        next(error);
    }
}
export const deleteUser=async(req,res,next)=>{
    if(req.user.id !== req.params.id)   
        return next(errorHandler(401,"You can only update your own account"));
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json("User has been deleted Sucessfully");
    } catch (error) {
        next(error);
    }
}
export const getUserListings=async(req,res,next)=>{
    if(req.params.id === req.user.id){
        try {
        const Listings=await Listing.find({useRef:req.params.id});
        res.status(200).json({Listings});
        } catch (error) {
            next(error);
        }
    }
    else{
        next(errorHandler(401,"You can view only your Listings!!"));
    } 
}
export const getUser=async(req,res,next)=>{
   try {
    const user=await User.findById(req.params.id);
    if(!user){
        next(errorHandler(404,"User not Found"));
    }
    const {password:pass,...rest}=user._doc;
    res.status(200).json(rest);
   } catch (error) {
    next(error)
   }
}