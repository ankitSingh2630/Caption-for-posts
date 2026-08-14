const Post = require('../models/post.model');
const generateCaption = require('../services/ai.services')
const uploadImage = require('../services/storage.services')
const uuid = require('uuid');

const createPostsController = async(req,res)=>{

    try {

    const file= req.file;
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }
    const base64 = file.buffer.toString("base64");

     const responseCaption =await generateCaption(base64)

     const image= await uploadImage(file.buffer)

    //  
    const post = await Post.create({
        image: {
        publicId: image.public_id,
        url: image.secure_url
      },
      caption:responseCaption,
      user:req.user._id
    })
    return res.status(201).json({
        success:true,
         post
        
     })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Something went wrong while processing the post",
            error: error.message
        });
    }

}

module.exports = createPostsController;