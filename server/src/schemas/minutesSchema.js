import { z } from "zod";
import segmentSchema from "./segmentSchema.js";
import signatureSchema from "./signatureSchema.js";

const minutesSchema = z.object({
  name: z.string(),
  color: z.string(),
  segments: z.array(segmentSchema),
  startTime: z.string().datetime(),
  signatures: z.array(signatureSchema),
});

export default minutesSchema;
