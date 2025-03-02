import {  Router } from 'express'
import validateRequest from '../../middleWare/validateRequest'
import { UserValidation } from './user.validation'
import { UserController } from './user.controller'
import auth from '../../middleWare/auth'
import { USER_ROLE } from './user.const'
//import { upload } from '../../utils/sendImgToClodudinary'

const router = Router()
router.post(
  '/create-user',
  // upload.single('file'),
  // (req: Request, res: Response, next: NextFunction) => {
  //   req.body = JSON.parse(req.body.data)
  //   next()
  // },
  validateRequest(UserValidation.userValidationSchema),
  UserController.createUser
)
router.get('/', auth(USER_ROLE.admin), UserController.getAllUser)
router.get('/:id', auth(USER_ROLE.admin), UserController.getSingleUser)
router.patch(
  '/update-user/:id',
  validateRequest(UserValidation.updateUserValidationSchema),
  UserController.updateUser
)
router.post(
  '/change-status/:id',
  auth(USER_ROLE.admin),
  validateRequest(UserValidation.changeValidationSchema),
  UserController.changeStatus
)
router.post("/me",auth(USER_ROLE.user,USER_ROLE.admin),UserController.getMe)
router.delete(
  '/delete-user/:id',
  auth(USER_ROLE.admin),
  UserController.deleteUser
)

export const UserRote = router
