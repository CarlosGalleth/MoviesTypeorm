import { IMovie, IMovieReturn } from "../interfaces/movie.interface";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities/movie.entity";
import { returnMovieSchema } from "../schemas/movie.schemas";
export const createMovieService = async (
  movieData: IMovie
): Promise<IMovieReturn> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
  const movie: Movie = movieRepository.create(movieData);
  await movieRepository.save(movie);
  const newMovie = returnMovieSchema.parse(movie);

  return newMovie;
};
