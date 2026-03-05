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
    cta: { label: "Esplora le Collezioni", href: "/collezioni", scroll: false },
    accent: false,
    promoLabel: null,
  },
  {
    image: "/hero2.jpg",
    badge: null,
    title: null,
    subtitle: null,
    promo: null,
    cta: { label: "Scopri l'Offerta", href: "#promo-primavera", scroll: true },
    accent: false,
    promoLabel: "Promozione Primavera 2026",
  },
];

function CtaButton({
  cta,
  style,
}: {
  cta: { label: string; href: string; scroll: boolean };
  style?: React.CSSProperties;
}) {
  const baseStyle: React.CSSProperties = {
    background: "#dc2626",
    color: "#fff",
    fontSize: "1rem",
    letterSpacing: "0.05em",
    boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
    textTransform: "uppercase",
    display: "inline-block",
    fontWeight: 600,
    padding: "14px 32px",
    borderRadius: "2px",
    transition: "all 0.3s ease",
    cursor: "pointer",
    border: "none",
    ...style,
  };

  const handleHover = (e: React.MouseEvent<HTMLElement>, enter: boolean) => {
    (e.currentTarget as HTMLElement).style.transform = enter ? "translateY(-2px)" : "translateY(0)";
    (e.currentTarget as HTMLElement).style.boxShadow = enter
      ? "0 8px 32px rgba(0,0,0,0.35)"
      : "0 4px 24px rgba(0,0,0,0.25)";
    (e.currentTarget as HTMLElement).style.background = enter ? "#b91c1c" : "#dc2626";
  };

  if (cta.scroll) {
    return (
      <button
        style={baseStyle}
        onMouseEnter={(e) => handleHover(e, true)}
        onMouseLeave={(e) => handleHover(e, false)}
        onClick={() => {
          document.getElementById("promo-primavera")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        {cta.label}
      </button>
    );
  }

  return (
    <Link
      href={cta.href}
      style={baseStyle}
      onMouseEnter={(e) => handleHover(e, true)}
      onMouseLeave={(e) => handleHover(e, false)}
    >
      {cta.label}
    </Link>
  );
}

const AUTOPLAY_DELAY = 10000;

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
          style={{ objectPosition: slide.promoLabel ? "top center" : "center center" }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div
        className="absolute inset-0 z-10"
        style={{
          opacity: animating ? 0 : 1,
          transform: animating
            ? `translateX(${direction === "right" ? "-40px" : "40px"})`
            : "translateX(0)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        {/* Slide 1 — centered layout */}
        {!slide.promoLabel && (
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="text-center max-w-3xl mx-auto">
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
              <CtaButton cta={slide.cta} />
            </div>
          </div>
        )}

        {/* Slide 2 — bottom-left promo label + red button */}
        {slide.promoLabel && (
          <div className="absolute bottom-20 left-8 md:left-16 flex flex-col items-start gap-4">
            <div style={{
              borderLeft: "3px solid #dc2626",
              paddingLeft: "14px",
            }}>
              <p
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginBottom: "4px",
                }}
              >
                F.lli Gaeta
              </p>
              <p
                style={{
                  color: "#fff",
                  fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)",
                  fontWeight: 700,
                  fontFamily: "'Georgia', serif",
                  letterSpacing: "0.02em",
                  textShadow: "0 2px 12px rgba(0,0,0,0.5)",
                  lineHeight: 1.2,
                }}
              >
                {slide.promoLabel}
              </p>
            </div>
            <CtaButton cta={slide.cta} style={{ fontSize: "0.9rem", padding: "12px 28px" }} />
          </div>
        )}
      </div>

      {/* Navigation arrows — solo desktop */}
      <button
        onClick={prev}
        aria-label="Slide precedente"
        className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-20 items-center justify-center transition-all duration-200"
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
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.25)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)"; }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        onClick={next}
        aria-label="Slide successiva"
        className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 items-center justify-center transition-all duration-200"
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
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.25)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)"; }}
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