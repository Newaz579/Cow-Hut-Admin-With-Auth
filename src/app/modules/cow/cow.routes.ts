import express from 'express';
import { CowController } from './cow.controller';
import validateRequest from '../../middlewares/validateRequest';
import { cowValidation } from './cow.validation';
import { ENUM_USER_ROLE } from '../enums/user';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-cow',
  validateRequest(cowValidation.createCowZodSchema),
  auth(ENUM_USER_ROLE.SELLER),
  CowController.createCow,
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SELLER),
  validateRequest(cowValidation.updateCowZodSchema),
  CowController.updateCow,
);
router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  CowController.getAllCow,
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  CowController.getSingleCow,
);

export const CowRoutes = router;
