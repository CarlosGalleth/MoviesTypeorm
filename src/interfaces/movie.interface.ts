import { z } from "zod";
import {
  createMovieSchema,
  movieUpdateSchema,
  returnMovieSchema,
  returnMultipleMovieSchema,
} from "../schemas/movie.schemas";

export type IMovie = z.infer<typeof createMovieSchema>;
export type IMovieReturn = z.infer<typeof returnMovieSchema>;
export type IMoviesReturn = z.infer<typeof returnMultipleMovieSchema>;
export type IMovieUpdate = z.infer<typeof movieUpdateSchema>
