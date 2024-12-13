import { NextFunction, Request, Response } from "express";
import { orderServices } from "./order.services";
import orderValidationSchema from "./order.validation";

const createOrder = async (req:Request,res:Response,next:NextFunction)=>{
    try {
       const payload = req.body;
    //    const zodParseData = carsValidationSchema.parse(payload)
   
    const zodParseData = orderValidationSchema.parse(payload)

       const result = await orderServices.createOrder(zodParseData)
       res.json({
           message:"Order created sucessfully",
           sucess: true,
           data: result
       })
    } catch (error) {
     next(error)
     
    }
   }


   export const OrderController ={
    createOrder
   }