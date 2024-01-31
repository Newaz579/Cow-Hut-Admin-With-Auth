import { z } from 'zod';
import { userType } from './users.constant';

const createUserZodSchema = z.object({
  body: z.object({
    role: z.enum([...userType] as [string, ...string[]], {
      required_error: 'Role is Required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
    seller: z.object({
      phoneNumber: z.string({
        required_error: 'Phone Number is Required',
      }),
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

// phoneNumber: string;
//   role: string;
//   password: string;
//   name: UserName;
//   address: string;
//   budget: string;
//   income: string;


export const userValidation = {
  createUserZodSchema,
};
