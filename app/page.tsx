'use client';

import { useEffect, useRef, useState } from 'react';
import { Sparkles, Star } from 'lucide-react';

const VIDEO_SRC = './video/video6.mp4';
const CARD_OPEN_DELAY_MS = 700;
const CARD_ANIMATION_MS = 800;
const VIDEO_FADE_DURATION_MS = 0;

export default function Home() {
  const [isOpening, setIsOpening] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const openTimer = window.setTimeout(
      () => setIsOpening(true),
      CARD_OPEN_DELAY_MS
    );
    const videoTimer = window.setTimeout(
      () => setShowVideo(true),
      CARD_OPEN_DELAY_MS + CARD_ANIMATION_MS - VIDEO_FADE_DURATION_MS
    );

    return () => {
      window.clearTimeout(openTimer);
      window.clearTimeout(videoTimer);
    };
  }, []);

  useEffect(() => {
    if (!showVideo || !videoRef.current) return;
    const playPromise = videoRef.current.play();
    playPromise?.catch(() => {
      // Autoplay might be blocked; video remains muted and controls stay hidden.
    });
  }, [showVideo]);

  return (
    <div className="relative min-h-[100dvh] md:min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-green-900 overflow-hidden">
      <div
        className={`absolute inset-0 transition-opacity duration-0 ${
          showVideo ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <video
          ref={videoRef}
          className="h-full w-full object-cover bg-black"
          src={VIDEO_SRC}
          autoPlay
          muted
          playsInline
          controls={false}
        />
      </div>

      <div
        className={`relative z-10 min-h-[100dvh] md:min-h-screen flex items-center justify-center perspective-1000 transition-all duration-700 ease-out ${
          showVideo ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        <div className={`card-container ${isOpening ? 'opening' : ''}`}>
          <div className="card-left bg-gradient-to-br from-red-700 to-red-900 shadow-2xl flex items-center justify-center">
            <div className="text-center space-y-4 text-white">
              <Star className="w-16 h-16 text-yellow-300 drop-shadow-lg" />
              <p className="text-xl font-semibold tracking-wide">Frohe</p>
            </div>
          </div>

          <div className="card-right bg-gradient-to-br from-green-700 to-green-900 shadow-2xl flex items-center justify-center">
            <div className="text-center space-y-4 text-white">
              <Sparkles className="w-16 h-16 text-yellow-200 drop-shadow-lg" />
              <p className="text-xl font-semibold tracking-wide">Weihnachten</p>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/20 transition-opacity duration-0 ${
          showVideo ? 'opacity-0' : 'opacity-30'
        }`}
      />
    </div>
  );
}
