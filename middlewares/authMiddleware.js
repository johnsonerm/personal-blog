import JWT from 'jsonwebtoken'
import userModel from '../models/userModel.js';
//checking user is logged in
//protecting user
//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
    try {
      const decode = JWT.verify(
        req.headers.authorization,
        process.env.JWT_SECRET
      );
      req.user = decode;
      next();
    } catch (error) {
      console.log(error);
    }
  };


//admin access middleware
export const isAdmin = async(req,res,next)=>{
    try {
        const user = await userModel.findById(req.user._id)
        if(user.role !== 1){
            res.status(401).send({
                success:false,
                message:"UnAuthorized Access"
        })

        }else{
            next();
        }
    } catch (error) {
        console.log(error)
        res.status(401).send({
            success:false,
            message:"Error in admin middleware",
            error
        })
        
    }
} 