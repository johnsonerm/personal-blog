import express from "express";
import {loginController, registerController, testController} from '../controllers/authController.js'
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router()

//routing
//REGISTER || POST METHOD
router.post('/register',registerController)

//LOGIN || POST METHOD
router.post('/login', loginController)


//test route
router.get('/test', requireSignIn , isAdmin , testController)


//user route

router.get('/user-auth', requireSignIn , (req,res)=>{
    res.status(200).send({ ok: true })
})

//Auth route

router.get('/admin-auth', requireSignIn , isAdmin , (req,res)=>{
    res.status(200).send({ ok: true })
})


export default router;