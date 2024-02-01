import mongoose, { SortOrder } from 'mongoose';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../Helpers/paginationHelpers';
import {
  IBuyer,
  IBuyerFilterableFilters,
  buyerSearchableFields,
} from './buyer.interface';
import { Buyer } from './buyer.model';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../users/users.model';

const getAllBuyers = async (
  filters: IBuyerFilterableFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IBuyer[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: buyerSearchableFields.map(field => ({
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

  const result = await Buyer.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Buyer.countDocuments();

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

const getSingleBuyer = async (id: string): Promise<IBuyer | null> => {
  const result = await Buyer.findById(id);
  return result;
};

const updateBuyer = async (
  _id: string,
  payload: Partial<IBuyer>,
): Promise<IBuyer | null> => {
  const result = await Buyer.findByIdAndUpdate({ _id }, payload, {
    new: true,
  });
  return result;
};

const deleteBuyer = async (_id: string): Promise<IBuyer | null> => {
  //check if the seller is exist
  const isBuyerExist = await Buyer.findById({ _id });
  if (!isBuyerExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Buyer is not found');
  }
  let buyer = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //delete seller first
    buyer = await Buyer.findByIdAndDelete({ _id }, { session });
    if (!buyer) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Seller Not Found');
    }
    //delete User
    await User.deleteOne({ _id });
    session.commitTransaction();
    session.endSession();
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw error;
  }
  return buyer;
};

export const BuyerService = {
  getAllBuyers,
  getSingleBuyer,
  updateBuyer,
  deleteBuyer,
};
