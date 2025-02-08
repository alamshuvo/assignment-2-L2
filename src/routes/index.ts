import { Router } from "express";
import carsRouter from "../modules/cars/cars.router";
import orderRouter from "../modules/order/order.router";
import { UserRote } from "../modules/users/user.route";
import { authRoute } from "../modules/auth/auth.route";

const router = Router()
const moduleRoutes =[
    {
        path:"/users",
        route:UserRote
    },
    {
        path:"/cars",
        route:carsRouter
    },
    {
        path:"/orders",
        route:orderRouter
    },
    {
        path:"/auth",
        route:authRoute
    }
]

moduleRoutes.forEach((route)=>router.use(route.path,route.route));
export default router