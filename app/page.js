import SpotifyPill from '@/components/SpotifyPill'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4">
          🎵 Spotify Now Playing
        </h1>
        <p className="text-gray-400 text-lg mb-8">
          Play a song on Spotify to see the widget in action!
        </p>
        <div className="text-sm text-gray-500 space-y-2">
          <p>The widget appears in the bottom-right corner</p>
          <p className="text-xs">Updates every 5 seconds</p>
        </div>
      </div>
      
      <SpotifyPill />
    </main>
  )
}
