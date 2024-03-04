import { Router as createRouter } from "express";

import minutesService from "../services/minutesService.js";
import minutesSchema from "../schemas/minutesSchema.js";

const minutesController = createRouter();

minutesController.get("/:id", async (request, response) => {
  const { id } = request.params;

  const minutes = await minutesService.getMinutesById(id);

  return response.json(minutes);
});

minutesController.post("/", async (request, response) => {
  const minutesBody = minutesSchema.parse(request.body);

  const createdMinutes = await minutesService.createMinutes(minutesBody);

  return response.json(createdMinutes);
});

minutesController.put("/:id", async (request, response) => {
  const { id } = request.params;
  const minutesBody = minutesSchema.parse(request.body);

  const updatedMinutes = await minutesService.updateMinutes(id, minutesBody);

  return response.json(updatedMinutes);
});

minutesController.delete("/:id", async (request, response) => {
  const { id } = request.params;

  const deletedMinutes = await minutesService.deleteMinutesById(id);

  return response.json(deletedMinutes);
});

export default minutesController;
