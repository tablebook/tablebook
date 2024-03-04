import express from "express";
import minutesController from "./controllers/minutesController.js";

const app = express();

app.use(express.json());

app.use("/api/minutes", minutesController);

export default app;
