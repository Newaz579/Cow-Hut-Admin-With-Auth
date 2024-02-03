import mongoose, { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { ISeller } from '../seller/seller.interface';
import { IUser, IUserFilterableFilters, userSearchableFields } from './users.interface';
import { User } from './users.model';
import { Seller } from '../seller/seller.model';
import httpStatus from 'http-status';
import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { IBuyer } from '../buyer/buyer.interface';
import { Buyer } from '../buyer/buyer.model';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../Helpers/paginationHelpers';

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

const getAllUsers = async (
  filters: IUserFilterableFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IUser[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: userSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder, budget, location } =
    paginationHelpers.calculatePagination(paginationOptions);
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await User.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await User.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
      budget,
      location,
    },
    data: result,
  };
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);
  return result;
};

const updateUser = async (
  _id: string,
  payload: Partial<IUser>,
): Promise<IUser | null> => {
  const result = await User.findByIdAndUpdate({ _id }, payload, {
    new: true,
  });
  return result;
};



export const UsersService = {
  createSeller,
  createAdmin,
  createBuyer,
  getAllUsers,
  getSingleUser,
  updateUser
};
