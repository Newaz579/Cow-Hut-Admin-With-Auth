import { SortOrder } from 'mongoose';
import { IPaginationOptions } from '../../../interfaces/pagination';

type IOptionsResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: SortOrder;
  budget: number;
  minPrice: number;
  maxPrice: number;
  location: string;
};

const calculatePagination = (options: IPaginationOptions): IOptionsResult => {
  const page = Number(options.page || 1);
  const limit = Number(options.limit || 10);
  const skip = (page - 1) * limit;
  const sortBy = options.sortBy || 'createdAt';
  const sortOrder = options.sortOrder || 'desc';
  const budget = Number(options.budget || 50000);
  const minPrice = Number(options.minPrice || 50000);
  const maxPrice = Number(options.maxPrice || 500000);

  const location = options.location || 'Chattogram';

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
    budget,
    minPrice,
    maxPrice,
    location,
  };
};

export const paginationHelpers = {
  calculatePagination,
};
