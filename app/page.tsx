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
    <div className="relative min-h-[100dvh] md:min-h-screen bg-black overflow-hidden flex items-center justify-center">
      <video
        ref={videoRef}
        className="w-full h-auto max-h-full object-contain"
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        controls={false}
      />
    </div>
  );
}
