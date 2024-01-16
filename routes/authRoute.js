import express from "express";
import {loginController, registerController, testController} from '../controllers/authController.js'
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router()

//routing
//REGISTER || POST METHOD


//LOGIN || POST METHOD



//test route
router.get('/test' , testController)


//user route

router.get('/user-auth', requireSignIn , (req,res)=>{
    res.status(200).send({ ok: true })
})

//Auth route

router.get('/admin-auth', (req,res)=>{
    res.status(200).send({ ok: true })
})


export default router;
