const Post = require('../models/post.model');
const generateCaption = require('../services/generateCaption.service')

const createPostsController = async(req,res)=>{

    try {

    const file= req.file;
    const base64 = file.buffer.toString("base64");
     const response =await generateCaption(base64)

     res.status(200).json({
        success:true,
        response,
     })
    } catch (error) {
        console.log(error)
    }

}

module.exports = createPostsController;