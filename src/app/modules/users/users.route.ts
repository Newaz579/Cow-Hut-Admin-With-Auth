import express from 'express';
import { UsersController } from './users.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './users.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../enums/user';

const router = express.Router();

router.post(
  '/create-seller',
  validateRequest(userValidation.createSellerUserZodSchema),
  UsersController.createSeller,
);

router.post(
  '/create-admin',
  validateRequest(userValidation.createAdminUserZodSchema),
  UsersController.createAdmin,
);

router.post(
  '/create-buyer',
  validateRequest(userValidation.createBuyerUserZodSchema),
  UsersController.createBuyer,
);

router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), UsersController.updateUser);

router.get('/', auth(ENUM_USER_ROLE.ADMIN), UsersController.getAllUsers);

router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UsersController.getSingleUser);

export const UsersRoutes = router;
