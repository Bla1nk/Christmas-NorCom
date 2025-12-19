'use client';

import { useEffect, useRef, useState } from 'react';

const VIDEO_SRC = './video/video6.mp4';
const VIDEO_SRC_MOBILE = './video/video6_mobile.mp4';

export default function Home() {
  const [videoSrc, setVideoSrc] = useState(VIDEO_SRC);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const prefersDataSaver =
      typeof navigator !== 'undefined' &&
      (navigator as any).connection?.saveData;
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

    if ((isMobile || prefersDataSaver) && VIDEO_SRC_MOBILE) {
      setVideoSrc(VIDEO_SRC_MOBILE);
    }
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;
    const playPromise = videoRef.current.play();
    playPromise?.catch(() => {
      // Autoplay might be blocked; video remains muted and controls stay hidden.
    });
  }, [videoSrc]);

  return (
    <div className="relative min-h-[100dvh] md:min-h-screen bg-[#737b84] md:bg-gray-900 overflow-hidden flex items-center justify-center">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.24)_0%,_rgba(255,255,255,0.15)_50%,_rgba(255,255,255,0)_83%)] md:bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.18)_0%,_rgba(255,255,255,0.1)_54%,_rgba(255,255,255,0)_89%)]"
        aria-hidden
      />
      <video
        ref={videoRef}
        className="relative z-10 max-w-[100vw] max-h-[100vh] max-h-[100dvh] w-auto h-auto object-contain"
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        controls={false}
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 md:h-32 bg-gradient-to-b from-[#737b84] md:from-gray-900 to-transparent z-20" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 md:h-32 bg-gradient-to-t from-[#737b84] md:from-gray-900 to-transparent z-20" />
    </div>
  );
}
