import { Router } from 'express'
import { carsController } from './cars.controller'
import validateRequest from '../../middleWare/validateRequest'
import { carsValidation } from './cars.validation'

const carsRouter = Router()
carsRouter.post('/',validateRequest(carsValidation.carsValidationSchema), carsController.createCars)
carsRouter.get('/', carsController.getAllCars)
carsRouter.get('/:carId', carsController.getSingleCar)
carsRouter.patch('/:carId',validateRequest(carsValidation.updateCarsValidationSchema), carsController.getUpdateCar)
carsRouter.delete('/:carId', carsController.deleteCar)

export default carsRouter
