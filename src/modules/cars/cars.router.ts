import { Router } from 'express'
import { carsController } from './cars.controller'
import validateRequest from '../../middleWare/validateRequest'
import { carsValidation } from './cars.validation'
import auth from '../../middleWare/auth'
import { USER_ROLE } from '../users/user.const'

const carsRouter = Router()
carsRouter.post(
  '/',  validateRequest(carsValidation.carsValidationSchema),
  carsController.createCars
)
carsRouter.get('/', carsController.getAllCars)
carsRouter.get('/:carId', carsController.getSingleCar)
carsRouter.patch(
  '/:carId',
  auth(USER_ROLE.admin),
  validateRequest(carsValidation.updateCarsValidationSchema),
  carsController.getUpdateCar
)
carsRouter.delete('/:carId', auth(USER_ROLE.admin), carsController.deleteCar)

export default carsRouter
