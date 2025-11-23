// Example: How to use SpotifyPill in your Next.js pages

// ============================================
// OPTION 1: Add to main layout (shows on all pages)
// ============================================
// File: app/layout.js or app/layout.tsx

import SpotifyPill from '@/components/SpotifyPill'
import './globals.css'

export const metadata = {
  title: 'My Portfolio',
  description: 'Portfolio with Spotify integration',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <SpotifyPill /> {/* Widget appears on ALL pages */}
      </body>
    </html>
  )
}

// ============================================
// OPTION 2: Add to specific page only
// ============================================
// File: app/page.js or app/page.tsx

import SpotifyPill from '@/components/SpotifyPill'

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold">Welcome to My Portfolio</h1>
      <p className="mt-4">Check out what I'm listening to!</p>
      
      {/* Your content here */}
      
      <SpotifyPill /> {/* Widget appears on THIS page only */}
    </main>
  )
}

// ============================================
// OPTION 3: Conditional rendering
// ============================================
// File: app/page.tsx

'use client'

import { useState } from 'react'
import SpotifyPill from '@/components/SpotifyPill'

export default function Home() {
  const [showSpotify, setShowSpotify] = useState(true)

  return (
    <main>
      <button onClick={() => setShowSpotify(!showSpotify)}>
        Toggle Spotify Widget
      </button>
      
      {showSpotify && <SpotifyPill />}
    </main>
  )
}

// ============================================
// TIPS
// ============================================

// 1. The widget is positioned with 'fixed', so it floats above content
// 2. It won't interfere with scrolling or page layout
// 3. Default position: bottom-right (bottom-6 right-6)
// 4. To change position, edit SpotifyPill.tsx className
// 5. Widget automatically hides when nothing is playing (shows "Offline")

// ============================================
// CUSTOMIZATION EXAMPLES
// ============================================

// Change position to bottom-left:
// In SpotifyPill.tsx, change:
// className="fixed bottom-6 right-6 ..."
// to:
// className="fixed bottom-6 left-6 ..."

// Change position to top-right:
// className="fixed top-6 right-6 ..."

// Change polling interval (default 5 seconds):
// In SpotifyPill.tsx, change:
// refreshInterval: 5000
// to:
// refreshInterval: 3000  // 3 seconds (more responsive but more API calls)
