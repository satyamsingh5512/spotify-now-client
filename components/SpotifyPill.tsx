'use client';

import useSWR from 'swr';
import { motion, AnimatePresence } from 'framer-motion';
import { SiSpotify } from 'react-icons/si';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumImageUrl?: string;
  songUrl?: string;
}

export default function SpotifyPill() {
  const { data } = useSWR<SpotifyData>('/api/spotify', fetcher, {
    refreshInterval: 5000, // Poll every 5 seconds
    dedupingInterval: 0, // Disable deduplication
    revalidateOnFocus: true, // Revalidate when window gets focus
    revalidateOnReconnect: true, // Revalidate when reconnecting
  });

  if (!data) return null;

  return (
    <AnimatePresence mode="wait">
      {data.isPlaying ? (
        <motion.a
          key="playing"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          href={data.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 h-14 px-4 py-2.5 
                     bg-neutral-900/75 backdrop-blur-xl border border-white/10 
                     rounded-full shadow-2xl shadow-black/50
                     hover:scale-[1.03] hover:border-white/20 hover:shadow-green-500/20
                     active:scale-[0.98] transition-all duration-300 ease-out
                     cursor-pointer min-w-[200px] max-w-[280px]"
        >
          {/* Album Art - Rotating */}
          <div className="relative w-9 h-9 flex-shrink-0">
            <img
              src={data.albumImageUrl}
              alt={data.title}
              className="w-full h-full rounded-full object-cover animate-spin-slow"
            />
          </div>

          {/* Song Info */}
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm text-white leading-tight truncate max-w-[140px]">
              {data.title}
            </p>
            <p className="text-[10px] text-gray-400 font-normal tracking-wide truncate max-w-[140px]">
              {data.artist}
            </p>
          </div>

          {/* Animated Waveform */}
          <div className="flex items-end gap-[3px] h-4 flex-shrink-0">
            <motion.div
              animate={{ height: ['8px', '16px', '8px'] }}
              transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-[3px] bg-green-500 rounded-full"
            />
            <motion.div
              animate={{ height: ['12px', '8px', '12px'] }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
              className="w-[3px] bg-green-500 rounded-full"
            />
            <motion.div
              animate={{ height: ['10px', '14px', '10px'] }}
              transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
              className="w-[3px] bg-green-500 rounded-full"
            />
          </div>
        </motion.a>
      ) : (
        <motion.div
          key="offline"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 h-10 px-3 py-2
                     bg-neutral-900/60 backdrop-blur-lg border border-white/5 
                     rounded-full shadow-lg"
        >
          <SiSpotify className="text-gray-500" size={16} />
          <span className="text-[10px] text-gray-500 font-medium">Offline</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
