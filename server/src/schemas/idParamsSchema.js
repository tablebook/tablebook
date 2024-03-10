import { z } from "zod";

const mongoIdSchema = z
  .string()
  .refine((value) => /^[0-9a-fA-F]{24}$/.test(value), {
    message: "Invalid MongoDB id",
  });

const idParamsSchema = z.object({
  id: mongoIdSchema,
});

export default idParamsSchema;
