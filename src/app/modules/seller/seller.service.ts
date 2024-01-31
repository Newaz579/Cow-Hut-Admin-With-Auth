import mongoose, { SortOrder } from 'mongoose';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../Helpers/paginationHelpers';
import {
  ISeller,
  ISellerFilterableFilters,
  sellerSearchableFields,
} from './seller.interface';
import { Seller } from './seller.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { User } from '../users/users.model';

const getAllSeller = async (
  filters: ISellerFilterableFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<ISeller[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: sellerSearchableFields.map(field => ({
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

  const result = await Seller.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Seller.countDocuments();

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

const getSingleSeller = async (id: string): Promise<ISeller | null> => {
  const result = await Seller.findById(id);
  return result;
};

const updateSeller = async (
  _id: string,
  payload: Partial<ISeller>,
): Promise<ISeller | null> => {
  const result = await Seller.findByIdAndUpdate({ _id }, payload, {
    new: true,
  });
  return result;
};

const deleteSeller = async (_id: string): Promise<ISeller | null> => {
  //check if the seller is exist
  const isSellerExist = await Seller.findById({ _id });
  if (!isSellerExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Seller is not found');
  }
  const session = await mongoose.startSession();
  try{
    session.startTransaction();
    //delete seller first
    const seller = await Seller.findByIdAndDelete({_id}, {session});
    if(!seller){
      throw new ApiError(httpStatus.BAD_REQUEST, 'Seller Not Found');
    }
    //delete User
    await User.deleteOne({_id});
    session.commitTransaction();
    session.endSession();
    return seller
  }catch(error){
    session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const SellerService = {
  getAllSeller,
  getSingleSeller,
  updateSeller,
  deleteSeller,
};
