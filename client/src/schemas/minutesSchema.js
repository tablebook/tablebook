import { z } from "zod";

const segmentSchema = z.object({
  name: z.string(),
  content: z.string(),
});

const signatureSchema = z.object({
  signer: z.string(),
  timestamp: z.string().datetime().nullable(),
  image: z.string().nullable(),
});

const minutesSchema = z.object({
  name: z.string(),
  colors: z.object({
    primary: z.string(),
    secondary: z.string(),
  }),
  segments: z.array(segmentSchema),
  startTime: z.string().datetime().nullable(),
  signatures: z.array(signatureSchema),
});

export default minutesSchema;
