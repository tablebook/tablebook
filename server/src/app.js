import "express-async-errors";
import express from "express";
import helmet from "helmet";
import path from "path";
import fs from "fs";

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

app.get("/api/healthz", (request, response) => response.sendStatus(200));

app.use(errorHandler);

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
