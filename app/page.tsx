'use client';

import { useState, useEffect, useMemo } from 'react';
import type { CSSProperties } from 'react';
import { Sparkles, Heart, Star } from 'lucide-react';

export default function Home() {
  const [isOpening, setIsOpening] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [santaFlying, setSantaFlying] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [fireworkBursts, setFireworkBursts] = useState(() =>
    [...Array(10)].map((_, i) => ({
      id: i,
      top: 20 + Math.random() * 60,
      left: 10 + Math.random() * 80,
      hue: Math.floor(Math.random() * 360),
    }))
  );

  const createFireworkBursts = () =>
    [...Array(10)].map((_, i) => ({
      id: i,
      top: 20 + Math.random() * 60,
      left: 10 + Math.random() * 80,
      hue: Math.floor(Math.random() * 360),
    }));

  const snowflakes = useMemo(() =>
    [...Array(50)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDelay: Math.random() * 10,
      animationDuration: 10 + Math.random() * 20,
      opacity: Math.random() * 0.6 + 0.4,
    })),
    []
  );

  useEffect(() => {
    const openTimer = setTimeout(() => {
      setIsOpening(true);
    }, 500);

    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 2500);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-green-900 overflow-hidden relative">
      <div className="snowflakes absolute inset-0 pointer-events-none">
        {snowflakes.map((flake) => (
          <div
            key={flake.id}
            className="snowflake"
            style={{
              left: `${flake.left}%`,
              animationDelay: `${flake.animationDelay}s`,
              animationDuration: `${flake.animationDuration}s`,
              opacity: flake.opacity,
            }}
          >
            ❄
          </div>
        ))}
      </div>

      <div className="min-h-screen flex items-center justify-center perspective-1000">
        <div className={`card-container ${isOpening ? 'opening' : ''}`}>
          <div className="card-left bg-gradient-to-br from-red-700 to-red-900 shadow-2xl">
            <div className="card-front-design p-8 h-full flex flex-col items-center justify-center">
              <Star className="text-yellow-300 w-16 h-16 mb-4 animate-pulse" />
              <h2 className="text-3xl font-bold text-white text-center">
                Frohe
              </h2>
              <div className="mt-8 space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-12 h-1 bg-yellow-400 rounded-full opacity-50"
                    style={{ width: `${3 - i * 0.4}rem` }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="card-right bg-gradient-to-br from-green-700 to-green-900 shadow-2xl">
            <div className="card-back-design p-8 h-full flex flex-col items-center justify-center">
              <Sparkles className="text-yellow-300 w-16 h-16 mb-4 animate-pulse" />
              <h2 className="text-3xl font-bold text-white text-center">
                Weihnachten
              </h2>
              <div className="mt-8 space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-12 h-1 bg-yellow-400 rounded-full opacity-50 ml-auto"
                    style={{ width: `${3 - i * 0.4}rem` }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div
            className={`card-content ${
              showContent ? 'show' : ''
            } absolute inset-0 flex items-center justify-center pointer-events-none`}
          >
            <div className="max-w-3xl md:max-w-4xl mx-auto text-center space-y-8 px-8">
              <div className="wish-item">
                <Heart className="w-12 h-12 mx-auto mb-4 text-red-300" />
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
                  Frohe Weihnachten an unsere geschätzten Kundinnen und Kunden, Partner und Freunde
                </h1>
              </div>

              <div className="wish-item" style={{ animationDelay: '0.2s' }}>
                <p className="text-lg md:text-2xl text-red-50 leading-relaxed drop-shadow">
                  Vielen Dank für die vertrauensvolle Zusammenarbeit. Möge diese
                  Weihnachtszeit Ihnen Ruhe, Freude und besondere Momente mit Ihren
                  Liebsten schenken.
                </p>
              </div>

              <div className="wish-item" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center justify-center gap-4 text-yellow-300">
                  <Star className="w-8 h-8 animate-spin-slow" />
                  <Sparkles className="w-10 h-10" />
                  <Star className="w-8 h-8 animate-spin-slow" />
                </div>
              </div>

              <div className="wish-item" style={{ animationDelay: '0.6s' }}>
                <p className="text-base md:text-xl text-red-100 drop-shadow">
                  Wir wünschen Ihnen Gesundheit, Erfolg und viele gemeinsame Projekte
                  im neuen Jahr.
                </p>
              </div>

              <div className="wish-item" style={{ animationDelay: '0.8s' }}>
                <button
                  onClick={() => {
                    setSantaFlying(true);
                    setShowFireworks(true);
                    setFireworkBursts(createFireworkBursts());
                    setTimeout(() => setSantaFlying(false), 3000);
                    setTimeout(() => setShowFireworks(false), 2000);
                  }}
                  className="inline-block bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full border-2 border-yellow-300/50 hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer pointer-events-auto"
                >
                  <p className="text-lg md:text-2xl font-semibold text-yellow-200">
                    Festliche Grüße! 🎄<br/>
                    (Jetzt klicken!)
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {santaFlying && (
        <div className="santa-flying fixed top-1/3 -left-32 pointer-events-none z-50">
          <div className="text-8xl transform -rotate-12">
            🎅
          </div>
        </div>
      )}

      {showFireworks && (
        <div className="fireworks fixed inset-0 pointer-events-none z-40">
          {fireworkBursts.map((burst) => (
            <div
              key={burst.id}
              className="firework"
              style={
                {
                  top: `${burst.top}%`,
                  left: `${burst.left}%`,
                  '--hue': `${burst.hue}`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
