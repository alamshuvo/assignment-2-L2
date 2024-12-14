import { Model } from 'mongoose'

export default interface iOrder {
  email: string
  car: string
  quantity: number
  totalPrice: number
}

// export type OrderMethod = {
//     isOrderExits(id:string): Promise<iOrder>
// }
// export type OrderModel = Model<iOrder, Record<string,never>, OrderMethod>
