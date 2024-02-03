import { Model } from 'mongoose';

export type UserName = {
  firstName: string;
  lastName: string;
};

export type IBuyer = {
  name: UserName;
  address: string;
  budget: string;
};

export type BuyerModel = Model<IBuyer, Record<string, unknown>>;

export type IBuyerFilterableFilters = {
  searchTerm?: string;
  role?: string;
  phoneNumber?: string;
  budget?: string;
};

export const buyerFilterableFields = [
  'searchTerm',
  'role',
  'phoneNumber',
  'budget',
];

export const buyerSearchableFields = ['role', 'phoneNumber', 'budget'];
