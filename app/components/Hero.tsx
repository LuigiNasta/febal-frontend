"use client";
// components/Hero.tsx
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";

const slides = [
  {
    image: "/hero.jpg",
    badge: null,
    title: "Benvenuti da F.lli Gaeta",
    subtitle: "Scopri le nostre Collezioni di arredamento uniche e di qualità",
    cta: { label: "Esplora le Collezioni", href: "/collezioni" },
    accent: false,
  },
  {
    image: "/hero2.jpg",
    badge: "🌸 Promozione Primavera 2026",
    title: "Il momento giusto per progettare i tuoi spazi è ora",
    subtitle: null,
    promo: [
      "Fino a 2.000€ di SCONTO su soggiorno e camera da letto",
      "Elettrodomestici e tavolo in ceramica a metà prezzo",
      "Top in gres in REGALO!",
    ],
    cta: { label: "Scopri l'Offerta", href: "/promozioni" },
    accent: true,
  },
];

const AUTOPLAY_DELAY = 5000;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const goTo = useCallback(
    (index: number, dir: "left" | "right" = "right") => {
      if (animating) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setAnimating(false);
      }, 500);
    },
    [animating]
  );

  const prev = () => {
    const idx = (current - 1 + slides.length) % slides.length;
    goTo(idx, "left");
  };

  const next = useCallback(() => {
    const idx = (current + 1) % slides.length;
    goTo(idx, "right");
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, AUTOPLAY_DELAY);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{ opacity: animating ? 0 : 1 }}
      >
        <img
          src={slide.image}
          alt="Hero"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div
        className="absolute inset-0 flex items-center justify-center z-10 px-4"
        style={{
          opacity: animating ? 0 : 1,
          transform: animating
            ? `translateX(${direction === "right" ? "-40px" : "40px"})`
            : "translateX(0)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        <div className="text-center max-w-3xl mx-auto">
          {slide.badge && (
            <span
              className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide"
              style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "#fff",
                letterSpacing: "0.08em",
              }}
            >
              {slide.badge}
            </span>
          )}

          <h1
            className="text-white font-bold mb-4 leading-tight"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              textShadow: "0 2px 20px rgba(0,0,0,0.4)",
              fontFamily: "'Georgia', serif",
            }}
          >
            {slide.title}
          </h1>

          {slide.subtitle && (
            <p
              className="text-white/90 mb-8"
              style={{
                fontSize: "clamp(1rem, 2vw, 1.25rem)",
                textShadow: "0 1px 8px rgba(0,0,0,0.3)",
              }}
            >
              {slide.subtitle}
            </p>
          )}

          {slide.promo && (
            <ul className="mb-8 space-y-2">
              {slide.promo.map((item, i) => (
                <li
                  key={i}
                  className="text-white font-medium"
                  style={{
                    fontSize: "clamp(0.9rem, 1.8vw, 1.1rem)",
                    textShadow: "0 1px 6px rgba(0,0,0,0.4)",
                  }}
                >
                  <span
                    className="inline-block w-2 h-2 rounded-full mr-2 align-middle"
                    style={{ background: "#e8c96a", marginBottom: "2px" }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          )}

          <Link
            href={slide.cta.href}
            className="inline-block font-semibold px-8 py-3.5 rounded-sm transition-all duration-300"
            style={{
              background: slide.accent
                ? "linear-gradient(135deg, #c8972a, #e8c96a)"
                : "#dc2626",
              color: slide.accent ? "#1a1008" : "#fff",
              fontSize: "1rem",
              letterSpacing: "0.05em",
              boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
              textTransform: "uppercase",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform =
                "translateY(-2px)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 8px 32px rgba(0,0,0,0.35)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 4px 24px rgba(0,0,0,0.25)";
            }}
          >
            {slide.cta.label}
          </Link>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        aria-label="Slide precedente"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center transition-all duration-200"
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.25)",
          color: "#fff",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background =
            "rgba(255,255,255,0.25)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background =
            "rgba(255,255,255,0.12)";
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        onClick={next}
        aria-label="Slide successiva"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center transition-all duration-200"
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.25)",
          color: "#fff",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background =
            "rgba(255,255,255,0.25)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background =
            "rgba(255,255,255,0.12)";
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3 items-center">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? "right" : "left")}
            aria-label={`Vai alla slide ${i + 1}`}
            style={{
              width: i === current ? "28px" : "8px",
              height: "8px",
              borderRadius: "4px",
              background: i === current ? "#fff" : "rgba(255,255,255,0.45)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div
        className="absolute bottom-0 left-0 h-0.5 z-20"
        style={{
          background: "rgba(255,255,255,0.6)",
          animation: `progress ${AUTOPLAY_DELAY}ms linear infinite`,
        }}
      />

      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}