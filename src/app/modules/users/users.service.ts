import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../Helpers/paginationHelpers';
import {
  IUser,
  IUserFilterableFilters,
  userSearchableFields,
} from './users.interface';
import { User } from './users.model';

const createUser = async (payload: IUser): Promise<IUser | null> => {
  //create user
  const result = await User.create(payload);

  //check create user
  if (!result) {
    throw new ApiError(400, 'Failed to create user');
  }
  return result;
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
  const result = await User.findOne({ id });
  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>,
): Promise<IUser | null> => {
  const result = await User.findOneAndUpdate({ id: id }, payload, {
    new: true,
  });
  return result;
};

export const UsersService = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
};
