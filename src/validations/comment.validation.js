const { z } = require("zod");

const commentSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "Comment cannot be empty."),
});

module.exports = {
  commentSchema,
};
