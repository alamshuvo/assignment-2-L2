import { model, Schema } from 'mongoose'
import { Orderstatus } from './order.const'



// const orderSchema = new Schema(
//   {
//     user: {
//       type: Schema.Types.ObjectId,
//       ref: 'User',
//       required: [true, 'user is required'],
//     },
//     car: {
//       type:Array,
//       required: [true, 'Cars is required'],
//     },
//     quantity: {
//       type: Number,
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: {
//         values: Orderstatus,
//         message: `&{value} is not supported`,
//       },
//       required: [true, 'status is required'],
//     },
//   },
//   {
//     timestamps: true,
//   }
// )

// const Order = model('Order', orderSchema)
// export default Order


const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'user is required'],
    },
    car: {
      type: [{
        car: {
          type: Schema.Types.ObjectId,
          ref: 'Car',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, 'Quantity must be at least 1'],
        }
      }],
      required: [true, 'Cars are required'],
    },
    status: {
      type: String,
      enum: {
        values: Orderstatus,
        message: `'{VALUE}' is not supported`,
      },
      required: [true, 'Status is required'],
    },
    totalPrice:{type:Number,required:true}
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

export const Order = model('Order', orderSchema);
