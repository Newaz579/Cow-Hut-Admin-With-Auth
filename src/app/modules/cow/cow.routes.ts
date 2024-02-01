import express from 'express';
import { CowController } from './cow.controller';
import validateRequest from '../../middlewares/validateRequest';
import { cowValidation } from './cow.validation';

const router = express.Router();

router.post(
  '/create-cow',
  validateRequest(cowValidation.createCowZodSchema),
  CowController.createCow,
);
router.patch(
  '/:id',
  validateRequest(cowValidation.updateCowZodSchema),
  CowController.updateCow,
);
router.get('/', CowController.getAllCow);

router.get('/:id', CowController.getSingleCow);

export const CowRoutes = router;
