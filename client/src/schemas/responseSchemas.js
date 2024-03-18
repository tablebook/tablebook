import { z } from "zod";
import minutesSchema from "./minutesSchema";

export const getMinutesResponseSchema = z.object({
  data: minutesSchema,
  writeAccess: z.boolean(),
});

export const postMinutesResponseSchema = z.object({
  data: minutesSchema,
  readToken: z.string(),
  writeToken: z.string(),
});

export const putMinutesResponseSchema = z.object({
  data: minutesSchema,
});

export const deleteMinutesResponseSchema = z.object({
  data: minutesSchema,
});
