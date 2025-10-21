import express from "express"
import mongoose  from "mongoose"
import StudentRouter from "./Routes/StudentRoute.js";
import UserRouter from "./Routes/UserRouter.js";
import Jwt from "jsonwebtoken";
import productRoute from "./Routes/ProductRoute.js";

const app = express();
app.use(express.json()); // middleware

app.use((req,res,next)=>{
    let token = req.header("Authorization");
    if(token != null){
        token = token.replace("Bearer ","");
        Jwt.verify(token,'jwt-secret',(err,decoded)=>{
            if(decoded==null){
                res.json({
                    message:"invalid token"
                })
                return
            }else{
                req.user = decoded
            }
        })
    }
    next()
    // when we send request dont go bellow the request without checked
})

const connecString = "mongodb+srv://imsanka11_db_user:m9B4F9771UcuSrkV@cluster0.ck2ukx5.mongodb.net/CBC_BATCH_07?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(connecString).then(()=>{
    console.log("database is connected..");

app.use("/Student",StudentRouter);
app.use("/User",UserRouter);
app.use("/Product",productRoute)

}).catch(()=>{
    console.log("database is not connected");
})
app.listen(5000,()=>{
    console.log("server is running..");
})







