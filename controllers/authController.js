import userModel from '../models/userModel.js'
import { comparePassword, hashPassword } from './../helpers/authHelper.js';
import JWT from 'jsonwebtoken'

//REGISTER ||POST METHOD =================================================
export const registerController = async(req,res)=>{
    try {
        const {name,email,password,phone,address} = req.body

        //validation
        if(!name){
            return res.send({message:'Name is required'})
        }if(!email){
            return res.send({message:'Email is required'})
        }
        if(!password){
            return res.send({message:'Password is required'})
        }
        if(!phone){
            return res.send({message:'Phone number is required'})
        }
        if(!address){
            return res.send({message:'Address is required'})
        }
        //checking user
        const existingUser = await userModel.findOne({email})
        //checking existing users
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:'Already Registered please Login',
            })
        }

        //register user
        const hashedPassword = await hashPassword(password)
        //save
        const user = await new userModel({name,email,phone,address,password:hashedPassword}).save() //also saving hashed password

        res.status(201).send({
            success:true,
            message:'User registered succcessfully',
            user,
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in registration',
            error
        })
        
    }
    
}


//LOGIN || POST METHOD =======================================

export const loginController = async(req,res)=>{
    try {
        const {email,password} = req.body
        //validation
        if(!email||!password){
            return res.status(404).send({
                success:false,
                message:"Invalid email or password",

            })
        }
        //password comparing(using given login password and registered password)
        //also checking user is there or not
        const user = await userModel.findOne({email})
        if(!user) return res.status(404).send({
            success:false,
            message:"Email is not registered"
        })
        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:"Invalid password"

            })
        }
        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})

        res.status(200).send({
            success:true,
            message:"Logged Successfully",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role,
            },
            token,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in login",
            error
        })
        
    }
}


//test controller 
export const testController = (req,res)=>{
    res.status(200).send({
        success:true,
        message:'protected route'
    })
}