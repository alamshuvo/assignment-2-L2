import { Request, Response } from 'express'
import { orderServices } from './order.services'
import orderValidationSchema from './order.validation'

const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderData = req.body
    const zodParseData = orderValidationSchema.parse(orderData)
    const newOrder = await orderServices.createOrder(zodParseData)
    res.status(201).json({
      message: 'Order created sucessfully',
      sucess: true,
      data: newOrder,
    })
  } catch (error: unknown) {
    let statusCodeError = 400
    let errorMessage = 'Something went wrong'
    if (error instanceof Error) {
      errorMessage = error.message
      if (error.message === 'Product not found') {
        statusCodeError = 404
      } else if (error.message === 'Insufficient stock') {
        statusCodeError = 420
      }
    }
    res.status(statusCodeError).json({
      message: errorMessage,
      sucess: false,
      error: error instanceof Error ? error.name : 'something went wrong',
    })
  }
}

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
}
