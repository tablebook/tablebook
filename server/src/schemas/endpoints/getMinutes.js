import { z } from "zod";
import { registry } from "../../utils/openapi.js";

import minutesSchema from "../minutesSchema.js";
import errorSchema from "../errorSchema.js";
import {
  readTokenSchema,
  tokenSchema,
  writeTokenSchema,
} from "../metadataSchemas.js";

export const getMinutesRequestParamsSchema = z.object({
  token: tokenSchema,
});

export const getMinutesResponseBodySchema = z.object({
  data: minutesSchema,
  readToken: readTokenSchema,
  writeToken: writeTokenSchema,
});

registry.registerPath({
  method: "get",
  path: "/api/minutes/{token}",
  summary: "Fetch minutes by token",
  request: {
    params: getMinutesRequestParamsSchema,
  },
  responses: {
    200: {
      description: "Minutes fetched successfully",
      content: {
        "application/json": {
          schema: getMinutesResponseBodySchema,
        },
      },
    },
    400: {
      description: "Invalid token",
      content: {
        "application/json": {
          schema: errorSchema,
        },
      },
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
