import { Router } from "express";
import { OrderController } from "./order.controller";

const orderRouter =Router();
orderRouter.post("/api/orders",OrderController.createOrder)

export default orderRouter