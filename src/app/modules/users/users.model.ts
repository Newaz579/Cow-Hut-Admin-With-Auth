/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model, Document } from 'mongoose';
import { IUser, UserModel } from './users.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';
import { userType } from './users.constant';
import { Seller } from '../seller/seller.model';
import { Admin } from '../admin/admin.model';
import { Buyer } from '../buyer/buyer.model';

export const UserSchema = new Schema<IUser, UserModel, Document>(
  {
    role: {
      type: String,
      required: true,
      enum: userType,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: Seller,
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: Admin,
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: Buyer,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

UserSchema.statics.isUserExist = async function (
  id: string,
): Promise<Pick<IUser, 'password' | 'role'> | null> {
  return await User.findOne(
    { id },
    { id: 1, password: 1, role: 1, needsPasswordChange: 1 },
  );
};

UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

UserSchema.pre('save', async function (next) {
  //hashing password
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

export const User = model<IUser, UserModel>('User', UserSchema);
