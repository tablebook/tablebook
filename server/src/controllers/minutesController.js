import { Router as createRouter } from "express";
import minutesService from "../services/minutesService.js";
import minutesSchema from "../schemas/minutesSchema.js";
import idParamsSchema from "../schemas/idParamsSchema.js";

const minutesController = createRouter();

const sendMinutesNotFound = (response) =>
  response.status(404).json({ error: "Minutes not found with the given id" });

minutesController.get("/:id", async (request, response) => {
  const { id } = await idParamsSchema.parseAsync(request.params);

  const minutes = await minutesService.getMinutesById(id);

  if (!minutes) {
    sendMinutesNotFound(response);
  }

  return response.json(minutes);
});

minutesController.post("/", async (request, response) => {
  const minutesBody = await minutesSchema.parseAsync(request.body);

  const createdMinutes = await minutesService.createMinutes(minutesBody);

  return response.json(createdMinutes);
});

minutesController.put("/:id", async (request, response) => {
  const { id } = await idParamsSchema.parseAsync(request.params);
  const minutesBody = await minutesSchema.parseAsync(request.body);

  const updatedMinutes = await minutesService.updateMinutes(id, minutesBody);

  if (!updatedMinutes) {
    sendMinutesNotFound(response);
  }

  return response.json(updatedMinutes);
});

minutesController.delete("/:id", async (request, response) => {
  const { id } = await idParamsSchema.parseAsync(request.params);
  const deletedMinutes = await minutesService.deleteMinutesById(id);

  if (!deletedMinutes) {
    sendMinutesNotFound(response);
  }

  return response.json(deletedMinutes);
});

export default minutesController;
