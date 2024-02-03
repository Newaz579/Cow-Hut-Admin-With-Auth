import { z } from 'zod';
const updateAdminZodSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z
          .string({
            required_error: 'First Name is Required',
          })
          .optional(),
        lastName: z
          .string({
            required_error: 'Last Name is Required',
          })
          .optional(),
      })
      .optional(),
    address: z
      .string({
        required_error: 'Address is Required',
      })
      .optional(),
  }),
});

export const AdminValidation = {
  updateAdminZodSchema,
};
