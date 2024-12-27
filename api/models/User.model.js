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
        default:"https://drive.google.com/file/d/1QYNXyTk0hayuCXaXkb0CHbJx6DXS_DLu/view",
    },
},{timestamps:true});
const User = mongoose.model("User",userSchema);
export default User; 