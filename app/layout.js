import './globals.css'

export const metadata = {
  title: 'Spotify Now Playing',
  description: 'Beautiful Spotify widget showing your currently playing song',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
