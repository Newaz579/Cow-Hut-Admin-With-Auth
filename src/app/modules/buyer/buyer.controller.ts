import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import { IBuyer, buyerFilterableFields } from "./buyer.interface";
import { paginationFields } from "../constants/paginationFields";
import { BuyerService } from "./buyer.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const getAllBuyers = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, buyerFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
  
    const result = await BuyerService.getAllBuyers(filters, paginationOptions);
    sendResponse<IBuyer[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Buyers Retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  });
  
  const getSingleBuyer = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await BuyerService.getSingleBuyer(id);
  
    sendResponse<IBuyer>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Buyer Retrieved Successfully',
      data: result,
    });
  });
  
  const updateBuyer = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await BuyerService.updateBuyer(id, updatedData);
  
    sendResponse<IBuyer>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Buyer updated successfully',
      data: result,
    });
  });
  
  const deleteBuyer = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const sellerData = await BuyerService.deleteBuyer(id);
  
    sendResponse<IBuyer>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Buyer Deleted Successfully',
      data: sellerData,
    });
  });
  

export const BuyerController = {
    getAllBuyers,
    getSingleBuyer,
    updateBuyer,
    deleteBuyer
}