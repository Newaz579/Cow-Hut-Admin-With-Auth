import { Model, Types } from 'mongoose';
import { ISeller } from '../seller/seller.interface';

export type ICow = {
  name: string;
  age: string;
  price: string;
  location: string;
  breed: string;
  weight: string;
  label: string;
  category: string;
  seller: Types.ObjectId | ISeller;
};

export type CowModel = Model<ICow, Record<string, unknown>>;

export type ICowFilters = {
  searchTerm?: string;
  price?: string;
  location?: string;
  breed?: string;
  category?: string;
};

export const cowFilterableFields = [
  'searchTerm',
  'price',
  'location',
  'breed',
  'category',
];

export const cowSearchableFields = ['price', 'location', 'breed', 'category'];

/*
{
  "name": "Bella",
  "age": 4,
  "price": 5000,
  "location": "Dhaka",
  "breed": "Brahman",
  "weight": 400,
  "label": "for sale",
  "category": "Beef",
  "seller": "ObjectId(609c17fc1281bb001f523456)"
}
*/
