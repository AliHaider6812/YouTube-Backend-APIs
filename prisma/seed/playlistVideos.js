const { PLAYLIST_VIDEO_COUNT } = require("./constants");

async function seedPlaylistVideos(prisma, playlists, videos) {
  let created = 0;

  for (let i = 0; i < PLAYLIST_VIDEO_COUNT; i++) {
    const playlist = playlists[Math.floor(Math.random() * playlists.length)];
    const video = videos[Math.floor(Math.random() * videos.length)];

    try {
      await prisma.playlistVideo.create({
        data: {
          playlistId: playlist.id,
          videoId: video.id,
        },
      });

      created++;
    } catch {}
  }

  console.log(`✅ ${created} playlist videos created.`);
}

module.exports = seedPlaylistVideos;