import { Router } from 'express'
import { OrderController } from './order.controller'
import validateRequest from '../../middleWare/validateRequest'
import { orderValidation } from './order.validation'
import auth from '../../middleWare/auth'
import { USER_ROLE } from '../users/user.const'

const orderRouter = Router()
orderRouter.post(
  '/',auth(USER_ROLE.user,USER_ROLE.admin),
  validateRequest(orderValidation.orderValidationSchema),
  OrderController.createOrder
)
orderRouter.get('/', OrderController.getOrder)
orderRouter.post(
  '/change-status/:id',
  auth(USER_ROLE.admin),
  validateRequest(orderValidation.orderValidationUpdateSchema),
  OrderController.changeStatus
)
orderRouter.delete(
  '/delete-order/:id',
  auth(USER_ROLE.admin),
  OrderController.deleteOrder
)
orderRouter.get('/revenue',auth(USER_ROLE.admin), OrderController.calculateRevenue);
orderRouter.get('/verify',auth(USER_ROLE.user,USER_ROLE.admin),OrderController.verifyPayment)

export default orderRouter
