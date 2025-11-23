# 🎵 Spotify "Now Playing" Pill Widget

A beautiful, glassmorphic Spotify widget that displays your currently playing song in real-time. Features smooth animations, hover effects, and a sleek macOS-inspired design.

![Widget Preview](https://img.shields.io/badge/Status-Active-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14+-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)

## ✨ Features

- 🎨 **Glassmorphic Design** - Frosted glass effect with backdrop blur
- 🔄 **Rotating Album Art** - Smooth 8-second rotation animation
- 📊 **Animated Waveform** - Green audio bars that pulse in real-time
- 🎯 **Smart Truncation** - Long song/artist names elegantly truncated
- 🖱️ **Interactive Hover** - Scales up with green glow on hover
- 🔗 **Clickable** - Opens the song directly in Spotify
- 🌐 **Real-time Updates** - Polls Spotify API every 5 seconds
- 📱 **Responsive** - Works on desktop and mobile
- 🎭 **Offline Mode** - Shows subtle "Offline" indicator when not playing

## 🎥 Demo

When music is playing:
```
╭─────────────────────────────────────╮
│  (●)  Shape of You         |||      │  ← Glassmorphic pill
│       Ed Sheeran           |||      │     (bottom-right corner)
╰─────────────────────────────────────╯
 ↑      ↑                    ↑
rotating  song info     animated bars
album                   (green)
```

When offline: Small gray pill with Spotify icon + "Offline" text

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install swr framer-motion react-icons
```

### 2. Set Up Spotify API

Follow the detailed guide in [SPOTIFY_SETUP.md](./SPOTIFY_SETUP.md) to:
- Create a Spotify Developer App
- Get your Client ID and Client Secret
- Generate a Refresh Token

### 3. Configure Environment Variables

Create/update `.env.local`:

```bash
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SPOTIFY_REFRESH_TOKEN=your_refresh_token
```

### 4. Add Widget to Your Page

```tsx
import SpotifyPill from '@/components/SpotifyPill';

export default function Home() {
  return (
    <div>
      {/* Your content */}
      <SpotifyPill />
    </div>
  );
}
```

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and play a song on Spotify!

## 📁 Project Structure

```
spotify-client/
├── .env.local                      # Spotify API credentials
├── app/
│   ├── api/
│   │   └── spotify/
│   │       └── route.js           # API endpoint (polls Spotify)
│   └── page.js                    # Main page
├── components/
│   └── SpotifyPill.tsx            # Widget component
├── lib/
│   └── spotify.js                 # Spotify API helpers
├── tailwind.config.js             # Custom animations
├── get_spotify_token.py           # Token generator script
└── SPOTIFY_SETUP.md               # Detailed setup guide
```

## 🎨 Design Specifications

### Colors
- Background: `bg-neutral-900/75` (75% opacity)
- Border: `border-white/10` (10% opacity)
- Text: `text-white` (title), `text-gray-400` (artist)
- Accent: `bg-green-500` (waveform)

### Dimensions
- Height: `56px` (fixed)
- Width: `200px - 280px` (responsive)
- Border Radius: `9999px` (pill shape)
- Position: `fixed bottom-6 right-6`

### Animations
- Album art: `spin 8s linear infinite`
- Waveform bars: Oscillate between 8-16px height
- Hover: `scale(1.03)` with green shadow
- Entrance/Exit: Fade + slide + scale

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Fetching**: SWR (with 5s polling)
- **Animations**: Framer Motion
- **Icons**: React Icons (Simple Icons)
- **API**: Spotify Web API

## 🔧 Configuration

### Polling Interval
Change refresh rate in `components/SpotifyPill.tsx`:
```tsx
const { data } = useSWR('/api/spotify', fetcher, {
  refreshInterval: 5000, // Change to 3000 for 3 seconds
});
```

### Widget Position
Modify classes in `components/SpotifyPill.tsx`:
```tsx
className="fixed bottom-6 right-6 ..."
//             ↑        ↑
//          position  position
```

### Size Constraints
```tsx
className="... min-w-[200px] max-w-[280px]"
//             ↑              ↑
//          minimum        maximum
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Widget shows "Offline" | Ensure Spotify is playing a song (not paused) |
| "Invalid credentials" | Double-check `.env.local` values, restart server |
| Album art not rotating | Verify `tailwind.config.js` has `spin-slow` animation |
| No widget appears | Check component is imported, API route exists |
| Stale data | Refresh token may have expired, re-run `get_spotify_token.py` |

## 📝 Notes

- Only displays music tracks (filters out podcasts/audiobooks)
- Works with both Free and Premium Spotify accounts
- Refresh tokens typically last years before expiring
- Widget uses `fixed` positioning - won't interfere with page scroll
- Album images are cached by the browser

## 🎯 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

MIT License - Feel free to use in your projects!

## 🙏 Credits

- Design inspired by macOS widgets
- Powered by [Spotify Web API](https://developer.spotify.com/documentation/web-api)
- Built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), and [Framer Motion](https://www.framer.com/motion/)

---

Made with ❤️ and 🎵

For detailed setup instructions, see [SPOTIFY_SETUP.md](./SPOTIFY_SETUP.md)
