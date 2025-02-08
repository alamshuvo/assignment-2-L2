import { Request, Response } from 'express'
import { orderServices } from './order.services'
import { catchAsync } from '../../utils/catchAsync'
import iOrder from './order.interface'
import sendResponse from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'


// const createOrder = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const orderData = req.body
//     const zodParseData = orderValidationSchema.parse(orderData)
//     const newOrder = await orderServices.createOrder(zodParseData)
//     res.status(201).json({
//       message: 'Order created sucessfully',
//       sucess: true,
//       data: newOrder,
//     })
//   } catch (error: unknown) {
//     let statusCodeError = 400
//     let errorMessage = 'Something went wrong'
//     if (error instanceof Error) {
//       errorMessage = error.message
//       if (error.message === 'Product not found') {
//         statusCodeError = 404
//       } else if (error.message === 'Insufficient stock') {
//         statusCodeError = 420
//       }
//     }
//     res.status(statusCodeError).json({
//       message: errorMessage,
//       sucess: false,
//       error: error instanceof Error ? error.name : 'something went wrong',
//     })
//   }
// }

const createOrder = catchAsync(async (req, res) => {
  const orderData = req.body as iOrder
  const result = await orderServices.createOrder(orderData)
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    sucess: true,
    message: 'order created sucessfully',
    data: result,
  })
})

const getOrder = catchAsync(async(req,res)=>{
  const result = await orderServices.getOrder()
  sendResponse(res,{
    statusCode:StatusCodes.OK,
    sucess:true,
    message:"all order data are retrived sucessfylly",
    data:result
  })
})



const changeStatus = catchAsync(async(req,res)=>{
  const id = req.params.id;
  const data = req.body;
  console.log(id,data);
  const result = await orderServices.changeStatus(id,data)
  sendResponse(res,{
    statusCode:StatusCodes.OK,
    sucess:true,
    message:"order status update sucessfylly",
    data:result
  })
})

const calculateRevenue = async (req: Request, res: Response): Promise<void> => {
  try {
    const revenue = await orderServices.calculateRevenue()

    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: revenue,
    })
  } catch (error: unknown) {
    res.status(500).json({
      message: 'Failed to calculate revenue',
      status: false,
      error: error instanceof Error ? error.message : 'Internal Server Error',
    })
  }
}


export const OrderController = {
  createOrder,
  calculateRevenue,
  getOrder,
 changeStatus
}
