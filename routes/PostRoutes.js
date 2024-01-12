import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createPostController, deletePostController, getPostController, getSinglePostController, postCategoryController, postPhotoController } from '../controllers/postController.js';

import formidable from 'express-formidable';

const router = express.Router()

//routes
router.post('/create-post',requireSignIn,isAdmin,formidable(),createPostController)


//get post
router.get('/get-post',getPostController)

//get single post
router.get('/get-post/:slug',getSinglePostController)

//get photo
router.get('/post-photo/:pid',postPhotoController)

//delete post
router.delete('/delete-post/:pid',deletePostController)

//category wise
router.get('/post-category/:slug',postCategoryController)
export default router