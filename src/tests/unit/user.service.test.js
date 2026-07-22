// Mock all external dependencies BEFORE importing the service that uses them
jest.mock("../../config/prisma", () => ({
  user: {
    findUnique: jest.fn(),
    update: jest.fn(),
  },
}));


jest.mock("../../config/prisma", () => ({
  user: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
}));

jest.mock("bcrypt");
jest.mock("../../utils/generateTokens");
jest.mock("../../utils/logger");

const prisma = require("../../config/prisma");
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require("../../utils/generateTokens");
const { loginUser } = require("../../services/user.service");
const ApiError = require("../../utils/ApiError");




describe("loginUser", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should log in successfully with correct credentials", async () => {
    const fakeUser = {
      id: 1,
      email: "ali@test.com",
      password: "hashedpassword123",
      username: "ali",
      fullName: "Ali Haider",
    };

    prisma.user.findUnique.mockResolvedValue(fakeUser);
    bcrypt.compare.mockResolvedValue(true);
    generateAccessToken.mockReturnValue("fakeAccessToken");
    generateRefreshToken.mockReturnValue("fakeRefreshToken");
    prisma.user.update.mockResolvedValue({});

    const result = await loginUser({
      email: "ali@test.com",
      password: "correctPassword",
    });

    expect(result.accessToken).toBe("fakeAccessToken");
    expect(result.refreshToken).toBe("fakeRefreshToken");
    expect(result.user.email).toBe("ali@test.com");
  });

  test("should throw an error if user does not exist", async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    await expect(
      loginUser({ email: "notfound@test.com", password: "any" })
    ).rejects.toThrow("Invalid email or password.");
  });

  test("should throw an error if password is incorrect", async () => {
    const fakeUser = { id: 1, email: "ali@test.com", password: "hashedpassword123" };

    prisma.user.findUnique.mockResolvedValue(fakeUser);
    bcrypt.compare.mockResolvedValue(false);

    await expect(
      loginUser({ email: "ali@test.com", password: "wrongPassword" })
    ).rejects.toThrow("Invalid email or password.");
  });
});


const { registerUser } = require("../../services/user.service");

describe("registerUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should register a new user successfully", async () => {
    prisma.user.findFirst.mockResolvedValue(null); // no existing user
    bcrypt.hash.mockResolvedValue("hashedPassword123");
    prisma.user.create.mockResolvedValue({
      id: 1,
      username: "ali",
      email: "ali@test.com",
      fullName: "Ali Haider",
      avatarUrl: null,
      coverImageUrl: null,
      createdAt: new Date(),
    });

    const result = await registerUser({
      username: "ali",
      email: "ali@test.com",
      fullName: "Ali Haider",
      password: "plainPassword",
    });

    expect(result.username).toBe("ali");
    expect(result.email).toBe("ali@test.com");
    expect(prisma.user.create).toHaveBeenCalledTimes(1);
  });

  test("should throw error if username or email already exists", async () => {
    prisma.user.findFirst.mockResolvedValue({ id: 1, email: "ali@test.com" });

    await expect(
      registerUser({ username: "ali", email: "ali@test.com", password: "x" })
    ).rejects.toThrow("Username or Email already exists.");
  });
});