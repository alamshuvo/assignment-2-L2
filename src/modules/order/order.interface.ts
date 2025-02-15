import { Types } from 'mongoose'

// export default interface iOrder {
//   user: Types.ObjectId
//   car: Types.ObjectId[] 
//   quantity: number
//   status: 'pending' | 'cancled' | 'paid'
// }


export default interface iOrder {
  user: Types.ObjectId; // Reference to User model
  car: { car: Types.ObjectId; quantity: number }[]; // Array of objects with car ID and quantity
  status: 'pending' | 'canceled' | 'paid'; // Order status
  totalPrice:number
}


// export type OrderMethod = {
//     isOrderExits(id:string): Promise<iOrder>
// }
// export type OrderModel = Model<iOrder, Record<string,never>, OrderMethod>
