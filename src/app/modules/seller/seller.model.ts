import { Schema, model } from 'mongoose';
import { ISeller, SellerModel } from './seller.interface';

export const SellerSchema = new Schema<ISeller, SellerModel>(
  {
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    address: {
      type: String,
      required: true,
    },
    budget: {
      type: String,
      required: true,
    },
    income: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Seller = model<ISeller, SellerModel>('Seller', SellerSchema);
