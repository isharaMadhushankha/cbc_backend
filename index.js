import express from "express"
import mongoose  from "mongoose"
import StudentRouter from "./Routes/StudentRoute.js";
import UserRouter from "./Routes/UserRouter.js";
import Jwt from "jsonwebtoken";
import productRoute from "./Routes/ProductRoute.js";
import cors from "cors"
import dotenv from "dotenv"
import OrderRouter from "./Routes/OrderRouter.js";
import InquiryRouter from "./Routes/InquiryRouter.js";
import SystemConfigRouter from "./Routes/SystemConfigRouter.js";
import ConsultationRouter from "./Routes/ConsultationRouter.js";
import SellerRouter from "./Routes/SellerRoute.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // middleware

app.use((req,res,next)=>{
    let token = req.header("Authorization");
    if(token != null){
        token = token.replace("Bearer ","");
        Jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
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

const connecString = process.env.MONGO_URI;

mongoose.connect(connecString).then(()=>{
    console.log("database is connected...");

app.use("/api/Student",StudentRouter);
app.use("/api/User",UserRouter);
app.use("/api/Product",productRoute)
app.use('/api/Orders',OrderRouter)
app.use("/api/Inquiry", InquiryRouter);
app.use("/api/SystemConfig", SystemConfigRouter);
app.use("/api/Consultation", ConsultationRouter);
app.use("/api/Seller", SellerRouter);

}).catch(()=>{
    console.log("database is not connected");
})
app.listen(5000,()=>{
    console.log("server is running..");
})

console.log("JWT:", process.env.JWT_SECRET);
console.log("Mongo:", process.env.MONGO_URI ? "Loaded" : "Not Loaded");







