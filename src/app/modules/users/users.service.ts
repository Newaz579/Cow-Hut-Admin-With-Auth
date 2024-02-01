import mongoose from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { ISeller } from '../seller/seller.interface';
import { IUser } from './users.interface';
import { User } from './users.model';
import { Seller } from '../seller/seller.model';
import httpStatus from 'http-status';
import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { IBuyer } from '../buyer/buyer.interface';
import { Buyer } from '../buyer/buyer.model';

const createSeller = async (
  seller: ISeller,
  user: IUser,
): Promise<IUser | null> => {
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //array
    const newSeller = await Seller.create([seller], { session });
    if (!newSeller.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Seller');
    }
    //set seller _id into user.seller
    user.seller = newSeller[0]._id;

    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    newUserAllData = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  if (newUserAllData) {
    newUserAllData = await User.findById(newUserAllData._id).populate('seller');
  }
  return newUserAllData;
};

const createAdmin = async (
  admin: IAdmin,
  user: IUser,
): Promise<IUser | null> => {
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //array
    const newAdmin = await Admin.create([admin], { session });
    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Create Admin');
    }
    //set admin _id into user.seller
    user.admin = newAdmin[0]._id;

    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Failed to Create new Admin User',
      );
    }
    newUserAllData = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findById(newUserAllData._id).populate('admin');
  }

  return newUserAllData;
};

const createBuyer = async (
  buyer: IBuyer,
  user: IUser,
): Promise<IUser | null> => {
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //create new Buyer & it's an array
    const newBuyer = await Buyer.create([buyer], { session });
    if (!newBuyer) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Buyer');
    }

    //set buyer _id into user
    user.buyer = newBuyer[0]._id;
    //now create buyer user
    const newUser = await User.create([user], { session });

    if (!newUser) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Failed to create new Buyer User',
      );
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findById(newUserAllData._id).populate('buyer');
  }

  return newUserAllData;
};

export const UsersService = {
  createSeller,
  createAdmin,
  createBuyer,
};
