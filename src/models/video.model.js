import mongoose from "mongoose";
import mongooseaggreatePaginate from "mongoose-aggregate-paginate-v2"// use for pagination in video listing;

 const videoSchema = new mongoose.Schema(
    { 
        videoFile:{
            type: String,  //cloudinary url
            required: true, 
        },
        thumbnail:{
            type:String,
            required:true,
        },
        
        description:{
            type:String,
            required:true,
        },
        duration:{
            type:Number, //cloudinary
            required:true,
        },
        views:{
            type:Number,
            default:0,
        },
        isPublished:{
            type:Boolean,
            default:false,
        },
        owner:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        likes:{
            type:Number,
            default:0,
        }

 },{timestamps:true});

 videoSchema.plugin(mongooseaggreatePaginate);/// now we can use pagination in video listing
 export const Video = mongoose.model("Video",videoSchema)