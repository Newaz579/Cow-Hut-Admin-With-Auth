import express from 'express';
import { SellerController } from './seller.controller';
import validateRequest from '../../middlewares/validateRequest';
import { SellerValidation } from './seller.validation';

const router = express.Router();

router.patch(
  '/:id',
  validateRequest(SellerValidation.updateSellerZodSchema),
  SellerController.updateSeller,
);

router.get('/', SellerController.getAllSeller);

router.get('/:id', SellerController.getSingleSeller);

router.delete('/:id', SellerController.deleteSeller)

export const SellerRoute = router;
