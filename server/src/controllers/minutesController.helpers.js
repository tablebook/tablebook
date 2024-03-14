import jwt from "jsonwebtoken";

import tokenSchema from "../schemas/tokenSchema.js";
import environment from "../utils/environment.js";
import { TokenError } from "../utils/errors.js";

export const sendMinutesNotFound = (response) =>
  response
    .status(404)
    .json({ error: "Minutes not found with the given token" });

export const createJwt = (id, writeAccess) => {
  const tokenContent = { id, writeAccess };
  const token = jwt.sign(tokenContent, environment.secret);

  return token;
};

export const parseJwt = async (token) => {
  try {
    const decodedToken = jwt.verify(token, environment.secret);
    const parsedToken = await tokenSchema.parseAsync(decodedToken);

    return parsedToken;
  } catch (error) {
    throw new TokenError(error.message);
  }
};
