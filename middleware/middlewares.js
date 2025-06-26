const jwt = require("jsonwebtoken");
const User = require("../models/user");
const protect = async (req,res,next)=>{
   try {
     let token = req.headers.authorization;
     token =  token.split(" ")[1];
     if(!token){
        return res.status(401).json({message:"No token , Authorization denied"});
     }
     const decoded = jwt.verify(token,process.env.JWT_SECRETS);
     req.user = await User.findById(decoded.id).select("password");
     next()
   } catch (error) {
     res.status(400).json({message:"Error While Validating Token",error:error.message});
   }
}

module.exports = protect;