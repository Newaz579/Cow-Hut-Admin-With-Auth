import mongoose, { SortOrder } from 'mongoose';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../Helpers/paginationHelpers';
import {
  IAdmin,
  IAdminFilterableFilters,
  adminSearchableFields,
} from './admin.interface';
import { Admin } from './admin.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { User } from '../users/users.model';

const getAllAdmin = async (
  filters: IAdminFilterableFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IAdmin[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: adminSearchableFields.map(field => ({
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

  const result = await Admin.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Admin.countDocuments();

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

const getSingleAdmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findById(id);
  return result;
};

const updateAdmin = async (
    _id: string,
    payload: Partial<IAdmin>,
  ): Promise<IAdmin | null> => {
    const result = await Admin.findByIdAndUpdate({ _id }, payload, {
      new: true,
    });
    return result;
  };
  
  const deleteAdmin = async (_id: string): Promise<IAdmin | null> => {
    //check if the seller is exist
    const isAdminExist = await Admin.findById({ _id });
    if (!isAdminExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Admin is not found');
    }
    const session = await mongoose.startSession();
    try{
      session.startTransaction();
      //delete seller first
      const admin = await Admin.findByIdAndDelete({_id}, {session});
      if(!admin){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Admin Not Found');
      }
      //delete User
      await User.deleteOne({_id});
      session.commitTransaction();
      session.endSession();
      return admin
    }catch(error){
      session.abortTransaction();
      session.endSession();
      throw error;
    }
  };
  

export const AdminService = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin
};
