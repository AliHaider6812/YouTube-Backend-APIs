const request = require("supertest");
const app = require("../../app");

jest.mock("../../services/user.service");
const userService = require("../../services/user.service");
const ApiError = require("../../utils/ApiError");

describe("POST /api/v1/users/login", () => {

  test("should return 200 and a token on valid login", async () => {

    userService.loginUser.mockResolvedValue({
      user: {
        id: 1,
        email: "ali@test.com",
        username: "ali",
      },
      accessToken: "fakeToken",
      refreshToken: "fakeRefreshToken",
    });

    const res = await request(app)
      .post("/api/v1/users/login")
      .send({
        email: "ali@test.com",
        password: "password123",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.accessToken).toBe("fakeToken");
  });

  test("should return 400 on invalid credentials", async () => {

    userService.loginUser.mockRejectedValue(
      new ApiError(400, "Invalid email or password.")
    );

    const res = await request(app)
      .post("/api/v1/users/login")
      .send({
        email: "wrong@test.com",
        password: "wrongPassword123",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Invalid email or password.");
  });

});