import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities/movie.entity";
import { AppError } from "../errors";
import { IMoviePartial, IMovieReturn } from "../interfaces/movie.interface";
import { returnMovieSchema } from "../schemas/movie.schemas";

export const updateMovieService = async (
  movieData: IMoviePartial,
  movieId: number
): Promise<IMovieReturn> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
  const oldMovieData = await movieRepository.findOneBy({
    id: movieId,
  });

  if (oldMovieData?.name === movieData.name) {
    throw new AppError("Movie already exists.", 409);
  }

  const movie = movieRepository.create({
    ...oldMovieData,
    ...movieData,
  });

  await movieRepository.save(movie);

  const updatedMovie = returnMovieSchema.parse(movie);

  return updatedMovie;
};
