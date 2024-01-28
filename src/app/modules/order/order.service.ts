import mongoose from 'mongoose';
import { ICow } from '../cow/cow.interface';
import { IUser } from '../users/users.interface';
import { IOrder } from './order.interface';
import { Order } from './order.model';
import { Cow } from '../cow/cow.model';
import { User } from '../users/users.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createOrder = async (cow: ICow, buyer: IUser): Promise<IOrder | null> => {
  let newOrderAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const existingCow = await Cow.findById(cow);
    const existingBuyer = await User.findById(buyer);
    const cowSellerUser = await User.findById(existingCow?.seller);
    const buyerBudget = Number(existingBuyer?.budget);
    const cowPrice = Number(existingCow?.price);
    const cowSellerIncome = Number(cowSellerUser?.income);

    if (!existingBuyer || !existingCow) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'No Buyer');
    } else if (buyerBudget < cowPrice) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Buyer doesn't have enough money",
      );
      // console.log(buyerBudget, cowPrice);
    } else {
      existingCow.label = 'sold out';
      await existingCow.save();
      existingBuyer.budget = String(buyerBudget - cowPrice);
      await existingBuyer.save();
      if (cowSellerUser) {
        cowSellerUser.income = String(cowSellerIncome + cowPrice);
        await cowSellerUser.save();
      }
      //create a new Order
      const newOrder = await Order.create({ cow, buyer });
      await newOrder.save();
      if (!newOrder) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'failed to Make Order');
      }
      newOrderAllData = newOrder;
    }
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  if (newOrderAllData) {
    newOrderAllData = await Order.findById(newOrderAllData.id)
      .populate('cow')
      .populate('buyer');
  }
  return newOrderAllData;
};

export const OrderService = {
  createOrder,
};
