import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities/movie.entity";
import { IMoviesReturn } from "../interfaces/movie.interface";
import { returnMultipleMovieSchema } from "../schemas/movie.schemas";

export const listMoviesService = async (): Promise<IMoviesReturn> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
  const findMovies: Array<Movie> = await movieRepository.find();
  const movies = returnMultipleMovieSchema.parse(findMovies);
  return movies;
};
