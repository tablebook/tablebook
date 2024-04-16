import { z } from "zod";
import dummyMetadata from "../../data/dummyMetadata.json";

export const tokenSchema = z.string().openapi({
  description: "Token for fetching minutes",
  example: dummyMetadata.readToken,
});

export const readTokenSchema = z.string().openapi({
  description: "Token to fetch minutes with read-only access",
  example: dummyMetadata.readToken,
});

export const writeTokenSchema = z
  .string()
  .optional()
  .openapi({
    description: "Token to fetch minutes with write access",
    examples: [dummyMetadata.writeToken, undefined],
  });
