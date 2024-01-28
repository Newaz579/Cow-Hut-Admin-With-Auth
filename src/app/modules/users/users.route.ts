import express from 'express';
import { UsersController } from './users.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './users.validation';

const router = express.Router();

router.patch(
  '/:id',
  validateRequest(userValidation.updateUserZodSchema),
  UsersController.updateUser,
);

router.get('/', UsersController.getAllUsers);

router.get('/:id', UsersController.getSingleUser);

router.post(
  '/create-user',
  validateRequest(userValidation.createUserZodSchema),
  UsersController.createUser,
);

export const UsersRoutes = router;
