import Order from "../model/Order.js";

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
            const neworder = new Order(
                {
                    orderId:newOrderid,
                    items:[],
                    customername:req.body.customername,
                    email:req.body.email,
                    phone:req.body.phone,
                    address:req.body.address,
                    total:req.body.total,
                    status:"pending"
                    
                }
            )

            const savedorder = await neworder.save();
            savedorder =res.status(200).json({
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