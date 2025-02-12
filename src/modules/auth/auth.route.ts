import { Router } from "express";
import validateRequest from "../../middleWare/validateRequest";
import { authValidation } from "./auth.validationt";
import { authController } from "./auth.controller";
import auth from "../../middleWare/auth";
import { USER_ROLE } from "../users/user.const";

const router = Router()
router.post('/login',validateRequest(authValidation.loginValidationSchema),authController.loginUser)
router.post('/change-password',auth(USER_ROLE.admin,USER_ROLE.user),validateRequest(authValidation.changePasswordValidationSchema),authController.changePassword)

export const authRoute = router