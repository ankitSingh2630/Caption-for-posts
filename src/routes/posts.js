const express = require('express');
const createPostsController = require('../controllers/post.controller');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() })
const userAuth = require('../middlewares/auth')

const router= express.Router();

router.post("/",userAuth,upload.single("image"),createPostsController)

module.exports=router;