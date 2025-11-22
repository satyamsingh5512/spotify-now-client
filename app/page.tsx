import SpotifyPill from '@/components/SpotifyPill';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Spotify Now Playing Widget</h1>
        <p className="text-gray-400">The widget will appear in the bottom-right corner when music is playing.</p>
      </div>
      <SpotifyPill />
    </main>
  );
}