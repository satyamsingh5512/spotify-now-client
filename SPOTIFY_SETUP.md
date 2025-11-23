# 🎵 Spotify "Now Playing" Widget - Setup Guide

This guide will walk you through setting up the Spotify API credentials needed for the "Now Playing" pill widget.

## 📋 Prerequisites

- A Spotify account (Free or Premium)
- Active Spotify playback (desktop, mobile, or web player)

## 🚀 Step-by-Step Setup

### Step 1: Create Spotify App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click **"Create App"**
4. Fill in the app details:
   - **App Name**: `Portfolio Now Playing` (or any name you prefer)
   - **App Description**: `Displays currently playing song on my website`
   - **Website**: `http://localhost:3000` (or your actual domain)
   - **Redirect URI**: `http://localhost:3000/api/spotify/callback`
5. Check the boxes to agree to the terms
6. Click **"Save"**

### Step 2: Get Client Credentials

1. In your newly created app dashboard, you'll see:
   - **Client ID** - Copy this
   - **Client Secret** - Click "Show Client Secret" and copy it
2. Keep these safe - you'll need them in the next steps

### Step 3: Configure Redirect URI

1. Click **"Edit Settings"** in your app dashboard
2. Under **Redirect URIs**, add:
   ```
   http://localhost:3000
   ```
3. Click **"Add"**
4. Scroll down and click **"Save"**

### Step 4: Get Refresh Token

We've included a Python script to make this easy:

```bash
# Make sure you're in the project directory
cd /home/satym/Documents/projects/spotify-client

# Run the token generator script
python get_spotify_token.py
```

The script will:
1. Ask for your **Client ID** and **Client Secret**
2. Open your browser for Spotify authorization
3. Guide you through copying the redirect URL
4. Generate your **Refresh Token**

**Important**: Copy the `refresh_token` value from the output!

### Step 5: Configure Environment Variables

1. Open the `.env.local` file in your project root
2. Replace the placeholder values with your actual credentials:

```bash
SPOTIFY_CLIENT_ID=your_actual_client_id_here
SPOTIFY_CLIENT_SECRET=your_actual_client_secret_here
SPOTIFY_REFRESH_TOKEN=your_actual_refresh_token_here
```

**Example:**
```bash
SPOTIFY_CLIENT_ID=a1b2c3d4e5f6g7h8i9j0
SPOTIFY_CLIENT_SECRET=z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4j3i2h1
SPOTIFY_REFRESH_TOKEN=AQBeA_xxxxxxxxxxxxxxxxxxxxxxxxx...
```

### Step 6: Add Widget to Your Page

Import and add the `SpotifyPill` component to any page:

```tsx
import SpotifyPill from '@/components/SpotifyPill';

export default function Home() {
  return (
    <div>
      {/* Your page content */}
      <SpotifyPill />
    </div>
  );
}
```

The widget will automatically appear in the bottom-right corner!

## 🧪 Testing

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000)

3. **Play a song on Spotify** (any device):
   - Desktop app
   - Mobile app
   - Web player ([open.spotify.com](https://open.spotify.com))

4. The widget should appear within 5 seconds showing your current track!

## ✅ Troubleshooting

### Widget shows "Offline"
- ✓ Make sure Spotify is actually playing a song (not paused)
- ✓ Check that all environment variables are set correctly
- ✓ Verify the refresh token hasn't expired (re-run `get_spotify_token.py`)
- ✓ Check browser console for API errors

### "Invalid credentials" error
- ✓ Double-check your Client ID and Client Secret
- ✓ Make sure there are no extra spaces in `.env.local`
- ✓ Restart your development server after changing env variables

### Widget doesn't appear at all
- ✓ Verify the component is imported in your page
- ✓ Check that the API route exists at `app/api/spotify/route.js`
- ✓ Open browser DevTools → Network tab and look for `/api/spotify` requests

### Album art not rotating
- ✓ Check that `tailwind.config.js` has the custom `spin-slow` animation
- ✓ Make sure Tailwind is processing the component files

## 🎨 Visual Features

When working correctly, you'll see:

- **Playing State**:
  - Glassmorphic pill with rotating album art
  - Song title and artist (truncated if too long)
  - Animated green waveform bars
  - Smooth hover effect with green glow
  - Clickable - opens Spotify song page

- **Offline State**:
  - Small gray pill with Spotify icon
  - "Offline" text

## 🔄 Refresh Token Expiration

Spotify refresh tokens typically last for a very long time (years), but if yours stops working:

1. Run `python get_spotify_token.py` again
2. Get a new refresh token
3. Update `.env.local`
4. Restart your dev server

## 📝 Notes

- The widget polls the Spotify API every 5 seconds
- Only shows music tracks (filters out podcasts)
- Works with any Spotify account type (Free/Premium)
- Album art rotates at 8 seconds per full rotation
- Widget is positioned `fixed` so it stays in place while scrolling

## 🎯 Expected Result

```
╭─────────────────────────────────────╮
│  (●)  Song Name Here...    |||      │  ← Glassmorphic pill
│       Artist Name          |||      │     (floating bottom-right)
╰─────────────────────────────────────╯
 ↑      ↑                    ↑
rotating  truncated text    animated bars
album                        (green)
```

Enjoy your Spotify widget! 🎶
