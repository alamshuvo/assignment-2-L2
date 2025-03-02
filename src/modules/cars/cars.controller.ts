import { carsServices } from './cars.services'
import { catchAsync } from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'

const createCars = catchAsync(async (req, res) => {
  const result = await carsServices.createCars(req.body)
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    sucess: true,
    message: 'Cars Created Sucessfylly',
    data: result,
  })
})
const getAllCars = catchAsync(async (req, res) => {
  const result = await carsServices.getCars(req?.query);
  const params = req?.query
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'Cars retrived Sucessfully',
    data: result,
    meta:params
  })
})

// get single car
const getSingleCar = catchAsync(async (req, res) => {
  const carId = req.params.carId
  const result = await carsServices.getSingleCars(carId)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'Single Cars retrived Sucessfully',
    data: result,
  })
})

// get update a  car
const getUpdateCar = catchAsync(async (req, res) => {
  const carId = req.params.carId
  const payload = req.body.updatedCar
  console.log(carId,payload);
  const result = await carsServices.getUpdateCars(carId, payload)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'Single Cars Update Sucessfully',
    data: result,
  })
})

// get delete car
const deleteCar = catchAsync(async (req, res) => {
  const carId = req.params.carId
  const result = await carsServices.deleteCars(carId)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'Single Cars Update Sucessfully',
    data: result,
  })
})

export const carsController = {
  createCars,
  getAllCars,
  getSingleCar,
  getUpdateCar,
  deleteCar,
}
