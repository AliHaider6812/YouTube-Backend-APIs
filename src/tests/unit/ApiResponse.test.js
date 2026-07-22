const ApiResponse = require("../../utils/ApiResponse");

describe("ApiResponse", () => {
  test("should set the correct statusCode", () => {
    const response = new ApiResponse(200, { id: 1 });
    expect(response.statusCode).toBe(200);
  });

  test("success should always be true", () => {
    const response = new ApiResponse(200, { id: 1 });
    expect(response.success).toBe(true);
  });

  test("should default message to 'Success' when not provided", () => {
    const response = new ApiResponse(200, { id: 1 });
    expect(response.message).toBe("Success");
  });

  test("should use custom message when provided", () => {
    const response = new ApiResponse(201, { id: 1 }, "User created");
    expect(response.message).toBe("User created");
  });

  test("should store the data passed in", () => {
    const userData = { id: 1, name: "Ali" };
    const response = new ApiResponse(200, userData);
    expect(response.data).toEqual(userData);
  });
});