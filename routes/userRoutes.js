/*
| Feature                | Route                           | Method    | Middleware |
| ---------------------- | ------------------------------- | --------- | ---------- |
| ✅ Get User Profile     | `/api/user/profile`             | GET       | Protect    |
| ✅ Update User Profile  | `/api/user/profile`             | PUT/PATCH | Protect    |
| ✅ Add Address          | `/api/user/address`             | POST      | Protect    |
| ✅ Get All Addresses    | `/api/user/address`             | GET       | Protect    |
| ✅ Update Address       | `/api/user/address/:addressId`  | PUT       | Protect    |
| ✅ Delete Address       | `/api/user/address/:addressId`  | DELETE    | Protect    |
| ✅ Get Wishlist         | `/api/user/wishlist`            | GET       | Protect    |
| ✅ Add to Wishlist      | `/api/user/wishlist/:productId` | POST      | Protect    |
| ✅ Remove from Wishlist | `/api/user/wishlist/:productId` | DELETE    | Protect    |

*/

const express = require("express");
const protect = require("../middleware/middlewares");
const {GetUserProile,GetAllAdress,AddAddress,UpdateUserProfile,} = require("../controllers/userController")
const router = express.Router();


router.get("/user/profile",protect,GetUserProile);
router.post("/user/profile",protect,UpdateUserProfile);

// Address Route
router.post("/user/address",protect,AddAddress);
router.get("/user/address",protect,GetAllAdress);
router.put("/user/:addressid",protect)
router.delete("/user/addresss",protect);


module.exports = router;
