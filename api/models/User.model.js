import mongoose from "mongoose";
const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    }, password:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
        default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fuser_149071&psig=AOvVaw3SwpRLRHGebg5i1-cG76gV&ust=1735309927749000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMj3zLDTxYoDFQAAAAAdAAAAABAE",
    },
},{timestamps:true});
const User = mongoose.model("User",userSchema);
export default User; 