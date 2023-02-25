import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities/movie.entity";
import { IMovieReturn, IMovieUpdate } from "../interfaces/movie.interface";
import { returnMovieSchema } from "../schemas/movie.schemas";

export const updateMovieService = async (movieData: any, movieId: number): Promise<IMovieReturn> => {
    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
    const oldMovieData = await movieRepository.findOne({
        where: {
            id: movieId
        }
    })

    const movie = movieRepository.create({
        ...oldMovieData,
        ...movieData
    })

    await movieRepository.save(movie)

    const updatedMovie = returnMovieSchema.parse(movie)

    return updatedMovie
}