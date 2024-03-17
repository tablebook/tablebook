import "express-async-errors";
import express from "express";
import helmet from "helmet";
import path from "path";

import minutesController from "./controllers/minutesController.js";
import errorHandler from "./utils/errorHandler.js";

const app = express();

app.use(helmet());

app.use(express.json());

app.use("/api/minutes", minutesController);

app.use(errorHandler);

app.get("/api/*", (req, res) => {
  res.status(404).json({ error: "API route not found" });
});

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "client", "dist", "index.html"),
  );
});

export default app;
