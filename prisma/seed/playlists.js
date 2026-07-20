const { faker } = require("@faker-js/faker");
const { PLAYLIST_COUNT } = require("./constants");

async function seedPlaylists(prisma, users) {
  const playlists = [];

  for (let i = 0; i < PLAYLIST_COUNT; i++) {
    const owner = users[Math.floor(Math.random() * users.length)];

    const playlist = await prisma.playlist.create({
      data: {
        name: faker.music.genre() + " Playlist",
        description: faker.lorem.sentence(),
        createdById: owner.id,
      },
    });

    playlists.push(playlist);
  }

  console.log(`✅ ${playlists.length} playlists created.`);

  return playlists;
}

module.exports = seedPlaylists;