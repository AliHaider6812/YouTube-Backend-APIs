const { z } = require("zod");

const tweetSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "Tweet cannot be empty."),
});

module.exports = {
  tweetSchema,
};