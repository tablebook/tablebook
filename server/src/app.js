import "express-async-errors";
import express from "express";
import helmet from "helmet";

import minutesController from "./controllers/minutesController.js";
import errorHandler from "./utils/errorHandler.js";

const app = express();

app.use(helmet());

app.use(express.json());

app.use("/api/minutes", minutesController);

app.use(errorHandler);

export default app;
