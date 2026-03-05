"use client";
// components/Hero.tsx
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";

const slides = [
  {
    image: "/hero.jpg",
    title: "Benvenuti da F.lli Gaeta",
    subtitle: "Scopri le nostre Collezioni di arredamento uniche e di qualità",
    cta: { label: "Esplora le Collezioni", href: "/collezioni", scroll: false },
    promoLabel: null as string | null,
  },
  {
    image: "/hero2.jpg",
    title: null,
    subtitle: null,
    cta: { label: "Scopri l'Offerta", href: "#promo-primavera", scroll: true },
    promoLabel: "Promozione Primavera 2026",
  },
];

function CtaButton({ cta, style }: { cta: { label: string; href: string; scroll: boolean }; style?: React.CSSProperties }) {
  const baseStyle: React.CSSProperties = {
    background: "#dc2626", color: "#fff", fontSize: "1rem", letterSpacing: "0.05em",
    boxShadow: "0 4px 24px rgba(0,0,0,0.25)", textTransform: "uppercase",
    display: "inline-block", fontWeight: 600, padding: "14px 32px",
    borderRadius: "2px", transition: "all 0.3s ease", cursor: "pointer", border: "none",
    ...style,
  };
  const onEnter = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.background = "#b91c1c";
    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
  };
  const onLeave = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.background = "#dc2626";
    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
  };
  if (cta.scroll) {
    return (
      <button style={baseStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}
        onClick={() => document.getElementById("promo-primavera")?.scrollIntoView({ behavior: "smooth" })}>
        {cta.label}
      </button>
    );
  }
  return <Link href={cta.href} style={baseStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>{cta.label}</Link>;
}

const AUTOPLAY_DELAY = 10000;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const goTo = useCallback((index: number, dir: "left" | "right" = "right") => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => { setCurrent(index); setAnimating(false); }, 500);
  }, [animating]);

  const prev = () => goTo((current - 1 + slides.length) % slides.length, "left");
  const next = useCallback(() => goTo((current + 1) % slides.length, "right"), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, AUTOPLAY_DELAY);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];
  const isPromo = !!slide.promoLabel;

  const dots = (dark = false) => (
    <div style={{ display: "flex", gap: "10px", alignItems: "center", justifyContent: "center" }}>
      {slides.map((_, i) => (
        <button key={i} onClick={() => goTo(i, i > current ? "right" : "left")}
          aria-label={`Slide ${i + 1}`}
          style={{
            width: i === current ? "32px" : "10px", height: "10px", borderRadius: "5px",
            background: i === current
              ? (dark ? "#dc2626" : "#fff")
              : (dark ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.5)"),
            border: "none", cursor: "pointer", transition: "all 0.3s ease", padding: 0,
          }} />
      ))}
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes progress { from { width: 0% } to { width: 100% } }
        .hero-slide2-mobile { display: none; }
        .hero-slide2-desktop { display: flex; }
        @media (max-width: 767px) {
          .hero-slide2-mobile { display: flex; }
          .hero-slide2-desktop { display: none !important; }
        }
      `}</style>

      {/* ── SLIDE 2 su MOBILE: layout verticale dedicato ── */}
      {isPromo && (
        <div className="hero-slide2-mobile" style={{
          flexDirection: "column", background: "#0f0f0f", width: "100%",
          opacity: animating ? 0 : 1, transition: "opacity 0.5s ease",
        }}>
          {/* Immagine quadrata a tutta larghezza */}
          <div style={{ width: "100%", aspectRatio: "1 / 1", overflow: "hidden", flexShrink: 0 }}>
            <img src={slide.image} alt="Promozione Primavera 2026"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
          </div>
          {/* Barra inferiore scura con bottone e dots */}
          <div style={{
            background: "#0f0f0f", display: "flex", flexDirection: "column",
            alignItems: "center", gap: "14px", padding: "20px 16px 24px",
          }}>
            <CtaButton cta={slide.cta} style={{ fontSize: "0.9rem", padding: "13px 36px", width: "100%", textAlign: "center" }} />
            {dots(true)}
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase" }}>
              scorri per vedere di più
            </p>
          </div>
        </div>
      )}

      {/* ── SLIDE 1 su MOBILE (fullscreen normale) ── */}
      {!isPromo && (
        <div className="hero-slide2-mobile" style={{
          position: "relative", width: "100%", height: "100vh", overflow: "hidden",
          opacity: animating ? 0 : 1, transition: "opacity 0.5s ease",
        }}>
          <img src={slide.image} alt="Hero"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.55))" }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 24px" }}>
            <div style={{ textAlign: "center" }}>
              <h1 style={{ color: "#fff", fontWeight: 700, fontFamily: "'Georgia', serif", fontSize: "clamp(1.8rem, 8vw, 3rem)", textShadow: "0 2px 20px rgba(0,0,0,0.4)", marginBottom: "12px", lineHeight: 1.2 }}>
                {slide.title}
              </h1>
              {slide.subtitle && (
                <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "1rem", marginBottom: "24px", textShadow: "0 1px 8px rgba(0,0,0,0.3)" }}>
                  {slide.subtitle}
                </p>
              )}
              <CtaButton cta={slide.cta} />
            </div>
          </div>
          <div style={{ position: "absolute", bottom: "24px", left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            {dots()}
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase" }}>scorri per vedere di più</p>
          </div>
        </div>
      )}

      {/* ── DESKTOP: entrambe le slide fullscreen ── */}
      <section className="hero-slide2-desktop" style={{
        position: "relative", width: "100%", height: "100vh", overflow: "hidden",
      }}>
        {/* Immagine */}
        <div style={{ position: "absolute", inset: 0, opacity: animating ? 0 : 1, transition: "opacity 0.5s ease" }}>
          <img src={slide.image} alt="Hero"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: isPromo ? "center 30%" : "center", display: "block" }} />
          <div style={{ position: "absolute", inset: 0, background: isPromo
            ? "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, transparent 40%, rgba(0,0,0,0.5) 100%)"
            : "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.55))" }} />
        </div>

        {/* Contenuto */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 10,
          opacity: animating ? 0 : 1,
          transform: animating ? `translateX(${direction === "right" ? "-40px" : "40px"})` : "translateX(0)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}>
          {/* Slide 1 desktop */}
          {!isPromo && (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 24px" }}>
              <div style={{ textAlign: "center", maxWidth: "720px" }}>
                <h1 style={{ color: "#fff", fontWeight: 700, fontFamily: "'Georgia', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", textShadow: "0 2px 20px rgba(0,0,0,0.4)", marginBottom: "16px", lineHeight: 1.2 }}>
                  {slide.title}
                </h1>
                {slide.subtitle && (
                  <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "clamp(1rem, 1.5vw, 1.25rem)", marginBottom: "32px", textShadow: "0 1px 8px rgba(0,0,0,0.3)" }}>
                    {slide.subtitle}
                  </p>
                )}
                <CtaButton cta={slide.cta} />
              </div>
            </div>
          )}

          {/* Slide 2 desktop */}
          {isPromo && (
            <div style={{ position: "absolute", bottom: "80px", left: "64px", display: "flex", flexDirection: "column", gap: "16px", alignItems: "flex-start" }}>
              <div style={{ borderLeft: "3px solid #dc2626", paddingLeft: "14px" }}>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "4px" }}>F.lli Gaeta</p>
                <p style={{ color: "#fff", fontSize: "clamp(1.1rem, 2vw, 1.6rem)", fontWeight: 700, fontFamily: "'Georgia', serif", textShadow: "0 2px 12px rgba(0,0,0,0.5)", lineHeight: 1.2 }}>
                  {slide.promoLabel}
                </p>
              </div>
              <CtaButton cta={slide.cta} style={{ fontSize: "0.9rem", padding: "12px 28px" }} />
            </div>
          )}
        </div>

        {/* Frecce desktop */}
        {[{ dir: "prev", pos: "left-8", points: "15 18 9 12 15 6" }, { dir: "next", pos: "right-8", points: "9 18 15 12 9 6" }].map((btn) => (
          <button key={btn.dir} onClick={btn.dir === "prev" ? prev : next}
            className={`absolute ${btn.pos} top-1/2 -translate-y-1/2 z-20 flex items-center justify-center`}
            style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", cursor: "pointer" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.25)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points={btn.points} />
            </svg>
          </button>
        ))}

        {/* Dots desktop */}
        <div style={{ position: "absolute", bottom: "28px", left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 20 }}>
          {dots()}
        </div>

        {/* Progress bar */}
        <div style={{ position: "absolute", bottom: 0, left: 0, height: "2px", background: "rgba(255,255,255,0.6)", animation: `progress ${AUTOPLAY_DELAY}ms linear infinite`, zIndex: 20 }} />
      </section>
    </>
  );
}