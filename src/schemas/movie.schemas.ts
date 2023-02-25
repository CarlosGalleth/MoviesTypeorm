import { z } from "zod";

export const createMovieSchema = z.object({
  name: z.string().max(50),
  description: z.string().nullable().optional(),
  duration: z.number(),
  price: z.number(),
});

export const returnMovieSchema = createMovieSchema.extend({
  id: z.number(),
});

export const movieUpdateSchema = createMovieSchema.partial();

export const returnMultipleMovieSchema = returnMovieSchema.array();
