import "express-async-errors";
import express from "express";
import helmet from "helmet";
import path from "path";
import fs from "fs";
import swaggerUi from "swagger-ui-express";

import { OpenApiGeneratorV31 } from "@asteasolutions/zod-to-openapi";
import { registry } from "./utils/openapi.js";
import minutesController from "./controllers/minutesController.js";
import errorHandler from "./utils/errorHandler.js";

const clientDistPath = path.join(__dirname, "..", "..", "client", "dist");

const clientIndexPath = path.join(clientDistPath, "index.html");

const app = express();

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", "data:"], // Allows src from data:*
      scriptSrc: ["'self'", "'unsafe-eval'"], // Allows WASM
      frameSrc: ["'self'", "blob:"], // Allows iframe source from blob:*
    },
  }),
);

app.use(express.json());

app.use(express.static(clientDistPath));

app.use("/api/minutes", minutesController);

app.get("/api/healthz", (request, response) => {
  console.log("Health check successful");
  return response.sendStatus(200);
});

app.use(errorHandler);

const generator = new OpenApiGeneratorV31(registry.definitions);

const openapiDocs = generator.generateDocument({
  openapi: "3.1.0",
  info: {
    title: "Minutes API",
    description: "Used for storing, fetching, updating and deleting minutes",
  },
});

app.use("/api", swaggerUi.serve, swaggerUi.setup(openapiDocs));

app.get("/api/*", (req, res) => {
  return res.status(404).json({ error: "API route not found" });
});

app.get("*", (req, res) => {
  if (!fs.existsSync(clientIndexPath)) {
    console.error(`Client not found in "${clientIndexPath}"`);
    return res.json({ error: "Client files not found" });
  }
  return res.sendFile(clientIndexPath);
});

export default app;
