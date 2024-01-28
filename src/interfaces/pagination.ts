export type IPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  budget?: number;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
};
