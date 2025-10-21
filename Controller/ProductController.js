import Product from "../model/Product.js";
import { isAdmin } from "./UserController.js";

export async function createProduct(req, res) {
  const authHeader = req.headers.authorization;
  console.log(authHeader);

  console.log(req.user);
  if (!isAdmin(req)) {
    res.status(403).json({
      message: "you are not allow to create a product",
    });
  }

  try {
    const productdata = req.body;
    const newproduct = new Product(productdata);

    // const newproduct = new Product({
    //     productId:req.body.Product,
    //     name:req.body.name,
    //     altName:req.body.altName,
    //     discription:req.body.discription,
    //     images:req.body.images,
    //     price:req.body.price,
    //     labelledPrice:req.body.labelledPrice,
    //     catagory:req.body.catagory

    // })

    await newproduct.save();

    res.json({
      message: "prodcut creted successfully",
      newproduct: newproduct,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "failed to create product",
    });
  }
}

export async function getProduct(req, res) {
  try {
    const prodcut = await Product.find();
    res.json(prodcut);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "failed to retrived product",
    });
  }
}

export async function deleteproduct(req, res) {
  if (!isAdmin(req)) {
    res.status(403).json({
      message: "you are not allow to delete a product",
    });
  }
  try {
    // const productId = req.body.productId;
    // if(productId==null){
    //     res.json({
    //         message:"product id is required"
    //     })
    //     return
    // }

    const productId = req.params.productId;

    await Product.deleteOne({
      productId: productId,
    });

    res.json({
      message: "product delete successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "failed to delete the product",
    });
  }
}

export async function updateProduct(req, res) {
  if (!isAdmin(req)) {
    res.status(403).json({
      message: "you are not allow to edit product",
    });
    return;
  }

  try {
    const productId = req.params.productId;

    const updateData = req.body;

    // await Product.updateOne(
    //    {productId:productId},
    //     updateData
    // )
    const result = await Product.updateOne(
      { productId: productId },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "product not found",
      });
    }

    res.json({
      message: "product updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "failed to edit the product",
    });
  }
}

export async function getOneProduct(req,res){
    try{

    const productId = req.params.productId;

    const product = await Product.findOne({
        productId:productId
    });

    if(product == null){
        res.status(404).json({
            message:"prodct not found"
        })
    }else{
        res.json(product);
    }


    }catch(err){
        console.error(err)
        res.status(500).json({
            message:"failed to find the product"
        })
    }

    
}
