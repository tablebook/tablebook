import { z } from "zod";

const signatureSchema = z.object({
  signer: z.string(),
  timestamp: z.string().datetime(),
  image: z.string(),
});

export default signatureSchema;
