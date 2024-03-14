import { Router as createRouter } from "express";

import minutesService from "../services/minutesService.js";
import minutesSchema from "../schemas/minutesSchema.js";
import {
  createJwt,
  parseJwt,
  sendMinutesNotFound,
} from "./minutesController.helpers.js";

const minutesController = createRouter();

minutesController.get("/:token", async (request, response) => {
  const { token } = request.params;
  const { id, writeAccess } = await parseJwt(token);

  const minutes = await minutesService.getMinutesById(id);

  if (!minutes) {
    return sendMinutesNotFound(response);
  }

  const responseBody = { data: minutes, writeAccess };

  return response.json(responseBody);
});

minutesController.post("/", async (request, response) => {
  const minutesBody = await minutesSchema.parseAsync(request.body);

  const createdMinutes = await minutesService.createMinutes(minutesBody);

  const readToken = createJwt(createdMinutes.id, false);
  const writeToken = createJwt(createdMinutes.id, true);

  const responseBody = { data: createdMinutes, readToken, writeToken };

  return response.status(201).json(responseBody);
});

minutesController.put("/:token", async (request, response) => {
  const { token } = request.params;
  const { id, writeAccess } = await parseJwt(token);

  if (!writeAccess) {
    return response.sendStatus(401);
  }

  const minutesBody = await minutesSchema.parseAsync(request.body);

  const updatedMinutes = await minutesService.updateMinutes(id, minutesBody);

  if (!updatedMinutes) {
    return sendMinutesNotFound(response);
  }

  const responseBody = { data: updatedMinutes };

  return response.json(responseBody);
});

minutesController.delete("/:token", async (request, response) => {
  const { token } = request.params;
  const { id, writeAccess } = await parseJwt(token);

  if (!writeAccess) {
    return response.sendStatus(401);
  }

  const deletedMinutes = await minutesService.deleteMinutesById(id);

  if (!deletedMinutes) {
    return sendMinutesNotFound(response);
  }

  const responseBody = { data: deletedMinutes };

  return response.json(responseBody);
});

export default minutesController;
