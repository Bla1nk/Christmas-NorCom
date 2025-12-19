'use client';

import { useState, useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import type gsap from 'gsap';
import type { LucideIcon } from 'lucide-react';
import {
  Sparkles,
  Heart,
  Star,
  ChevronsDown,
  Rocket,
  Users,
  Shield,
  Trophy,
} from 'lucide-react';

export default function Home() {
  const [isOpening, setIsOpening] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [santaFlying, setSantaFlying] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [snowflakes, setSnowflakes] = useState<
    Array<{
      id: number;
      left: number;
      animationDelay: number;
      animationDuration: number;
      opacity: number;
    }>
  >([]);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const santaTrackerRef = useRef<HTMLDivElement | null>(null);
  const scrollHintDismissed = useRef(false);
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

  const createSnowflakes = () =>
    [...Array(50)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDelay: Math.random() * 10,
      animationDuration: 10 + Math.random() * 20,
      opacity: Math.random() * 0.6 + 0.4,
    }));

  const roadmapItems: Array<{
    title: string;
    quarter: string;
    description: string;
    imageLabel: string;
    icon: LucideIcon;
    from: string;
    to: string;
  }> = [
    {
      quarter: '20. Jan.',
      title:
        'Auftrag vom zentralen IT-Dienstleister der Bundesbehörden',
      description:
        'Betrieb und Weiterentwicklung einer datengetriebenen Plattform mit Fokus auf Security, Performance und Hochverfügbarkeit.',
      imageLabel: 'Datenplattform Bundesbehörden',
      icon: Shield,
      from: 'from-purple-200/80',
      to: 'to-indigo-200/80',
    },
    {
      quarter: '12. März',
      title: 'Consulting-Auftrag „System-Management“',
      description:
        'Zuschlag für Architektur, Betrieb und Optimierung komplexer IT-Systeme inklusive Automatisierung und Dokumentation.',
      imageLabel: 'System-Management',
      icon: Rocket,
      from: 'from-amber-200/80',
      to: 'to-orange-200/80',
    },
    {
      quarter: '2. Dez.',
      title: 'BSFZ-Siegel für innovative FuE-Arbeit',
      description:
        'Auszeichnung der Bescheinigungsstelle Forschungszulage (BSFZ) für unsere Forschungs- und Entwicklungsprojekte.',
      imageLabel: 'BSFZ 2025',
      icon: Trophy,
      from: 'from-pink-200/80',
      to: 'to-rose-200/80',
    },
  ];

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

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setSnowflakes(createSnowflakes());
    let ctx: gsap.Context | null = null;
    let tween: any;

    const setupScroll = async () => {
      if (!timelineRef.current || !santaTrackerRef.current) return;
      const gsapModule = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      const gsap = gsapModule.gsap;
      gsap.registerPlugin(ScrollTrigger);

      const target = santaTrackerRef.current;
      const container = timelineRef.current;

      ctx = gsap.context(() => {
        tween = gsap.fromTo(
          target,
          { y: 0 },
          {
            y: () => {
              const track =
                (container?.offsetHeight ?? 0) - (target?.offsetHeight ?? 0);
              return Math.max(track, 0);
            },
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'top center',
              end: 'bottom center',
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      }, container);
    };

    setupScroll();

    return () => {
      tween?.scrollTrigger?.kill?.();
      tween?.kill?.();
      ctx?.revert();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === 'undefined') return;
      if (scrollHintDismissed.current) return;
      const doc = document.documentElement;
      const scrollY = window.scrollY || window.pageYOffset;
      const isPastIntro = scrollY > 120;
      const isNearBottom =
        scrollY + window.innerHeight >= doc.scrollHeight - 160;
      if (isPastIntro || isNearBottom) {
        setShowScrollHint(false);
        scrollHintDismissed.current = true;
        window.removeEventListener('scroll', handleScroll);
      }
    };

    const timeout = window.setTimeout(() => {
      if (!scrollHintDismissed.current) {
        setShowScrollHint(false);
        scrollHintDismissed.current = true;
        window.removeEventListener('scroll', handleScroll);
      }
    }, 4000);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-green-900 overflow-x-hidden relative">
      <div className="snowflakes fixed inset-0 pointer-events-none overflow-hidden">
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

      {showScrollHint && (
        <div className="fixed bottom-6 right-6 z-30 pointer-events-none">
          <div className="flex items-center gap-3 px-4 py-3 rounded-full bg-white/10 border border-yellow-200/30 backdrop-blur-md shadow-lg">
            <div className="relative flex items-center justify-center h-4 w-4">
              <span className="absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75 animate-ping" />
              <span className="relative inline-flex h-4 w-4 rounded-full bg-yellow-300" />
            </div>
            <p className="text-sm md:text-base font-semibold text-yellow-100">
              Nach unten scrollen
            </p>
            <ChevronsDown className="w-5 h-5 text-yellow-200 animate-bounce" />
          </div>
        </div>
      )}

      <section className="relative z-20 mt-20 bg-gradient-to-b from-red-900/80 via-red-800/70 to-green-900/80">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <div className="text-center space-y-4">
            <p className="text-sm uppercase tracking-[0.25em] text-yellow-200/80">
              Rückblick 2023
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow">
              Unsere gemeinsame Roadmap dieses Jahres
            </h2>
            <p className="text-base md:text-lg text-red-100/80 max-w-3xl mx-auto">
              Danke für Vertrauen, Ideen und Energie. Hier ein kurzer Flug über
              die Highlights, die wir zusammen möglich gemacht haben.
            </p>
          </div>

          <div ref={timelineRef} className="relative mt-14 md:px-6">
            <div className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-yellow-200/60 via-white/50 to-yellow-200/60 z-0" />
            <div
              className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-b from-yellow-200/10 via-white/5 to-yellow-200/10 blur-md z-0"
              aria-hidden
            />
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 pointer-events-none z-10">
              <div ref={santaTrackerRef} className="flex flex-col items-center">
                <div className="santa-sled text-5xl drop-shadow-lg">
                  🎅🛷
                </div>
                <div className="mt-2 text-xs text-yellow-100/80 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                  Wir begleiten Sie weiter
                </div>
              </div>
            </div>

            <div className="space-y-10 md:space-y-16">
              {roadmapItems.map((item, index) => {
                const ItemIcon = item.icon;
                const isLeft = index % 2 === 0;
                const Card = (
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm shadow-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg shadow-black/30 text-red-900 font-bold">
                        <ItemIcon className="w-6 h-6 text-red-900" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-yellow-100/80">
                          {item.quarter}
                        </p>
                        <h3 className="text-xl font-semibold text-white">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm md:text-base text-red-100/80 leading-relaxed">
                      {item.description}
                    </p>
                    <div
                      className={`mt-5 h-32 rounded-xl bg-gradient-to-br ${item.from} ${item.to} relative overflow-hidden shadow-inner shadow-black/30`}
                    >
                      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_20%,#fff,transparent_35%),radial-gradient(circle_at_80%_30%,#fff,transparent_30%)]" />
                      <div className="absolute bottom-3 left-4 flex items-center gap-2">
                        <span className="inline-flex h-10 w-10 rounded-full bg-white/70 text-red-900 font-semibold items-center justify-center shadow-lg shadow-black/20">
                          <ItemIcon className="w-5 h-5" />
                        </span>
                        <p className="text-sm font-semibold text-red-900 drop-shadow">
                          {item.imageLabel}
                        </p>
                      </div>
                    </div>
                  </div>
                );

                return (
                  <div
                    key={item.title}
                    className="relative md:grid md:grid-cols-[1fr_auto_1fr] md:items-start md:gap-x-10"
                  >
                    {isLeft ? (
                      <>
                        <div className="relative pl-12 md:pl-0 md:pr-12">
                          <div className="absolute left-[-2px] top-10 h-3 w-3 rounded-full bg-yellow-300 shadow-lg shadow-yellow-300/40 md:hidden z-10" />
                          {Card}
                        </div>
                        <div className="hidden md:flex md:col-start-2 md:col-end-3 relative">
                          <div className="absolute top-12 h-3 w-3 rounded-full bg-yellow-300 shadow-lg shadow-yellow-300/40 -translate-x-3 z-10" />
                        </div>
                        <div className="md:col-start-3 md:col-end-4" />
                      </>
                    ) : (
                      <>
                        <div className="md:col-start-1 md:col-end-2" />
                        <div className="hidden md:flex md:col-start-2 md:col-end-3 relative">
                          <div className="absolute top-12 h-3 w-3 rounded-full bg-yellow-300 shadow-lg shadow-yellow-300/40 translate-x-3 z-10" />
                        </div>
                        <div className="relative pl-12 md:pl-12">
                          <div className="absolute left-[-2px] top-10 h-3 w-3 rounded-full bg-yellow-300 shadow-lg shadow-yellow-300/40 md:hidden z-10" />
                          {Card}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
