import supertest from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../app.js";
import dummyMinutes from "../../data/dummyMinutes.json";
import Minutes from "../entities/minutes.js";
import { createJwt } from "../controllers/minutesController.helpers.js";

describe("minutesApi", () => {
  const baseUrl = "/api/minutes";
  const api = supertest(app);
  let mongoDbServer; // Virtual/In-memory mongodb server for running tests without external dependencies
  let minutesInDb;

  const validNonExistentId = "65edcc9eb413f592f45351b1";
  const invalidId = "65edcc9e";

  beforeAll(async () => {
    mongoDbServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoDbServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoDbServer.stop();
  });

  beforeEach(async () => {
    minutesInDb = (await Minutes.create(dummyMinutes)).toJSON();
  });

  afterEach(async () => {
    await Minutes.deleteMany({});
  });

  const getTokenWithoutWriteAccess = (id) => createJwt(id, false);
  const getTokenWithWriteAccess = (id) => createJwt(id, true);

  describe("get", () => {
    it("should responds with 200, minutes and writeAccess when token (without writeAccess) is valid and minutes are found", async () => {
      const token = getTokenWithoutWriteAccess(minutesInDb.id);
      const response = await api.get(`${baseUrl}/${token}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(expect.objectContaining(dummyMinutes));
      expect(response.body.writeAccess).toBe(false);
    });

    it("should responds with 200, minutes and writeAccess when token (with writeAccess) is valid and minutes are found", async () => {
      const token = getTokenWithWriteAccess(minutesInDb.id);
      const response = await api.get(`${baseUrl}/${token}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(expect.objectContaining(dummyMinutes));
      expect(response.body.writeAccess).toBe(true);
    });

    it("should respond with 404 and error message when id doesn't exist in the database", async () => {
      const token = getTokenWithWriteAccess(validNonExistentId);
      const response = await api.get(`${baseUrl}/${token}`);

      expect(response.status).toBe(404);
      expect(response.body.error).toEqual(
        "Minutes not found with the given token",
      );
    });

    it("should respond with 400 and validation error message when id isn't a valid mongodb id (hexadecimal value with 24 characters)", async () => {
      const response = await api.get(`${baseUrl}/${invalidId}`);

      expect(response.status).toBe(400);
      expect(response.body.error).toEqual("Token invalid or missing");
    });
  });

  describe("post", () => {
    it("should respond with 200 and the created minutes when given valid minutes object", async () => {
      const response = await api.post(`${baseUrl}/`).send(dummyMinutes);

      expect(response.status).toBe(201);
      expect(response.body.data).toEqual(expect.objectContaining(dummyMinutes));
      expect(response.body.readToken).toBeDefined();
      expect(response.body.writeToken).toBeDefined();
    });

    it("should respond with 400 and validation error message when given invalid minutes object in request body", async () => {
      const response = await api
        .post(`${baseUrl}/`)
        .send({ ...dummyMinutes, name: undefined });

      expect(response.status).toBe(400);
      expect(response.body.error).toEqual(
        'Validation error: Required at "name"',
      );
    });
  });

  describe("put", () => {
    it("should respond with 200 and the updated minutes when given valid id and minutes body", async () => {
      const token = getTokenWithWriteAccess(minutesInDb.id);
      const updatedMinutes = { ...dummyMinutes, name: "updated minutes" };

      const response = await api
        .put(`${baseUrl}/${token}`)
        .send(updatedMinutes);

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(
        expect.objectContaining(updatedMinutes),
      );
    });

    it("should respond with 400 and error message when given invalid id (hexadecimal value with 24 characters)", async () => {
      const token = getTokenWithWriteAccess(invalidId);
      const response = await api
        .put(`${baseUrl}/${token}`)
        .send({ ...dummyMinutes, name: "updated minutes" });

      expect(response.status).toBe(400);
      expect(response.body.error).toEqual("Token invalid or missing");
    });

    it("should respond with 400 and error message when given invalid body", async () => {
      const token = getTokenWithWriteAccess(minutesInDb.id);
      const response = await api
        .put(`${baseUrl}/${token}`)
        .send({ ...dummyMinutes, name: undefined });

      expect(response.status).toBe(400);
      expect(response.body.error).toEqual(
        'Validation error: Required at "name"',
      );
    });

    it("should respond with 404 and error message when id doesn't exist in the database", async () => {
      const token = getTokenWithWriteAccess(validNonExistentId);
      const response = await api
        .put(`${baseUrl}/${token}`)
        .send({ ...dummyMinutes, name: "updated minutes" });

      expect(response.status).toBe(404);
      expect(response.body.error).toEqual(
        "Minutes not found with the given token",
      );
    });

    it("should respond with 401 when writeAccess is false in the token", async () => {
      const token = getTokenWithoutWriteAccess(minutesInDb.id);
      const response = await api.put(`${baseUrl}/${token}`);

      expect(response.status).toBe(401);
    });
  });

  describe("delete", () => {
    it("should respond with 200 and the deleted minutes when given valid id", async () => {
      const token = getTokenWithWriteAccess(minutesInDb.id);
      const response = await api.delete(`${baseUrl}/${token}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(expect.objectContaining(dummyMinutes));
    });

    it("should respond with 400 and validation error message when id isn't a valid mongodb id (hexadecimal value with 24 characters)", async () => {
      const response = await api.delete(`${baseUrl}/${invalidId}`);

      expect(response.status).toBe(400);
      expect(response.body.error).toEqual("Token invalid or missing");
    });

    it("should respond with 404 and error message when id doesn't exist in the database", async () => {
      const token = getTokenWithWriteAccess(validNonExistentId);
      const response = await api.delete(`${baseUrl}/${token}`);

      expect(response.status).toBe(404);
      expect(response.body.error).toEqual(
        "Minutes not found with the given token",
      );
    });

    it("should respond with 401 when writeAccess is false in the token", async () => {
      const token = getTokenWithoutWriteAccess(minutesInDb.id);
      const response = await api.delete(`${baseUrl}/${token}`);

      expect(response.status).toBe(401);
    });
  });
});
