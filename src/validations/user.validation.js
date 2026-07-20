const { z } = require("zod");

const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters."),

  fullName: z
    .string()
    .trim()
    .min(3, "Full name must be at least 3 characters."),

  email: z
    .email("Invalid email address."),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters."),
});

const loginSchema = z.object({
  email: z.email("Invalid email address."),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters."),
});

module.exports = {
  registerSchema,
  loginSchema,
};