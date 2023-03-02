import { Request } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities/movie.entity";
import { IMoviesReturn } from "../interfaces/movie.interface";
import { returnMultipleMovieSchema } from "../schemas/movie.schemas";

export const listMoviesService = async (page: any, perPage: any) => {
  let take: number = Number(perPage) || 5;
  let skip: number = Number(page) || 1;

  if (take > 5 || take < 1) {
    take = 5;
  }
  if (skip < 1) {
    skip = 1;
  }

  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
  const findMovies: Array<Movie> = await movieRepository.find({
    skip: take * (skip - 1),
    take: take,
    order: {
      id: "ASC",
    },
  });
  const movies = returnMultipleMovieSchema.parse(findMovies);

  const findAllMovies: Array<Movie> = await movieRepository.find();
  const pages: number = Math.ceil(findAllMovies.length / take);
  if (skip > pages) {
    skip = pages;
  }

  const prevPage: string | null =
    skip - 1 === 0
      ? null
      : `http://localhost:3000/movies?page=${skip - 1}&perPage=${take}`;
  const nextPage: string | null =
    skip === pages || skip > pages
      ? null
      : `http://localhost:3000/movies?page=${skip + 1}&perPage=${take}`;

  const listMoviesResult = {
    prevPage: prevPage,
    nextPage: nextPage,
    count: findAllMovies.length,
    data: movies,
  };

  return listMoviesResult;
};
