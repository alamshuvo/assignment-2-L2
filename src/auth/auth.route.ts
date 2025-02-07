import { Router } from "express";
import validateRequest from "../middleWare/validateRequest";
import { authValidation } from "./auth.validationt";
import { authController } from "./auth.controller";

const router = Router()
router.post('/login',validateRequest(authValidation.loginValidationSchema),authController.loginUser)


export const authRoute = router