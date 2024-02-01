import { Schema, model } from 'mongoose';
import { BuyerModel, IBuyer } from './buyer.interface';

export const BuyerSchema = new Schema<IBuyer, BuyerModel>(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Buyer = model<IBuyer, BuyerModel>('Buyer', BuyerSchema);
