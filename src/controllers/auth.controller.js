const User = require('../models/user');
const jwt= require('jsonwebtoken');
const bcrypt=require('bcrypt');


const registerController = async (req, res) => {

    try {
        const {username,password} = req.body;

    const isUserExists = await User.findOne({username});

    if(isUserExists){
        return res.status(400).json({message:"User already exists"});
    }

    const user =await User.create({username,password});

    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
    res.cookie("token",token)

    res.status(201).json({
        success:true,
        message:"User registered successfully",
        user
    })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Invalid Credentials",
            error:error.message
        });

    }
}

const loginController = async (req, res) => {
   try {
     const {username,password} = req.body;

    const user = await User.findOne({username});

    if(!user){
        return res.status(400).json({message:"User not found"});
    }
    const validPassword =user.validatePassword(password);

    if(!validPassword){
        return res.status(400).json({message:"Invalid password"});
    }

    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});

    res.cookie("token",token)

    res.status(200).json({
        success:true,
        message:"User logged in successfully",
        user
    })
   } catch (error) {
     return res.status(400).json({
            success:false,
            message:"Invalid Credentials",
            error:error.message

        });
   }


}

module.exports = {
    registerController,
    loginController,
}