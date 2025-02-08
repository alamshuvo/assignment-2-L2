import { model, Schema } from 'mongoose'
import { status } from './order.const'

const orderSchema = new Schema(
  {
    user:{
      type:Schema.Types.ObjectId,
      ref:'User',
      required:[true,"user is required"],
      unique:true
    },
    car: {
      type: Schema.Types.ObjectId,
      ref:"Cars",
      required:[true,'Cars is required'],
      unique:true
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
        values:status,
        message:`&{value} is not supported`
      },
      required:[true,"gender is required"]
    }
  },
  {
    timestamps: true,
  }
)

const Order = model('Order', orderSchema)
export default Order
