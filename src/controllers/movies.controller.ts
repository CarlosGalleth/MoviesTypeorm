import { Request, Response } from "express";
import { IMovie } from "../interfaces/movie.interface";
import { createMovieService } from "../services/createMovie.service";
import { deleteMovieService } from "../services/deleteMovie.service";
import { listMoviesService } from "../services/listMovies.service";
import { updateMovieService } from "../services/updateMovie.service";

export const createMovieController = async (
  request: Request,
  response: Response
) => {
  const movieData: IMovie = request.body;
  const newMovie = await createMovieService(movieData);
  return response.status(201).json(newMovie);
};

export const listMovieController = async (
  request: Request,
  response: Response
) => {
  const { page, perPage, a } = request.query;
  const movies = await listMoviesService(page, perPage);
  return response.json(movies);
};

export const updateMovieController = async (
  request: Request,
  response: Response
) => {
  const movieId: number = Number(request.params.id);
  const updatedMovie = await updateMovieService(request.body, movieId);
  return response.json(updatedMovie);
};

export const deleteMovieController = async (
  request: Request,
  response: Response
) => {
  const movieId: number = Number(request.params.id);
  await deleteMovieService(movieId);
  return response.status(204).send();
};
