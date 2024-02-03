import { Model } from 'mongoose';

export type UserName = {
  firstName: string;
  lastName: string;
};

export type IAdmin = {
  name: UserName;
  address: string;
};

export type AdminModel = Model<IAdmin, Record<string, unknown>>;

export type IAdminFilterableFilters = {
  searchTerm?: string;
  role?: string;
  phoneNumber?: string;
  budget?: string;
};

export const adminFilterableFields = [
  'searchTerm',
  'role',
  'phoneNumber',
  'budget',
];

export const adminSearchableFields = ['role', 'phoneNumber', 'budget'];
