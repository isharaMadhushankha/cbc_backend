import express from "express"
import { CreateOrder } from "../Controller/OrderController.js"

const OrderRouter = express.Router();

OrderRouter.post("/",CreateOrder);

export default OrderRouter;
