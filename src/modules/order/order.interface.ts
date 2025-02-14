import { Types } from 'mongoose'

export default interface iOrder {
  user: Types.ObjectId
  car: Types.ObjectId
  quantity: number
  totalPrice: number
  status: 'pending' | 'cancled' | 'paid'
}

// export type OrderMethod = {
//     isOrderExits(id:string): Promise<iOrder>
// }
// export type OrderModel = Model<iOrder, Record<string,never>, OrderMethod>
