import { Request, Response } from 'express';
import { UsersService } from './users.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IUser, } from './users.interface'; //userFilterableFields
// import pick from '../../../shared/pick';
// import { paginationFields } from '../constants/paginationFields';

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
  const {admin, ...userData} = req.body;
  const result = await UsersService.createAdmin(admin, userData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin User Created Successfully',
    data: result
  })
})

export const UsersController = {
  createSeller,
  createAdmin
};
