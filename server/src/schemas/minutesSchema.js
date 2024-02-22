import { z } from "zod";
import segmentSchema from "./segmentSchema.js";
import signatureSchema from "./signatureSchema.js";

const minutesSchema = (enforceId = true) =>
  z.object({
    name: z.string(),
    ...(enforceId && { id: z.string().uuid() }),
    color: z.string(),
    segments: z.array(segmentSchema),
    startTime: z.string().datetime(),
    signature: z.array(signatureSchema),
  });

export default minutesSchema;
