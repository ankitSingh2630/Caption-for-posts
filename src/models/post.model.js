const mongoose=require('mongoose');

const postSchema = new mongoose.Schema({
    image:{
        type:String,     
    },
    caption:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},{timestamps:true})

module.exports = mongoose.model("Posts",postSchema)