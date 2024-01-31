import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { paginationFields } from '../constants/paginationFields';
import sendResponse from '../../../shared/sendResponse';
import { ISeller, sellerFilterableFields } from './seller.interface';
import httpStatus from 'http-status';
import { SellerService } from './seller.service';

const getAllSeller = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, sellerFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await SellerService.getAllSeller(filters, paginationOptions);
  sendResponse<ISeller[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sellers Retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleSeller = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await SellerService.getSingleSeller(id);

  sendResponse<ISeller>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Seller Retrieved Successfully',
    data: result,
  });
});

const updateSeller = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await SellerService.updateSeller(id, updatedData);

  sendResponse<ISeller>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Seller updated successfully',
    data: result,
  });
});

const deleteSeller = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const sellerData = await SellerService.deleteSeller(id);

  sendResponse<ISeller>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Seller Deleted Successfully',
    data: sellerData,
  });
});

export const SellerController = {
  getAllSeller,
  getSingleSeller,
  updateSeller,
  deleteSeller,
};
