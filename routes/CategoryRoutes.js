import express  from "express";

import { categoryController, createCategoryController, deleteCategoryController, singlecategoryController, updateCategoryController } from "../controllers/categoryController.js";

const router = express.Router()

//routes
//create category
router.post('/create-category',createCategoryController)

//update category
router.put('/update-category/:id',updateCategoryController)

//get all category
router.get('/get-category',categoryController)

//single category
router.get('/single-category/:slug',singlecategoryController)

//delete category
router.delete('/delete-category/:id',deleteCategoryController)
export default router
