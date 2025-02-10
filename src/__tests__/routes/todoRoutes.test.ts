import request from "supertest";
import app from "../../index";
import { generateToken } from "../../utils/jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("Todo Routes", () => {
  let token: string;
  let userId: number;

  beforeAll(async () => {
    // Fetch the user to get the correct userId
    const user = await prisma.user.findUnique({
      where: { email: "testuser@example.com" },
    });

    if (user) {
      userId = user.id;
      token = generateToken({ userId, email: user.email });
    }
  });

  test("should create a new to-do item", async () => {
    const response = await request(app)
      .post("/api/todos")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Todo",
        description: "Test Description",
      });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe("Test Todo");
  });

  test("should get all to-do items", async () => {
    const response = await request(app)
      .get("/api/todos")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  test("should update a to-do item", async () => {
    // Create a to-do item first
    const createResponse = await request(app)
      .post("/api/todos")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Todo",
        description: "Test Description",
      });

    const todoId = createResponse.body.id;

    // Update the to-do item
    const response = await request(app)
      .put(`/api/todos/${todoId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Updated Todo",
        description: "Updated Description",
      });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Updated Todo");
  });

  test("should delete a to-do item", async () => {
    const response = await request(app)
      .delete("/api/todos/1")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(204);
  });
});
