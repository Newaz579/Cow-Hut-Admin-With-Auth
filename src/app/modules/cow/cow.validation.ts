import { z } from 'zod';

const createCowZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    age: z.string({
      required_error: 'Age is required',
    }),
    price: z.string({
      required_error: 'Price is required',
    }),
    location: z.string({
      required_error: 'Location is required',
    }),
    breed: z.string({
      required_error: 'Breed is required',
    }),
    weight: z.string({
      required_error: 'Weight is required',
    }),
    label: z.string({
      required_error: 'Level is required',
    }),
    category: z.string({
      required_error: 'Category is required',
    }),
    seller: z.string({
      required_error: 'Seller is required',
    }),
  }),
});
const updateCowZodSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .optional(),
    age: z
      .string({
        required_error: 'Age is required',
      })
      .optional(),
    price: z
      .string({
        required_error: 'Price is required',
      })
      .optional(),
    location: z
      .string({
        required_error: 'Location is required',
      })
      .optional(),
    breed: z
      .string({
        required_error: 'Breed is required',
      })
      .optional(),
    weight: z
      .string({
        required_error: 'Weight is required',
      })
      .optional(),
    label: z
      .string({
        required_error: 'Level is required',
      })
      .optional(),
    category: z
      .string({
        required_error: 'Category is required',
      })
      .optional(),
    seller: z
      .string({
        required_error: 'Seller is required',
      })
      .optional(),
  }),
});

export const cowValidation = {
  createCowZodSchema,
  updateCowZodSchema,
};
