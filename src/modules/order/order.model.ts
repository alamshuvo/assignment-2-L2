import { model, Schema } from 'mongoose'
import { Orderstatus } from './order.const'

const orderSchema = new Schema(
  {
    user:{
      type:Schema.Types.ObjectId,
      ref:'User',
      required:[true,"user is required"],
    },
    car: {
      type: Schema.Types.ObjectId,
      ref:"Cars",
      required:[true,'Cars is required'],
    },
    quantity: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status:{
      type:String,
      enum:{
        values:Orderstatus,
        message:`&{value} is not supported`
      },
      required:[true,"status is required"]
    }
  },
  {
    timestamps: true,
  }
)

const Order = model('Order', orderSchema)
export default Order
