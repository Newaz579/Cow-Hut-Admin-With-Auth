import { Request, Response } from 'express';
import { UsersService } from './users.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IUser, userFilterableFields } from './users.interface';
import pick from '../../../shared/pick';
import { paginationFields } from '../constants/paginationFields';

const createSeller = catchAsync(async (req: Request, res: Response) => {
  const { seller, ...userData } = req.body;
  const result = await UsersService.createSeller(seller, userData);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Seller User created Successfully!',
    data: result,
  });
});

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { admin, ...userData } = req.body;
  const result = await UsersService.createAdmin(admin, userData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin User Created Successfully',
    data: result,
  });
});

const createBuyer = catchAsync(async (req: Request, res: Response) => {
  const { buyer, ...userData } = req.body;
  const result = await UsersService.createBuyer(buyer, userData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Buyer User Created Successfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async(req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await UsersService.getAllUsers(filters, paginationOptions);
  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users Retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
})

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UsersService.getSingleUser(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Retrieved Successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await UsersService.updateUser(id, updatedData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});


export const UsersController = {
  createSeller,
  createAdmin,
  createBuyer,
  getAllUsers,
  getSingleUser,
  updateUser
};
