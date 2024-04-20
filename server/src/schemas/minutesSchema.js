import { z } from "zod";
import "../utils/openapi.js";
import dummyMinutes from "../../data/dummyMinutes.json";

const segmentSchema = z.object({
  id: z
    .string()
    .uuid()
    .min(1)
    .openapi({ examples: dummyMinutes.segments.map((segment) => segment.id) }),
  name: z.string().openapi({
    examples: dummyMinutes.segments.map((segment) => segment.name),
  }),
  content: z.string().openapi({
    examples: dummyMinutes.segments.map((segment) => segment.content),
  }),
});

const signatureSchema = z.object({
  id: z
    .string()
    .uuid()
    .min(1)
    .openapi({
      examples: dummyMinutes.signatures.map((signature) => signature.id),
    }),
  signer: z.string().openapi({
    examples: dummyMinutes.signatures.map((signature) => signature.signer),
  }),
  timestamp: z
    .string()
    .datetime()
    .or(z.date().transform((date) => date.toISOString()))
    .nullable()
    .openapi({
      examples: dummyMinutes.signatures.map((signature) => signature.timestamp),
    }),
  image: z
    .string()
    .nullable()
    .openapi({
      examples: dummyMinutes.signatures.map((signature) => signature.image),
    }),
});

const minutesSchema = z
  .object({
    name: z.string().openapi({ examples: [dummyMinutes.name, ""] }),
    colors: z.object({
      primary: z.string().openapi({ example: dummyMinutes.colors.primary }),
      secondary: z.string().openapi({ example: dummyMinutes.colors.secondary }),
    }),
    segments: z.array(segmentSchema),
    startTime: z
      .string()
      .datetime()
      .or(z.date().transform((date) => date.toISOString()))
      .nullable()
      .openapi({ examples: [dummyMinutes.startTime, null] }),
    signatures: z.array(signatureSchema),
  })
  .openapi("Minutes");

export default minutesSchema;
