/*
router.get("/user/profile",protect,GetUserProile);
router.post("/user/profile",protect,UpdateUserProfile);

// Address Route
router.post("/user/address",protect,AddAddress);
router.get("/user/address",protect,GetAllAdress);
router.put("/user/:addressid",protect,UpdateAddress)
router.delete("/user/addresss",protect,DeleteAddress);
*/
const User = require("../models/user");

const GetUserProile = async(req,res)=>{
    try {
        const user = await User.findById(req.user._id);
        if(!user){
            return res.status(400).json({message:"User not exist"});
        }

        res.status(200).json({
          _id:user._id,
          name:user.name,
          email:user.email,
          phone:user.phone,
          address:user.addresses
        })
    } catch (error) {
        res.status(401).json({message:"error getting user Profile",error:error.message});
    }
}


const UpdateUserProfile = async(req,res)=>{
    try {
        const user = await User.findById(req.user._id);
        if(!user){return res.status(400).json({message:"user not found"})};
        
    } catch (error) {
        res.send({Problem:"Error",Error:error.message})
    }
}


const AddAddress = async (req,res)=>{
  try {
    res.send("OK Adress")
  } catch (error) {
     res.end
  }
}

const GetAllAdress = async(req,res)=>{
    try {
        const user =User.find(req.user._id).select("-password");
        if(!user){
            return res.status(401).json({message:"User not found"});
        }
        let alladdresses;
        if(user.role==="admin"){
             alladdresses = await User.find().populate("addresses");
        };

        alladdresses = await User.findById(req.user._id).populate("addressses");


        return res.status(200).json({address:{
            _id:user._id,
            street:user.streeet,
            city:user.city,
            pincode:user.pincode,
            country:user.country,
        }})

    } catch (error) {
        res.status(200).json({message:"Error ",error:error.message})
    }
}

module.exports = {GetUserProile, UpdateUserProfile,AddAddress,GetAllAdress,UpdateUserProfile}