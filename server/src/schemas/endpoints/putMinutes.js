import { z } from "zod";
import { registry } from "../../utils/openapi.js";

import minutesSchema from "../minutesSchema.js";
import errorSchema from "../errorSchema.js";
import { tokenSchema } from "../metadataSchemas.js";

export const putMinutesRequestParamsSchema = z.object({
  token: tokenSchema,
});

export const putMinutesRequestBodySchema = minutesSchema;

export const putMinutesResponseBodySchema = z.object({
  data: minutesSchema,
});

registry.registerPath({
  method: "put",
  path: "/api/minutes/{token}",
  summary: "Update minutes by token",
  request: {
    params: putMinutesRequestParamsSchema,
    body: {
      content: { "application/json": { schema: putMinutesResponseBodySchema } },
    },
  },
  responses: {
    200: {
      description: "Minutes updated successfully",
      content: {
        "application/json": {
          schema: putMinutesResponseBodySchema,
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
    401: {
      description: "No write access",
    },
    404: {
      description: "Minutes not found",
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
