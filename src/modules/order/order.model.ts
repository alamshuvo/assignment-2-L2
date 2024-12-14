import { model, Schema } from 'mongoose'

const orderSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    car: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Order = model('Order', orderSchema)
export default Order
