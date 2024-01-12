import bcrypt from 'bcrypt'

//call back function for converting password to hashed password 
 export const hashPassword = async(password)=>{
    try {
        const saltRounds = 10;
        const hashedpassword = await bcrypt.hash(password,saltRounds)
        return hashedpassword;
    } catch (error) {
        console.log(error)
        
    }

 };


 //comparing password==============================
 export const comparePassword = async(password,hashedPassword)=>{
    return bcrypt.compare(password,hashedPassword)
 }