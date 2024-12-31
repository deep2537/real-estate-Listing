import Listing from "../models/Listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing=async(req,res,next)=>{
    try {
        const listing=await Listing.create(req.body);
        return res.status(201).json(listing);

    } catch (error) {
        next(error);
    }
}
export const deleteListing=async(req,res,next)=>{
    const listing=await Listing.findById(req.params.id);
    if(!listing){
        return next(errorHandler(404,"Listing not Found"));
    }
    if(req.user.id!==listing.useRef){
        return next(errorHandler(401,"You can only delete your own Listings"));
    }
    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json("Listing has been deleted successfully");
    } catch (error) {
        next(error);
    }
}
export const updateListing=async(req,res,next)=>{
    const listing=await Listing.findById(req.params.id);
    if(!listing){
        return next(errorHandler(404,"Listing not Found"));
    }
    if(req.user.id!==listing.useRef){
        return next(errorHandler(401,"You can only update your own Listings"));
    }
    try {
        const updatedListing = await Listing.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json(updatedListing);
    } catch (error) {
        next(error)
    }
}