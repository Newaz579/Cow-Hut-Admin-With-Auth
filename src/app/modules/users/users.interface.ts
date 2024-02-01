import { Model, Types } from 'mongoose';
import { ISeller } from '../seller/seller.interface';
import { IAdmin } from '../admin/admin.interface';
import { IBuyer } from '../buyer/buyer.interface';
export type IUser = {
  role: string;
  password: string;
  seller?: Types.ObjectId | ISeller;
  admin?: Types.ObjectId | IAdmin;
  buyer?: Types.ObjectId | IBuyer;
};

export type UserModel = {
  isUserExist(id: string): Promise<Pick<IUser, 'password' | 'role'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
} & Model<IUser, Document>;

// export type UserModel = Model<IUser, Record<string, unknown>>;
