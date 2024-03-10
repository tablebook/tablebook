import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

const errorHandler = (error, request, response, next) => {
  if (error instanceof ZodError) {
    const validationError = fromZodError(error);
    response.status(400).json({ error: validationError.toString() });
  }

  if (error instanceof Error) {
    response.status(500).json({ error: "Unexpected error occured" });
    console.error("Unexpected Error", { error });
  }

  next(error);
};

export default errorHandler;
