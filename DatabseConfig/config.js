const mongoose = require("mongoose");

const connectionDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("database is ready")
    } catch (error) {
        console.log("dataBase Error",error.message);
    }
}

module.exports = connectionDB;