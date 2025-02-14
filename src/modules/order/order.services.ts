import { StatusCodes } from 'http-status-codes'
import AppError from '../../errors/AppError'
import Cars from '../cars/cars.model'
import iOrder from './order.interface'
import Order from './order.model'

const createOrder = async (payLoad: iOrder) => {
  //   const result = await Order.create(payLoad)

  const { car, quantity } = payLoad

  const carsData = await Cars.findById(car)

  if (!carsData) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'product not found')
  }

  if (carsData.quantity < quantity) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Insufficant Product')
  }
  carsData.quantity -= quantity
  carsData.inStock = carsData.quantity > 0
  await carsData.save()

  const order = (await (await Order.create(payLoad)).populate('user')).populate(
    'car'
  )
  return order
}

const calculateRevenue = async (): Promise<{ totalRevenue: number }> => {
  const result = await Order.aggregate([
    {
      $lookup: {
        from: 'cars',
        localField: 'car',
        foreignField: '_id',
        as: 'carDetails',
      },
    },
    {
      $unwind: '$carDetails',
    },
    {
      $group: {
        _id: null, // Group all documents together
        totalRevenue: {
          $sum: {
            $multiply: ['$quantity', { $ifNull: ['$carDetails.price', 0] }],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalRevenue: 1,
      },
    },
  ])

  return result.length > 0 ? result[0] : { totalRevenue: 0 }
}

const getOrder = async () => {
  const result = await Order.find().populate('user').populate('car')
  return result
}

const changeStatus = async (id: string, data: { status: string }) => {
  const updatedData = await Order.findById({ _id: id })
  if (updatedData?.status === 'paid' || updatedData?.status === 'cancled') {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'you can not change status after you change status one time'
    )
  }
  const result = await Order.findByIdAndUpdate(id, data, { new: true })
  return result
}

const deleteOrder = async (id: string) => {
  const deleteOrder = await Order.findByIdAndDelete(id)
  return deleteOrder
}
export const orderServices = {
  createOrder,
  calculateRevenue,
  getOrder,
  changeStatus,
  deleteOrder,
}
