import express, { NextFunction, Request, Response } from "express"
import carsRouter from "./modules/cars/cars.router"
import orderRouter from "./modules/order/order.router"

const app = express()
app.use(express.json())

app.use("/",carsRouter)
app.use("/",orderRouter)



app.get("/",(req:Request,res:Response)=>{
 res.send({
    status:true,
    message:"Car Server Live",
 })
})




//not found error 

app.all("*",(req:Request,res:Response)=>{
   res.status(400).json({
      message:"route is not found",
      sucess:false,
   })
})


//global error handeler
app.use((error:any,req : Request, res : Response, next :NextFunction)=>{
   console.log(error);
   if (error) {
      res.status(400).json({
         message:"validation failed",
         sucess:false,
         errors:error,
         stacks:error.stack.split("\n")
         
      })
   }
   next()
})

export default app;