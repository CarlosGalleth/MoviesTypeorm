import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities/movie.entity";
import { AppError } from "../errors";

export const ensureMovieExistsMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
  const movie = await movieRepository.exist({
    where: {
        id: Number(request.params.id)
    }
  })

  if (!movie) {
    throw new AppError("Movie not found", 404)
  }

  return next()
}