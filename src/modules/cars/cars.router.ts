import { Router } from 'express'
import { carsController } from './cars.controller'

const carsRouter = Router()
carsRouter.post('/api/cars', carsController.createCars)
carsRouter.get('/api/cars', carsController.getAllCars)
carsRouter.get('/api/cars/:carId', carsController.getSingleCar)
carsRouter.put('/api/cars/:carId', carsController.getUpdateCar)
carsRouter.delete('/api/cars/:carId', carsController.deleteCar)

export default carsRouter
