import { Router } from "express";
import validateRequest from "../../middleWare/validateRequest";
import { UserValidation } from "./user.validation";
import { UserController } from "./user.controller";

const router = Router();
router.post('/create-user',validateRequest(UserValidation.userValidationSchema),UserController.createUser)




export const UserRote = router;