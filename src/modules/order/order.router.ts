import { Router } from 'express'
import { OrderController } from './order.controller'

const orderRouter = Router()
orderRouter.post('/api/orders', OrderController.createOrder)
orderRouter.get('/api/orders/revenue', OrderController.calculateRevenue)

export default orderRouter
