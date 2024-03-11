import supertest from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../app.js";
import dummyMinutes from "../../data/dummyMinutes.json";
import Minutes from "../entities/minutes.js";

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

  describe("get", () => {
    it("should responds with 200 and minutes body when id is valid and minutes are found", async () => {
      const response = await api.get(`${baseUrl}/${minutesInDb.id}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining(dummyMinutes));
    });

    it("should respond with 404 and error message when id doesn't exist in the database", async () => {
      const response = await api.get(`${baseUrl}/${validNonExistentId}`);
      expect(response.status).toBe(404);
      expect(response.body.error).toEqual(
        "Minutes not found with the given id",
      );
    });

    it("should respond with 400 and validation error message when id isn't a valid mongodb id (hexadecimal value with 24 characters)", async () => {
      const response = await api.get(`${baseUrl}/${invalidId}`);
      expect(response.status).toBe(400);
      expect(response.body.error).toEqual(
        'Validation error: Invalid MongoDB id at "id"',
      );
    });
  });

  describe("post", () => {
    it("should respond with 200 and the created minutes when given valid minutes object", async () => {
      const response = await api.post(`${baseUrl}/`).send(dummyMinutes);
      expect(response.status).toBe(200);
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
      const updatedMinutes = { ...dummyMinutes, name: "updated minutes" };

      const response = await api
        .put(`${baseUrl}/${minutesInDb.id}`)
        .send(updatedMinutes);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining(updatedMinutes));
    });

    it("should respond with 400 and error message when given invalid id (hexadecimal value with 24 characters)", async () => {
      const response = await api
        .put(`${baseUrl}/${invalidId}`)
        .send({ ...dummyMinutes, name: "updated minutes" });

      expect(response.status).toBe(400);
      expect(response.body.error).toEqual(
        'Validation error: Invalid MongoDB id at "id"',
      );
    });

    it("should respond with 400 and error message when given invalid body", async () => {
      const response = await api
        .put(`${baseUrl}/${validNonExistentId}`)
        .send({ ...dummyMinutes, name: undefined });

      expect(response.status).toBe(400);
      expect(response.body.error).toEqual(
        'Validation error: Required at "name"',
      );
    });

    it("should respond with 404 and error message when id doesn't exist in the database", async () => {
      const response = await api
        .put(`${baseUrl}/${validNonExistentId}`)
        .send({ ...dummyMinutes, name: "updated minutes" });

      expect(response.status).toBe(404);
      expect(response.body.error).toEqual(
        "Minutes not found with the given id",
      );
    });
  });

  describe("delete", () => {
    it("should respond with 200 and the deleted minutes when given valid id", async () => {
      const response = await api.delete(`${baseUrl}/${minutesInDb.id}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining(dummyMinutes));
    });

    it("should respond with 400 and validation error message when id isn't a valid mongodb id (hexadecimal value with 24 characters)", async () => {
      const response = await api.delete(`${baseUrl}/${invalidId}`);

      expect(response.status).toBe(400);
      expect(response.body.error).toEqual(
        'Validation error: Invalid MongoDB id at "id"',
      );
    });

    it("should respond with 404 and error message when id doesn't exist in the database", async () => {
      const response = await api.delete(`${baseUrl}/${validNonExistentId}`);

      expect(response.status).toBe(404);
      expect(response.body.error).toEqual(
        "Minutes not found with the given id",
      );
    });
  });
});
