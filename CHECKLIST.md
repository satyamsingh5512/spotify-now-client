# 🎵 Spotify Widget Implementation Checklist

Use this checklist to ensure everything is set up correctly!

## ✅ Pre-Setup Checklist

- [ ] Node.js and npm installed
- [ ] Next.js project initialized
- [ ] Tailwind CSS configured
- [ ] Spotify account (Free or Premium)

## 📦 Installation Steps

- [ ] **Dependencies installed**
  ```bash
  npm install swr framer-motion react-icons
  ```
  Expected: No errors, packages added to `package.json`

## 🗂️ File Structure

- [ ] **`.env.local`** exists in project root
  - [ ] Contains `SPOTIFY_CLIENT_ID`
  - [ ] Contains `SPOTIFY_CLIENT_SECRET`
  - [ ] Contains `SPOTIFY_REFRESH_TOKEN`
  - [ ] No trailing spaces or quotes around values

- [ ] **`lib/spotify.js`** exists
  - [ ] Exports `getAccessToken` function
  - [ ] Exports `getNowPlaying` function
  - [ ] Uses `Buffer` for Base64 encoding

- [ ] **`app/api/spotify/route.js`** exists
  - [ ] Has `export const dynamic = 'force-dynamic'`
  - [ ] Exports `GET` function
  - [ ] Handles 204 status (no song playing)
  - [ ] Filters out podcasts/non-tracks

- [ ] **`components/SpotifyPill.tsx`** exists
  - [ ] Uses `'use client'` directive
  - [ ] Has TypeScript interface for SpotifyData
  - [ ] Includes both playing and offline states
  - [ ] Has proper Tailwind classes for glassmorphism

- [ ] **`tailwind.config.js`** exists
  - [ ] Contains custom `spin-slow` animation
  - [ ] Animation set to `spin 8s linear infinite`

## 🔑 Spotify API Setup

- [ ] **Spotify Developer Account**
  - [ ] Logged into [developer.spotify.com/dashboard](https://developer.spotify.com/dashboard)
  - [ ] Created new app

- [ ] **App Configuration**
  - [ ] App name set
  - [ ] Redirect URI added: `http://localhost:3000`
  - [ ] Copied Client ID
  - [ ] Copied Client Secret

- [ ] **Refresh Token**
  - [ ] Ran `python get_spotify_token.py`
  - [ ] Entered Client ID and Secret
  - [ ] Authorized app in browser
  - [ ] Pasted redirect URL back into script
  - [ ] Copied `refresh_token` value

- [ ] **Environment Variables Set**
  - [ ] Pasted Client ID into `.env.local`
  - [ ] Pasted Client Secret into `.env.local`
  - [ ] Pasted Refresh Token into `.env.local`
  - [ ] Restarted development server

## 🎨 Component Integration

- [ ] **Widget Added to Page**
  - [ ] Imported: `import SpotifyPill from '@/components/SpotifyPill'`
  - [ ] Added to JSX: `<SpotifyPill />`
  - [ ] No console errors when page loads

## 🧪 Testing

- [ ] **Visual Tests**
  - [ ] Development server running (`npm run dev`)
  - [ ] Page loads without errors
  - [ ] Browser console clear (no red errors)

- [ ] **Offline State Test**
  - [ ] Stop Spotify playback
  - [ ] Widget shows small gray "Offline" pill
  - [ ] Spotify icon visible in offline state

- [ ] **Playing State Test**
  - [ ] Start playing song on Spotify (any device)
  - [ ] Wait up to 5 seconds
  - [ ] Widget appears with:
    - [ ] Album art (rotating)
    - [ ] Song title
    - [ ] Artist name
    - [ ] Green animated waveform bars

- [ ] **Interaction Tests**
  - [ ] Hover over widget → Scales up slightly
  - [ ] Hover over widget → Green glow appears
  - [ ] Click widget → Opens Spotify song page in new tab
  - [ ] Long song/artist names → Truncated with `...`

- [ ] **Animation Tests**
  - [ ] Album art rotates smoothly (8 seconds per rotation)
  - [ ] Waveform bars animate independently
  - [ ] Smooth fade transition when starting/stopping music

## 🐛 Troubleshooting Quick Fixes

### Widget Doesn't Appear

- [ ] Check browser console for errors
- [ ] Verify API route at: `http://localhost:3000/api/spotify`
  - Should return JSON (either `{isPlaying: false}` or song data)
- [ ] Confirm component is imported in page file

### Shows "Offline" When Music is Playing

- [ ] Music is actually playing (not paused)
- [ ] Check `.env.local` values are correct (no typos)
- [ ] Restart dev server after changing environment variables
- [ ] Test API directly: open `http://localhost:3000/api/spotify` in browser
- [ ] Verify refresh token hasn't expired (re-run `get_spotify_token.py`)

### Album Art Not Rotating

- [ ] Check `tailwind.config.js` has `animate-spin-slow`
- [ ] Verify Tailwind is processing files (check `tailwind.config.js` content paths)
- [ ] Clear browser cache and hard refresh (Ctrl+Shift+R / Cmd+Shift+R)

### API Errors in Console

- [ ] 401 Unauthorized → Check Client ID/Secret are correct
- [ ] 403 Forbidden → Verify scopes during token generation
- [ ] 429 Too Many Requests → Wait a minute, API rate limited

## 🎯 Success Criteria

Your widget is working perfectly when:

✅ Appears in bottom-right corner with glassmorphic effect  
✅ Album art rotates smoothly  
✅ Shows current song within 5 seconds of playing  
✅ Waveform bars animate independently  
✅ Hover effect works (scale + green glow)  
✅ Clicking opens Spotify song page  
✅ Shows "Offline" when nothing playing  
✅ Updates automatically when changing songs  
✅ No console errors  
✅ Doesn't interfere with page scrolling  

## 📞 Need Help?

If something isn't working:

1. Check the detailed [SPOTIFY_SETUP.md](./SPOTIFY_SETUP.md)
2. Review [INTEGRATION_EXAMPLES.js](./INTEGRATION_EXAMPLES.js)
3. Verify all files match the structure above
4. Test the API endpoint directly in browser
5. Check for typos in environment variables

## 🎉 You're Done!

Congratulations! Your Spotify "Now Playing" widget is live! 🎵

Now play some music and watch it come to life! 🎶
