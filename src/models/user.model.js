/*     first method
import mongoose from "mongoose";    
const  userSchema = new mongoose.Schema({},{timestamps:true});
export const User = mongoose.model("User",userSchema) */   
    

///second method
import mongoose,{Schema, model} from "mongoose";
import bcrypt from "bcrypt";// for password hashing
import jwt from "jsonwebtoken";// for generating refresh token

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase:true,
        trim: true,
        index:true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase:true,
        trim: true,  
    },
    fullName:{
        type: String,
        required: true,
        trim: true,  
        index:true,
    },
    avatar:{
        type: String,  //cloudinary url
        required: true, 
    },
    coverImage:{
        type: String,  //cloudinary url
    },
    watchHistory:[
        {
            type: Schema.Types.ObjectId,
            ref:"video"

        }
    ],
    password:{
        type: String,
        required: [true,"Password is required"]
    },
    refreshToken:{
        type: String,
    }
},{timestamps:true});


// this is a mongoose middleware that will run before saving the user & its password to the database  and 10 is the salt rounds for hashing the password
userSchema.pre("save",async function(next)// this will check if the password is modified or not if not then it will not hash the password again
 {
    if(!this.isModified("password")) return next();

    // this will check if the password is modified or not if not then it will not hash the password again
    this.password =bcrypt.hash(this.password,10)
    next();//
})// this is a mongoose middleware that will run before saving the user to the database  and 10 is the salt rounds for hashing the password


userSchema.methods.isPasswordCorrect = async function (password){
  return await bcrypt.compare(password, this.password)
}
userSchema.methods.generateAccessToken= function(){
    return jwt.sign(
        {
           _id: this._id,
           email:this.email, 
           username:this.username,
           fullName:this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}
userSchema.methods.generateRefreshToken= function(){
     return jwt.sign(
        {
           _id: this._id,
           email:this.email, 
           username:this.username,
           fullName:this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
}

export const User=model("User",userSchema)