import {
  OpenAPIRegistry,
  extendZodWithOpenApi,
} from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

// eslint-disable-next-line import/prefer-default-export
export const registry = new OpenAPIRegistry();
