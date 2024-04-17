import { z } from "zod";
import { registry } from "../../utils/openapi.js";

import minutesSchema from "../minutesSchema.js";
import errorSchema from "../errorSchema.js";
import { tokenSchema } from "../metadataSchemas.js";

export const deleteMinutesRequestParamsSchema = z.object({
  token: tokenSchema,
});

export const deleteMinutesResponseBodySchema = z.object({
  data: minutesSchema,
});

registry.registerPath({
  method: "delete",
  path: "/api/minutes/{token}",
  summary: "Delete minutes by token",
  request: {
    params: deleteMinutesRequestParamsSchema,
  },
  responses: {
    200: {
      description: "Minutes deleted successfully",
      content: {
        "application/json": {
          schema: deleteMinutesResponseBodySchema,
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
