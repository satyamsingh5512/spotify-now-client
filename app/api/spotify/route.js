import { getNowPlaying } from '@/lib/spotify';

export const dynamic = 'force-dynamic';

export async function GET() {
  const response = await getNowPlaying();

  // No song playing
  if (response.status === 204 || response.status > 400) {
    return Response.json({ isPlaying: false });
  }

  const song = await response.json();

  // Not a track (podcast, etc.)
  if (song.currently_playing_type !== 'track') {
    return Response.json({ isPlaying: false });
  }

  const data = {
    isPlaying: song.is_playing,
    title: song.item.name,
    artist: song.item.artists.map((artist) => artist.name).join(', '),
    album: song.item.album.name,
    albumImageUrl: song.item.album.images[0].url,
    songUrl: song.item.external_urls.spotify,
  };

  return Response.json(data);
}