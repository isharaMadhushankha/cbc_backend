import mongoose from "mongoose";


const productShema = new mongoose.Schema({
    productId:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    altName:{
        type:[String],
        default:[],
        required:true
    },
    discription:{
        type:String,
        required:true
    },images:{
        type:[String],
        default:[],
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    labeledPrice:{
        type:Number,
        required:true
    },
    catagory:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true,
        default:0
    }
})

const Product = mongoose.model("Product",productShema);
export default Product;

