import express from 'express';
import { BuyerController } from './buyer.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BuyerValidation } from './buyer.validation';

const router = express.Router();

router.patch(
  '/:id',
  validateRequest(BuyerValidation.updateBuyerZodSchema),
  BuyerController.updateBuyer,
);

router.get('/', BuyerController.getAllBuyers);

router.get('/:id', BuyerController.getSingleBuyer);

router.delete('/:id', BuyerController.deleteBuyer);

export const BuyerRoute = router;
