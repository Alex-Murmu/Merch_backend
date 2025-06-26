const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
/*
@SignUp 	        /api/auth/register	POST
@VerifyEmail/OTP	/api/auth/verify	POST
@Login	            /api/auth/login	    POST

*/

const generateJwtToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRETS,{expiresIn:"1d"});
}

/// @SignUP

const registerUser = async (req,res)=>{
    try {
        const {name,email,phone,password} = req.body;
        // Check if User Allready exist
        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(401).json({message:"This Email ID Is Already asscociate wiht another User"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password,salt);

        const user = await User.create({
            name,
            email,
            phone,
            password:hashedpassword
        });


        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            phone:user.phone,
            token:generateJwtToken(user._id)

        })
    } catch (error) {
        res.status(401).json({message:"Something is Up",error:error.message})
    }
}

// login 
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        if (!user.isVerified) {
            // If not verified, return a message to verify email
            return res.status(400).json({
                message: "Please verify your email. We'll send you an OTP shortly."
            });
        }

        const token = await generateJwtToken(user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: token
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};


module.exports = {registerUser ,loginUser};