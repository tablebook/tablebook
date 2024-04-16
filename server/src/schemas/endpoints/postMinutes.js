import { z } from "zod";
import { registry } from "../../utils/openapi.js";

import minutesSchema from "../minutesSchema.js";
import errorSchema from "../errorSchema.js";
import { readTokenSchema, writeTokenSchema } from "../metadataSchemas.js";

export const postMinutesRequestBodySchema = minutesSchema;

export const postMinutesResponseBodySchema = z.object({
  data: minutesSchema,
  readToken: readTokenSchema,
  writeToken: writeTokenSchema,
});

registry.registerPath({
  method: "post",
  path: "/api/minutes",
  summary: "Save minutes",
  request: {
    body: {
      content: { "application/json": { schema: postMinutesRequestBodySchema } },
    },
  },
  responses: {
    201: {
      description: "Minutes saved successfully",
      content: {
        "application/json": {
          schema: postMinutesResponseBodySchema,
        },
      },
    },
    400: {
      description: "Validation error",
      content: {
        "application/json": {
          schema: errorSchema,
        },
      },
    },
    500: {
      description: "Unexpected server error",
      content: {
        "application/json": {
          schema: errorSchema,
        },
      },
    },
  },
});
