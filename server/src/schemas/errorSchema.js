import { z } from "zod";

const errorSchema = z.object({
  error: z.string().openapi({
    description: "Detailed error message",
    example: "Token invalid or missing",
  }),
});

export default errorSchema;
