import { z } from 'zod';

const updateBuyerZodSchema = z.object({
  body: z.object({
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
  }),
});

export const BuyerValidation = {
  updateBuyerZodSchema,
};
