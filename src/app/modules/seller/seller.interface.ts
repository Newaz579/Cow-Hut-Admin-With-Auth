import { Model } from 'mongoose';

export type UserName = {
  firstName: string;
  lastName: string;
};

export type ISeller = {
  name: UserName;
  address: string;
  budget: string;
  income: string;
};

export type SellerModel = Model<ISeller, Record<string, unknown>>;


export type ISellerFilterableFilters = {
  searchTerm?: string;
  role?: string;
  phoneNumber?: string;
  budget?: string;
};

export const sellerFilterableFields = [
  'searchTerm',
  'role',
  'phoneNumber',
  'budget',
];

export const sellerSearchableFields = ['role', 'phoneNumber', 'budget'];