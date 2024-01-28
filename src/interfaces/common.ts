import { IGenericErrorMessage } from './errors';

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
    budget?: number;
    minPrice?: number;
    maxPrice?: number;
    location?: string;
  };
  data: T;
};
