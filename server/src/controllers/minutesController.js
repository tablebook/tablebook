import { Router as createRouter } from "express";

import minutesService from "../services/minutesService.js";
import {
  createJwt,
  parseJwt,
  sendMinutesNotFound,
} from "./minutesController.helpers.js";
import {
  getMinutesRequestParamsSchema,
  getMinutesResponseBodySchema,
} from "../schemas/endpoints/getMinutes.js";
import {
  postMinutesRequestBodySchema,
  postMinutesResponseBodySchema,
} from "../schemas/endpoints/postMinutes.js";
import { ResponseParsingError } from "../utils/errors.js";
import {
  putMinutesRequestBodySchema,
  putMinutesRequestParamsSchema,
  putMinutesResponseBodySchema,
} from "../schemas/endpoints/putMinutes.js";
import {
  deleteMinutesRequestParamsSchema,
  deleteMinutesResponseBodySchema,
} from "../schemas/endpoints/deleteMinutes.js";

const minutesController = createRouter();

minutesController.get("/:token", async (request, response, next) => {
  const { token } = await getMinutesRequestParamsSchema.parseAsync(
    request.params,
  );
  const { id, writeAccess } = await parseJwt(token);

  const minutes = await minutesService.getMinutesById(id);

  if (!minutes) {
    return sendMinutesNotFound(response);
  }

  const readToken = createJwt(minutes.id, false);
  const writeToken = writeAccess ? createJwt(minutes.id, true) : undefined;

  const parsedResponseBody = getMinutesResponseBodySchema.safeParse({
    data: minutes,
    readToken,
    writeToken,
  });

  if (!parsedResponseBody.success) {
    return next(
      new ResponseParsingError(
        `Get response parsing failed, ${parsedResponseBody.error}`,
      ),
    );
  }

  return response.json(parsedResponseBody.data);
});

minutesController.post("/", async (request, response, next) => {
  const minutesBody = await postMinutesRequestBodySchema.parseAsync(
    request.body,
  );

  const createdMinutes = await minutesService.createMinutes(minutesBody);

  const readToken = createJwt(createdMinutes.id, false);
  const writeToken = createJwt(createdMinutes.id, true);

  const parsedResponseBody = postMinutesResponseBodySchema.safeParse({
    data: createdMinutes,
    readToken,
    writeToken,
  });

  if (!parsedResponseBody.success) {
    return next(
      new ResponseParsingError(
        `Post response parsing failed, ${parsedResponseBody.error}`,
      ),
    );
  }

  return response.status(201).json(parsedResponseBody.data);
});

minutesController.put("/:token", async (request, response, next) => {
  const { token } = await putMinutesRequestParamsSchema.parseAsync(
    request.params,
  );
  const { id, writeAccess } = await parseJwt(token);

  if (!writeAccess) {
    return response.sendStatus(401);
  }

  const minutesBody = await putMinutesRequestBodySchema.parseAsync(
    request.body,
  );

  const updatedMinutes = await minutesService.updateMinutes(id, minutesBody);

  if (!updatedMinutes) {
    return sendMinutesNotFound(response);
  }

  const parsedResponseBody = putMinutesResponseBodySchema.safeParse({
    data: updatedMinutes,
  });

  if (!parsedResponseBody.success) {
    return next(
      new ResponseParsingError(
        `Post response parsing failed, ${parsedResponseBody.error}`,
      ),
    );
  }

  return response.json(parsedResponseBody.data);
});

minutesController.delete("/:token", async (request, response, next) => {
  const { token } = await deleteMinutesRequestParamsSchema.parseAsync(
    request.params,
  );
  const { id, writeAccess } = await parseJwt(token);

  if (!writeAccess) {
    return response.sendStatus(401);
  }

  const deletedMinutes = await minutesService.deleteMinutesById(id);

  if (!deletedMinutes) {
    return sendMinutesNotFound(response);
  }

  const parsedResponseBody = deleteMinutesResponseBodySchema.safeParse({
    data: deletedMinutes,
  });

  if (!parsedResponseBody.success) {
    return next(
      new ResponseParsingError(
        `Delete response parsing failed, ${parsedResponseBody.error}`,
      ),
    );
  }

  return response.json(parsedResponseBody.data);
});

export default minutesController;
