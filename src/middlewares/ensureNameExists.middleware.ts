import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities/movie.entity";
import { AppError } from "../errors";

export const ensureNameExistsMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  
  if (!request.body.name) {
    return next();
  }

  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
  const movie = await movieRepository.findOne({
    where: {
      name: request.body.name,
    },
  });

  if (movie) {
    throw new AppError("Movie already exists.", 409);
  }

  if (request.body.name) {
    return next()
  }
  
  if (request.params.id && movie!.id === Number(request.params.id)) {
    return next();
  }

  return next();
};
