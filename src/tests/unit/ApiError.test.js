const ApiError = require("../../utils/ApiError"); 

describe("ApiError", () => {
  test("should be an instance of Error", () => {
    const error = new ApiError(404, "Not Found");
    expect(error).toBeInstanceOf(Error);
  });

  test("should set the correct statusCode", () => {
    const error = new ApiError(404, "Not Found");
    expect(error.statusCode).toBe(404);
  });

  test("should set the correct message", () => {
    const error = new ApiError(400, "Bad Request");
    expect(error.message).toBe("Bad Request");
  });

  test("success should always be false", () => {
    const error = new ApiError(500, "Server Error");
    expect(error.success).toBe(false);
  });

  test("should have a stack trace", () => {
    const error = new ApiError(500, "Server Error");
    expect(error.stack).toBeDefined();
  });
});