const mongoose=require('mongoose');

const postSchema = new mongoose.Schema({
    image:{
        publicId:{
            type:String,
        },
        url:{
            type:String,
        }
    },
    caption:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }

},{timestamps:true})

module.exports = mongoose.model("Posts",postSchema)