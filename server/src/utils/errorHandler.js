import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { ResponseParsingError, TokenError } from "./errors.js";

const errorHandler = (error, request, response, next) => {
  if (error instanceof ZodError) {
    const validationError = fromZodError(error);
    return response.status(400).json({ error: validationError.toString() });
  }

  if (error instanceof TokenError) {
    return response.status(400).json({ error: "Token invalid or missing" });
  }

  if (error instanceof ResponseParsingError) {
    console.error(error);
    return response.status(500).json({ error: "Unexpected error occured" });
  }

  if (error instanceof Error) {
    console.error("Unexpected Error", { error });
    return response.status(500).json({ error: "Unexpected error occured" });
  }

  return next(error);
};

export default errorHandler;
