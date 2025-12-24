import Order from "../model/Order.js";
import Product from "../model/Product.js";
import { isAdmin } from "./UserController.js";

export async function CreateOrder(req,res){
    //CBS0000001
    // if(req.user==null){
    //     req.status(401).json(
    //         {
    //             message:"Unautherized user"
    //         }
    //     )
    //     return
    // }

    try{

           const user = req.user;
           console.log(user);

           if(user==null){
            res.status(401).json({
                message:"Unautherized user"
            })
            return
           }

             const orderlist = await Order.find().sort({date:-1}).limit(1) // last date come first. get the last one
            let newOrderid = "CBC000001";
           
            if(orderlist.length!=0){
                let lastorderidString = orderlist[0].orderId //CBC000123
                let lastorderNumberinString = lastorderidString.replace("CBC","");//000123
                let lastOrderNumber = parseInt(lastorderNumberinString);//123
                let newOrderNumber = lastOrderNumber + 1 // 124
                
                let newOrderNumberString = newOrderNumber.toString().padStart(7,"0");//000124
                newOrderid = "CBC" + newOrderNumberString;


                
            }

            let customername = req.body.customername;
            if(customername==null){
                customername = user.firstName + " " + user.lastname
            }

            let phone = req.body.phone;
            if(phone==null){
                phone = "Not provided"
            }
            

            const itemslist = req.body.items;
            if(itemslist==null){
                res.status(400).json({
                    message:"items are required"
                })
                return
            }

            if(!Array.isArray(itemslist)){
                res.status(400).json({
                    message:"items must be an array"
                })
                return
            }

            const itemsToAdd = [];
            let totalPrice = 0;

            for(let i=0;i<itemslist.length;i++){
                if(itemslist[i].productId==null){
                    res.status(400).json({
                        message:"product id is required"
                    })
                    return
                }
                if(itemslist[i].quantity==null){
                    res.status(400).json({
                        message:"quantity is required"
                    })
                    return
                }      

                const items  = itemslist[i];
                const product = await Product.findOne({
                    productId:items.productId
                })

                if(product==null){
                    res.status(400).json({
                        code:"PRODUCT_NOT_FOUND",
                        message:`product with id ${items.productId} not found`
                    })
                    return
                }
            

               if(product.stock < items.quantity){
                    res.status(400).json({
                        code:"OUT_OF_STOCK",
                        message:`product with id ${items.productId} is out of stock`,
                        productId:items.productId,

                    })

                 return   
                
                }

                itemsToAdd.push({
                    productId:items.productId,
                    quantity:items.quantity,
                    name:product.name,
                    price:product.price,
                    images:product.images[0]

                    
                })

                totalPrice += product.price * items.quantity


               
            }


            const neworder = new Order(
                {
                    orderId:newOrderid,
                    items:itemsToAdd,
                    customername:customername,
                    email:user.email,
                    phone:phone,
                    address:req.body.address,
                    total:totalPrice,
                    status:"pending"
                    
                }
            )
                
            const savedorder = await neworder.save();
            for(let i=0;i<itemsToAdd.length;i++){
                const product = await Product.findOne({
                    productId:itemsToAdd[i].productId
                })
                product.stock -= itemsToAdd[i].quantity;
                await product.save();
            }
            
            res.status(200).json({
                message:"order created successfully",
                order:savedorder
            })
            


    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"Internal server error",
          
        })

    }



}

export async function getotders(req,res) {
    if(isAdmin(req)){
        const orders = await Order.find().sort({date:-1});
        res.json(orders);
    }else if(isCustomer(req)){
        const orders = await Order.find({email:requser.email}).sort({date:-1});
        res.json(orders);
    }else{
        res.status(401).json({
            message:"Unautherized user"
        })
    }

    

}
export async function updateOrderStatus(req,res){
    const orderId = req.params.orderId;
    const newStatus = req.body.status;

    try{
         await Order.updateOne({orderId:orderId},{$set:{status:newStatus}});
         res.status(200).json({
            message:"order status updated successfully"
         })
    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"Internal server error"
        })
    }
    
}

