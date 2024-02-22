import { z } from "zod";

const segmentSchema = z.object({
  name: z.string(),
  content: z.array(z.string()),
});

export default segmentSchema;
