import express from "express"
import { CreateOrder, getotders, updateOrderStatus } from "../Controller/OrderController.js"
import Order from "../model/Order.js";

const OrderRouter = express.Router();

OrderRouter.post("/",CreateOrder);
OrderRouter.get("/",getotders);
OrderRouter.put("/status/:orderId",updateOrderStatus)

export default OrderRouter;
