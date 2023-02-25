import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

export const ensureDataIsValidMiddleware =
  (schema: ZodTypeAny) =>
  (request: Request, response: Response, next: NextFunction) => {
    const movieData = request.body;

    const validatedData = schema.parse(movieData);

    request.body = validatedData;

    return next();
  };
