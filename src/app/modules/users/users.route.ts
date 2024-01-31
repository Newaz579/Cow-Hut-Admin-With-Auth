import express from 'express';
import { UsersController } from './users.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './users.validation';

const router = express.Router();

router.post(
  '/create-seller',
  validateRequest(userValidation.createUserZodSchema),
  UsersController.createSeller,
);

router.post('/create-admin', UsersController.createAdmin)

router.post('/create-admin',)

export const UsersRoutes = router;
