import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities/movie.entity";
import { AppError } from "../errors";

export const ensureNameExistsMiddleware = async (request: Request, response: Response, next: NextFunction) => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
  const movie = await movieRepository.findOne({
    where: {
      name: request.body.name,
    },
  });

  if (movie) {
    throw new AppError("Movie already exists.", 409);
  }

  return next()
};
