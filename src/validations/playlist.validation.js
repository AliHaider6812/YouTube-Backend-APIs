const { z } = require("zod");

const playlistSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Playlist name must be at least 3 characters."),

  description: z
    .string()
    .trim()
    .min(5, "Description must be at least 5 characters."),
});

const updatePlaylistSchema = playlistSchema.partial();

module.exports = {
  playlistSchema,
  updatePlaylistSchema,
};