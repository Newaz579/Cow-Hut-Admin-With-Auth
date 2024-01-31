import { z } from 'zod';

const updateSellerZodSchema = z.object({
  body: z.object({
    phoneNumber: z
      .string({
        required_error: 'Phone Number is required',
      })
      .optional(),
    name: z
      .object({
        firstName: z
          .string({
            required_error: 'First Name is required',
          })
          .optional(),
        lastName: z
          .string({
            required_error: 'Last Name is required',
          })
          .optional(),
      })
      .optional(),
    address: z
      .string({
        required_error: 'Address is required',
      })
      .optional(),
    budget: z
      .string({
        required_error: 'Budget is required',
      })
      .optional(),
    income: z
      .string({
        required_error: 'Income is required',
      })
      .optional(),
  }),
});

export const SellerValidation = {
  updateSellerZodSchema,
};
