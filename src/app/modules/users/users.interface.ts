import { Model } from 'mongoose';

export type UserName = {
  firstName: string;
  lastName: string;
};

export type IUser = {
  id: string;
  phoneNumber: string;  
  role: string;
  password: string;
  needsPasswordChange: true | false;
  name: UserName;
  address: string;
  budget: string;
  income: string;
} & Document;

export type UserModel = {
  isUserExist(
    id: string,
  ): Promise<Pick<IUser, 'id' | 'password' | 'role' | 'needsPasswordChange'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
} & Model<IUser, Document>;

// export type UserModel = Model<IUser, Record<string, unknown>>;

export type IUserFilterableFilters = {
  searchTerm?: string;
  role?: string;
  phoneNumber?: string;
  budget?: string;
};

export const userFilterableFields = [
  'searchTerm',
  'role',
  'phoneNumber',
  'budget',
];

export const userSearchableFields = ['role', 'phoneNumber', 'budget'];
