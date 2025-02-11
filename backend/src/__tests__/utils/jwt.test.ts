import { generateToken, verifyToken } from "../../utils/jwt";

describe("JWT Utilities", () => {
  const mockPayload = {
    userId: 1,
    email: "test@example.com",
  };

  test("should generate a valid JWT token", () => {
    const token = generateToken(mockPayload);
    expect(typeof token).toBe("string");
    expect(token).toBeTruthy();
  });

  test("should verify and decode token correctly", () => {
    const token = generateToken(mockPayload);
    const decoded = verifyToken(token);
    expect(decoded.userId).toBe(mockPayload.userId);
    expect(decoded.email).toBe(mockPayload.email);
  });

  test("should throw error for invalid token", () => {
    expect(() => {
      verifyToken("invalid-token");
    }).toThrow();
  });
});
