const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Please Login to acces the data",
    });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded._id);
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Please Login to acces the data",
    });
  }

  req.user = user;

  next();

  
  } catch (error) {
    return res.status(400).json({
            success:false,
            message:"Invalid Credentials",
            error:error.message

        });
  }
};

module.exports = userAuth;
