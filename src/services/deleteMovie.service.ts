import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities/movie.entity";

export const deleteMovieService = async (movieId: number): Promise<void> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
  const movie = await movieRepository.findOne({
    where: {
      id: movieId,
    },
  });
  await movieRepository.remove(movie!);
};
