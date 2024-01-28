import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';
import config from '../../../config';
import { IRefreshTokenAccess } from './auth.interface';

const logInUser = catchAsync(async (req: Request, res: Response) => {
  const { ...logInData } = req.body;
  const result = await AuthService.logInUser(logInData);
  const { refreshToken, ...others } = result;

  //set Refresh Token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User LogIn Successfully',
    data: others,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  //set refresh token into service
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshTokenAccess>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Refresh Token Retrieved Successfully',
    data: result,
  });
});

export const AuthController = {
  logInUser,
  refreshToken,
};
