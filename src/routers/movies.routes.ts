import { Router } from "express";
import { createMovieController, deleteMovieController, listMovieController, updateMovieController } from "../controllers/movies.controller";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { ensureMovieExistsMiddleware } from "../middlewares/ensureMovieExists.middleware";
import { ensureNameExistsMiddleware } from "../middlewares/ensureNameExists.middleware";
import { createMovieSchema, movieUpdateSchema } from "../schemas/movie.schemas";

export const movieRoutes: Router = Router();

movieRoutes.post("", ensureDataIsValidMiddleware(createMovieSchema), ensureNameExistsMiddleware, createMovieController);
movieRoutes.get("", listMovieController);
movieRoutes.patch("/:id", ensureDataIsValidMiddleware(movieUpdateSchema), ensureMovieExistsMiddleware, ensureNameExistsMiddleware, updateMovieController);
movieRoutes.delete("/:id", ensureMovieExistsMiddleware, deleteMovieController);
