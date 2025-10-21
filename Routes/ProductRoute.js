import express from "express"
import { createProduct, deleteproduct, getOneProduct, getProduct, updateProduct } from "../Controller/ProductController.js"
const productRoute = express.Router()

productRoute.post('/',createProduct);
productRoute.get('/',getProduct);
productRoute.get('/search',(req,res)=>{
    res.json({
        message:"hello"
    })
})
// add the id router botto of the router.other wise after ther / it take as parameter. it match with id.thats why we use above the id router

productRoute.delete('/:productId',deleteproduct);
productRoute.put('/:productId',updateProduct);
productRoute.get('/:productId',getOneProduct);

export default productRoute



