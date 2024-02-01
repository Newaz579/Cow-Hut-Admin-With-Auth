import express from 'express';
import { UsersController } from './users.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './users.validation';

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

export const UsersRoutes = router;
