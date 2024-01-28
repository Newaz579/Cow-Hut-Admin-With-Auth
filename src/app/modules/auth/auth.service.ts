import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../users/users.model';
import { ILogInUser, IRefreshTokenAccess } from './auth.interface';
import { Secret } from 'jsonwebtoken';
import { JwtHelpers } from '../Helpers/jwtHelpers';
import config from '../../../config';

const logInUser = async (payload: ILogInUser) => {
  const { id, password } = payload;
  //check user exist
  const isUserExist = await User.isUserExist(id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User does Not Exist');
  }
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Password is Incorrect');
  }

  const { id: userId, role, needsPasswordChange } = isUserExist;

  //generate Access Token
  const accessToken = JwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  //generate Refresh Token
  const refreshToken = JwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenAccess> => {
  //verified Token
  let verifiedToken = null;
  try{
    verifiedToken = JwtHelpers.verifyToken(token, config.jwt.refresh_secret as Secret)
  }catch(error){
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token')
  }
  const {userId} = verifiedToken;
  const isUserExist = await User.isUserExist(userId);
  if(!isUserExist){
    throw new ApiError(httpStatus.NOT_FOUND, 'User Does Not Exist');
  }
  //generate new Access Token
  const newAccessToken = JwtHelpers.createToken({id: isUserExist.id, role: isUserExist.role}, config.jwt.secret as Secret, config.jwt.expires_in as string);
  return {
    accessToken: newAccessToken
  }

};

export const AuthService = {
  logInUser,
  refreshToken,
};
