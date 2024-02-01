import { SortOrder } from 'mongoose';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../Helpers/paginationHelpers';
import { ICow, ICowFilters, cowSearchableFields } from './cow.interface';
import { Cow } from './cow.model';

const createCow = async (payload: ICow): Promise<ICow | null> => {
  const result = (await Cow.create(payload)).populate('seller');
  return result;
};

const getAllCow = async (
  filters: ICowFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<ICow[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: cowSearchableFields.map(field => ({
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

  const { page, limit, skip, sortBy, sortOrder, maxPrice, minPrice, location } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const result = await Cow.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Cow.countDocuments();

  return {
    meta: {
      page,
      limit,
      maxPrice,
      minPrice,
      location,
      total,
    },
    data: result,
  };
};

const getSingleCow = async (_id: string): Promise<ICow | null> => {
  const result = await Cow.findById({ _id }).populate('seller');
  return result;
};

const updateCow = async (
  _id: string,
  payload: Partial<ICow>,
): Promise<ICow | null> => {
  const result = await Cow.findByIdAndUpdate({ _id }, payload, {
    new: true,
  }).populate('seller');
  return result;
};

export const CowService = {
  createCow,
  getAllCow,
  getSingleCow,
  updateCow,
};
