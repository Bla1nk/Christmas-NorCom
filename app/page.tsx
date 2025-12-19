'use client';

import { useEffect, useRef } from 'react';

const VIDEO_SRC = './video/video6.mp4';

export default function Home() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    const playPromise = videoRef.current.play();
    playPromise?.catch(() => {
      // Autoplay might be blocked; video remains muted and controls stay hidden.
    });
  }, []);

  return (
    <div className="relative min-h-[100dvh] md:min-h-screen bg-black overflow-hidden flex items-center justify-center">
      <video
        ref={videoRef}
        className="w-full h-auto max-h-full object-contain"
        src={VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        controls={false}
      />
    </div>
  );
}
