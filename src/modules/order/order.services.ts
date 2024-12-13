import iOrder from "./order.interface"
import Order from "./order.model"

const createOrder = async(payLoad:iOrder): Promise<iOrder>=>{
    const result = await Order.create(payLoad)
    return result
}


export const orderServices={
    createOrder
}