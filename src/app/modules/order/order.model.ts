import { Schema, model } from 'mongoose';
import { IOrder, OrderModel } from './order.interface';
import { Cow } from '../cow/cow.model';
import { User } from '../users/users.model';

export const OrderSchema = new Schema<IOrder, OrderModel>(
  {
    cow: {
      type: Schema.Types.ObjectId,
      ref: Cow,
      required: true,
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: User,
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

export const Order = model<IOrder, OrderModel>('Order', OrderSchema);
