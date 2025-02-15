import { StatusCodes } from 'http-status-codes'
import AppError from '../../errors/AppError'
import Cars from '../cars/cars.model'
import { JwtPayload } from 'jsonwebtoken'
import { Order } from './order.model'
import { TUser } from '../users/user.interface'
import { orderUtils } from './order.utils'

// const createOrder = async (user:TUser,payLoad: iOrder) => {
//   //   const result = await Order.create(payLoad)

//   const { car, quantity } = payLoad

//   const carsData = await Cars.findById(car)

//   if (!carsData) {
//     throw new AppError(StatusCodes.BAD_REQUEST, 'product not found')
//   }

//   if (carsData.quantity < quantity) {
//     throw new AppError(StatusCodes.BAD_REQUEST, 'Insufficant Product')
//   }
//   carsData.quantity -= quantity
//   carsData.inStock = carsData.quantity > 0
//   await carsData.save()

//   const order = (await (await Order.create(payLoad)).populate('user')).populate(
//     'car'
//   )
//   return order
// }
const createOrder = async (
  user: TUser,
  payload: JwtPayload,
  client_ip: string
) => {
  if (!payload?.car?.length)
    throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'Order is not specified')

  const products = payload.car

  let totalPrice = 0
  const productDetails = await Promise.all(
    products.map(async (item:any) => {
      const product = await Cars.findById(item.car)

      if (product) {
        const subtotal = product ? (product.price || 0) * item.quantity : 0
        totalPrice += subtotal
        return item
      }
    })
  )

  const order = {
    user: payload?.user, // Use only the ObjectId here, not the whole payload
    car: productDetails,
    quantity: payload.quantity,
    totalPrice: totalPrice, // Ensure quantity is passed correctly
    status: payload.status,
  } // Ensure status is passed as well

  const orderPlace = await Order.create(order)
  //const userDetails = await User.findById(orderPlace?.user);

  // payment integration
  // const shurjopayPayload = {
  //   amount: totalPrice,
  //   order_id: order._id,
  //   currency: "BDT",
  //   customer_name: user.name,
  //   customer_address: user.address,
  //   customer_email: user.email,
  //   customer_phone: user.phone,
  //   customer_city: user.city,
  //   client_ip,
  // };
  const shurjopayPayload = {
    amount: totalPrice,
    order_id: orderPlace._id,
    currency: 'BDT',
    customer_name: user.name,
    customer_address: 'Dhaka Bangladesh',
    customer_email: user.email,
    customer_phone: '****0555',
    customer_city: 'Chittagong,Bangladesh',
    client_ip,
  }
  const payment = await orderUtils.makePaymentAsync(shurjopayPayload)
  if (payment?.transactionStatus) {
    await Order.updateOne(
      { _id: orderPlace._id },
      {
        $set: {
          transaction: {
            id: payment?.sp_order_id,
            transactionStatus: payment.transactionStatus,
          },
        },
      }
    )
  }

  // const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

  // if (payment?.transactionStatus) {
  //   order = await Order.updateOne({
  //     transaction: {
  //       id: payment.sp_order_id,
  //       transactionStatus: payment.transactionStatus,
  //     },
  //   });
  // }

  return payment.checkout_url
}
// const calculateRevenue = async (): Promise<{ totalRevenue: number }> => {
//   const result = await Order.aggregate([
//     {
//       $lookup: {
//         from: 'cars',
//         localField: 'car',
//         foreignField: '_id',
//         as: 'carDetails',
//       },
//     },
//     {
//       $unwind: '$carDetails',
//     },
//     {
//       $group: {
//         _id: null, // Group all documents together
//         totalRevenue: {
//           $sum: {
//             $multiply: ['$quantity', { $ifNull: ['$carDetails.price', 0] }],
//           },
//         },
//       },
//     },
//     {
//       $project: {
//         _id: 0,
//         totalRevenue: 1,
//       },
//     },
//   ])

//   return result.length > 0 ? result[0] : { totalRevenue: 0 }
// }

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id)
 
  if (verifiedPayment.length) {
    const paymentDetails = verifiedPayment[0]

    await Order.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': paymentDetails.bank_status,
        'transaction.sp_code': paymentDetails.sp_code,
        'transaction.sp_message': paymentDetails.sp_message,
        'transaction.method': paymentDetails.method,
        'transaction.transaction_status': paymentDetails.transaction_status,
        'transaction.date_time': paymentDetails.date_time,
        status:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'Pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'Cancelled'
                : '',
      }
    )
  }

  return verifiedPayment
}
const calculateRevenue = async (): Promise<{ totalRevenue: number }> => {
  const result = await Order.aggregate([
    {
      $group: {
        _id: null, // Group all documents together
        totalRevenue: { $sum: '$totalPrice' }, // Sum up the totalPrice of all orders
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
  verifyPayment,
}
