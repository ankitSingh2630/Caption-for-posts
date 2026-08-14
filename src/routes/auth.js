const express = require('express');
const {registerController,loginController}= require("../controllers/auth.controller")
const userAuth= require('../middlewares/auth')
const router = express.Router();

// @route   GET /api/auth/test

router.post("/register",registerController );
router.post("/login",loginController );

module.exports = router;