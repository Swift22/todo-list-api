import request from "supertest";
import app from "../../index";

describe("User Routes", () => {
  test("should register a new user", async () => {
    const response = await request(app).post("/api/users/register").send({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
    });

    expect(response.status).toBe(201);
    expect(response.body.token).toBeTruthy();
  });

  test("should login an existing user", async () => {
    const response = await request(app).post("/api/users/login").send({
      email: "testuser@example.com",
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeTruthy();
  });
});
