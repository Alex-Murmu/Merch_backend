const express = require("express");
const connectionDB = require("./DatabseConfig/config");
const cors = require("cors");
const authRoute = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();
const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());


app.use("/api/auth",authRoute);
//user Routes
app.use("/api",userRoutes);

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
    connectionDB();
})