const express= require('express') 
const { createPost } = require('../controllers/createPost')
const { getPosts } = require('../controllers/getPost')
const { getPostById } = require('../controllers/getPostById')
const { updatePost } = require('../controllers/updatePost')
const { deletePost } = require('../controllers/deletePost')
// route created and exported
const router = express.Router()

router.post("/posts",createPost)

router.get("/posts",getPosts)

router.get("/posts/:id",getPostById)

router.put("/posts/:id",updatePost)

router.delete("/posts/:id",deletePost)

module.exports={router}