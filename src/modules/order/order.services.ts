import Cars from '../cars/cars.model'
import iOrder from './order.interface'
import Order from './order.model'

const createOrder = async (payLoad: iOrder): Promise<iOrder> => {
  //   const result = await Order.create(payLoad)
  const { car, quantity } = payLoad
  const carsData = await Cars.findById(car);
  if (!carsData) {
    throw new Error ("Product not found")
  }

  if (carsData.quantity < quantity) {
    throw new Error ("Insufficient Stock")
  }
  carsData.quantity -=quantity;
  carsData.inStock = carsData.quantity > 0
  await carsData.save()

  const order = await Order.create(payLoad)
  return order
}


const calculateRevenue = async (): Promise<{ totalRevenue: number }> => {
      const result = await Order.aggregate([
        {
          $lookup: {
            from: 'cars',
            let: { carId: '$car' }, 
            pipeline: [
              {
                $match: {
                  $expr: { $eq: [{ $toString: '$_id' }, '$$carId'] }, 
                },
              },
            ],
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
              $sum: { $multiply: ['$quantity', '$carDetails.price'] }, // Calculate revenue
            },
          },
        },
        {
          $project: {
            _id: 0, 
            totalRevenue: 1, 
          },
        },
      ]);
    
      return result.length > 0 ? result[0] : { totalRevenue: 0 }; 
    };
    
    

  
export const orderServices = {
  createOrder,
  calculateRevenue
}
