import { NextFunction, Request, Response } from 'express'
import { carsServices } from './cars.services'
import carsValidationSchema from './cars.validation'

const createCars = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body
    const zodParseData = carsValidationSchema.parse(payload)

    const result = await carsServices.createCars(zodParseData)
    res.json({
      message: 'Car created sucessfully',
      sucess: true,
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const getAllCars = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { searchTerm } = req.query
    const result = await carsServices.getCars(searchTerm as string)
    res.json({
      message: 'Car retrieved sucessfully',
      sucess: true,
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

// get single car
const getSingleCar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const carId = req.params.carId
    const result = await carsServices.getSingleCars(carId)
    res.json({
      message: 'Car retrieved successfully',
      sucess: true,
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

// get update a  car
const getUpdateCar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const carId = req.params.carId
    const payload = req.body
    const result = await carsServices.getUpdateCars(carId, payload)
    res.json({
      message: 'Car updated successfully',
      sucess: true,
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

// get delete car
const deleteCar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const carId = req.params.carId
    const result = await carsServices.deleteCars(carId)
    res.json({
      message: 'Car deleted sucessfully',
      status: true,
      data: result,
    })
  } catch (error) {
    next(error)
  }
}
export const carsController = {
  createCars,
  getAllCars,
  getSingleCar,
  getUpdateCar,
  deleteCar,
}
