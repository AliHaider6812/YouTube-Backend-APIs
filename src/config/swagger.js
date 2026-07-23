const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "YouTube Backend API",
      version: "1.0.0",
      description:
        "REST API documentation for YouTube Backend built with Express, Prisma, PostgreSQL, JWT Authentication, Zod Validation, Winston Logging, Rate Limiting, and Helmet Security.",
    },

    servers: [
      {
        url: "http://localhost:8000/api/v1",
        description: "Development Server",
      },
    ],

    components: {
      // JWT Authentication
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        // =========================
        // User
        // =========================
        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "clxyz123",
            },
            username: {
              type: "string",
              example: "ali",
            },
            email: {
              type: "string",
              example: "ali@test.com",
            },
            fullName: {
              type: "string",
              example: "Ali Haider",
            },
          },
        },

        // =========================
        // Login Request
        // =========================
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              example: "ali@test.com",
            },
            password: {
              type: "string",
              example: "Password@123",
            },
          },
        },

        // =========================
        // Login Response
        // =========================
        LoginResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },

            message: {
              type: "string",
              example: "Login successful.",
            },

            data: {
              type: "object",
              properties: {
                user: {
                  $ref: "#/components/schemas/User",
                },

                accessToken: {
                  type: "string",
                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                },

                refreshToken: {
                  type: "string",
                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                },
              },
            },
          },
        },
        RegisterRequest: {
              type: "object",
              required: [
                "username",
                "email",
                "fullName",
                "password",
                "avatarUrl"
              ],
              properties: {
                username: {
                  type: "string",
                  example: "ali"
                },

                email: {
                  type: "string",
                  example: "ali@test.com"
                },

                fullName: {
                  type: "string",
                  example: "Ali Haider"
                },

                avatarUrl: {
                  type: "string",
                  example: "https://res.cloudinary.com/demo/image/upload/avatar.jpg"
                },

                password: {
                  type: "string",
                  example: "Password@123"
                }
              }
            },
        RegisterResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "User registered successfully.",
            },
            data: {
              $ref: "#/components/schemas/User",
            },
          },
        },
        RefreshTokenRequest: {
          type: "object",
          required: ["refreshToken"],
          properties: {
            refreshToken: {
              type: "string",
              example: "eyJhbGciOiJIUzI1NiIs..."
            }
          }
        },
        RefreshTokenResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true
            },
            message: {
              type: "string",
              example: "Access token refreshed successfully."
            },
            data: {
              type: "object",
              properties: {
                accessToken: {
                  type: "string",
                  example: "eyJhbGciOiJIUzI1NiIs..."
                }
              }
            }
          }
        },
        CurrentUserResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "Current user fetched successfully.",
            },
            data: {
              $ref: "#/components/schemas/User",
            },
          },
        },
        ChangePasswordRequest: {
          type: "object",
          required: ["oldPassword", "newPassword"],
          properties: {
            oldPassword: {
              type: "string",
              example: "OldPassword@123",
            },
            newPassword: {
              type: "string",
              example: "NewPassword@123",
            },
          },
        },
        ChangePasswordResponse: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: true,
              },
              message: {
                type: "string",
                example: "Password changed successfully.",
              },
            },
          },
          UpdateAccountRequest: {
            type: "object",
            required: ["username", "email", "fullName"],
            properties: {
              username: {
                type: "string",
                example: "ali"
              },

              email: {
                type: "string",
                example: "ali@test.com"
              },

              fullName: {
                type: "string",
                example: "Ali Haider"
              }
            }
          },
          UpdateAccountResponse: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: true
              },

              message: {
                type: "string",
                example: "Account updated successfully."
              },

              data: {
                $ref: "#/components/schemas/User"
              }
            }
          },
        SuccessResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "Operation completed successfully.",
            },
          },
        },

        // =========================
        // Error Response
        // =========================
        ErrorResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },

            message: {
              type: "string",
              example: "Invalid email or password.",
            },
          },
        },
      
      Video: {
            type: "object",
            properties: {
              id: {
                type: "string",
                example: "clxyz123",
              },
              title: {
                type: "string",
                example: "My First Video",
              },
              description: {
                type: "string",
                example: "This is my first uploaded video.",
              },
              videoUrl: {
                type: "string",
                example: "https://res.cloudinary.com/demo/video/upload/video.mp4",
              },
              thumbnailUrl: {
                type: "string",
                example: "https://res.cloudinary.com/demo/image/upload/thumb.jpg",
              },
              duration: {
                type: "number",
                example: 120.5,
              },
              views: {
                type: "integer",
                example: 100,
              },
              isPublished: {
                type: "boolean",
                example: true,
              },
              owner: {
                $ref: "#/components/schemas/User",
              },
            },
          },
              },
            },
          },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;