import { z } from 'zod';
import { userType } from './users.constant';

const createSellerUserZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: 'Phone Number is Required'
    }),
    role: z.enum([...userType] as [string, ...string[]], {
      required_error: 'Role is Required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
    seller: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First Name is Required',
        }),
        lastName: z.string({
          required_error: 'Last Name is Required',
        }),
      }),
      address: z.string({
        required_error: 'Address is Required',
      }),
      budget: z.string({
        required_error: 'Budget is Required',
      }),
      income: z.string({
        required_error: 'Income is Required',
      }),
    }),
  }),
});

const createAdminUserZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: 'Phone Number is Required'
    }),
    role: z.enum([...userType] as [string, ...string[]], {
      required_error: 'Role is Required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
    admin: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First Name is Required',
        }),
        lastName: z.string({
          required_error: 'Last Name is Required',
        }),
      }),
      address: z.string({
        required_error: 'Address is Required',
      }),
    }),
  }),
});

const createBuyerUserZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: 'Phone Number is Required'
    }),
    role: z.enum([...userType] as [string, ...string[]], {
      required_error: 'Role is Required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
    buyer: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First Name is Required',
        }),
        lastName: z.string({
          required_error: 'Last Name is Required',
        }),
      }),
      address: z.string({
        required_error: 'Address is Required',
      }),
      budget: z.string({
        required_error: 'Budget is Required',
      }),
    }),
  }),
});

export const userValidation = {
  createSellerUserZodSchema,
  createBuyerUserZodSchema,
  createAdminUserZodSchema,
};
