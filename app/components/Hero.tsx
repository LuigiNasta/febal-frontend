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
  const base: React.CSSProperties = {
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
      <button style={base} onMouseEnter={onEnter} onMouseLeave={onLeave}
        onClick={() => document.getElementById("promo-primavera")?.scrollIntoView({ behavior: "smooth" })}>
        {cta.label}
      </button>
    );
  }
  return <Link href={cta.href} style={base} onMouseEnter={onEnter} onMouseLeave={onLeave}>{cta.label}</Link>;
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

  return (
    <>
      <style>{`
        @keyframes progress { from { width: 0% } to { width: 100% } }

        /* Slide 1: fullscreen su tutti i dispositivi */
        .hero-slide1 { height: 100vh; }

        /* Slide 2 su mobile: altezza proporzionale 16:9 + barra bottone */
        .hero-wrap-promo { display: flex; flex-direction: column; }
        .hero-img-promo {
          position: relative;
          width: 100%;
          /* 56.25% = altezza di un'immagine 16:9 larga 100% */
          padding-top: 56.25%;
          overflow: hidden;
          flex-shrink: 0;
        }
        .hero-img-promo img {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center center;
          display: block;
        }
        .hero-bar-mobile {
          background: #0f0f0f;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          padding: 20px 16px 22px;
        }

        /* Su desktop: slide 2 diventa fullscreen come slide 1 */
        @media (min-width: 768px) {
          .hero-wrap-promo {
            flex-direction: row;
            position: relative;
            height: 100vh;
            overflow: hidden;
          }
          .hero-img-promo {
            position: absolute;
            inset: 0;
            padding-top: 0;
            height: 100%;
          }
          .hero-bar-mobile { display: none; }
        }
      `}</style>

      {/* ── SLIDE 1 (fullscreen sempre) ── */}
      {!isPromo && (
        <section className="hero-slide1" style={{
          position: "relative", width: "100%", overflow: "hidden",
          opacity: animating ? 0 : 1, transition: "opacity 0.5s ease",
        }}>
          <img src={slide.image} alt="Hero"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.55))" }} />

          {/* Testo centrato */}
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 24px", zIndex: 10,
            transform: animating ? `translateX(${direction === "right" ? "-40px" : "40px"})` : "translateX(0)",
            transition: "transform 0.5s ease" }}>
            <div style={{ textAlign: "center", maxWidth: "720px" }}>
              <h1 style={{ color: "#fff", fontWeight: 700, fontFamily: "'Georgia', serif",
                fontSize: "clamp(1.8rem, 5vw, 3.5rem)", textShadow: "0 2px 20px rgba(0,0,0,0.4)",
                marginBottom: "14px", lineHeight: 1.2 }}>{slide.title}</h1>
              {slide.subtitle && (
                <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "clamp(1rem, 2vw, 1.25rem)",
                  marginBottom: "28px", textShadow: "0 1px 8px rgba(0,0,0,0.3)" }}>{slide.subtitle}</p>
              )}
              <CtaButton cta={slide.cta} />
            </div>
          </div>

          {/* Frecce desktop */}
          <button onClick={prev} aria-label="Precedente"
            className="hidden md:flex" style={{ position: "absolute", left: "32px", top: "50%", transform: "translateY(-50%)", zIndex: 20, width: "48px", height: "48px", borderRadius: "50%", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", cursor: "pointer", alignItems: "center", justifyContent: "center" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.25)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <button onClick={next} aria-label="Successiva"
            className="hidden md:flex" style={{ position: "absolute", right: "32px", top: "50%", transform: "translateY(-50%)", zIndex: 20, width: "48px", height: "48px", borderRadius: "50%", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", cursor: "pointer", alignItems: "center", justifyContent: "center" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.25)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
          </button>

          {/* Dots */}
          <div style={{ position: "absolute", bottom: "24px", left: 0, right: 0, display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", gap: "8px", zIndex: 20 }}>
            <div style={{ display: "flex", gap: "10px" }}>
              {slides.map((_, i) => (
                <button key={i} onClick={() => goTo(i, i > current ? "right" : "left")}
                  style={{ width: i === current ? "32px" : "10px", height: "10px", borderRadius: "5px", background: i === current ? "#fff" : "rgba(255,255,255,0.45)", border: "none", cursor: "pointer", transition: "all 0.3s ease", padding: 0 }} />
              ))}
            </div>
            <p className="md:hidden" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase" }}>scorri per vedere di più</p>
          </div>

          <div style={{ position: "absolute", bottom: 0, left: 0, height: "2px", background: "rgba(255,255,255,0.6)", animation: `progress ${AUTOPLAY_DELAY}ms linear infinite`, zIndex: 20 }} />
        </section>
      )}

      {/* ── SLIDE 2 ── */}
      {isPromo && (
        <div className="hero-wrap-promo" style={{ opacity: animating ? 0 : 1, transition: "opacity 0.5s ease", width: "100%" }}>

          {/* Immagine — mobile: padding-top 56.25% per aspect ratio 16:9 / desktop: absolute fullscreen */}
          <div className="hero-img-promo">
            <img src={slide.image} alt="Promozione Primavera 2026" />
            {/* Gradient overlay desktop */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, transparent 40%, rgba(0,0,0,0.55) 100%)" }} />

            {/* Etichetta + bottone desktop (overlay in basso a sinistra) */}
            <div className="hidden md:flex" style={{ position: "absolute", bottom: "80px", left: "64px", flexDirection: "column", gap: "16px", alignItems: "flex-start", zIndex: 10,
              transform: animating ? `translateX(${direction === "right" ? "-40px" : "40px"})` : "translateX(0)",
              transition: "transform 0.5s ease" }}>
              <div style={{ borderLeft: "3px solid #dc2626", paddingLeft: "14px" }}>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "4px" }}>F.lli Gaeta</p>
                <p style={{ color: "#fff", fontSize: "clamp(1.1rem, 2vw, 1.6rem)", fontWeight: 700, fontFamily: "'Georgia', serif", textShadow: "0 2px 12px rgba(0,0,0,0.5)", lineHeight: 1.2 }}>{slide.promoLabel}</p>
              </div>
              <CtaButton cta={slide.cta} style={{ fontSize: "0.9rem", padding: "12px 28px" }} />
            </div>

            {/* Frecce desktop */}
            <button onClick={prev} aria-label="Precedente"
              className="hidden md:flex" style={{ position: "absolute", left: "32px", top: "50%", transform: "translateY(-50%)", zIndex: 20, width: "48px", height: "48px", borderRadius: "50%", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", cursor: "pointer", alignItems: "center", justifyContent: "center" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.25)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <button onClick={next} aria-label="Successiva"
              className="hidden md:flex" style={{ position: "absolute", right: "32px", top: "50%", transform: "translateY(-50%)", zIndex: 20, width: "48px", height: "48px", borderRadius: "50%", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", cursor: "pointer", alignItems: "center", justifyContent: "center" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.25)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
            </button>

            {/* Dots desktop */}
            <div className="hidden md:flex" style={{ position: "absolute", bottom: "24px", left: 0, right: 0, justifyContent: "center", zIndex: 20, gap: "10px" }}>
              {slides.map((_, i) => (
                <button key={i} onClick={() => goTo(i, i > current ? "right" : "left")}
                  style={{ width: i === current ? "32px" : "10px", height: "10px", borderRadius: "5px", background: i === current ? "#fff" : "rgba(255,255,255,0.45)", border: "none", cursor: "pointer", transition: "all 0.3s ease", padding: 0 }} />
              ))}
            </div>

            <div className="hidden md:block" style={{ position: "absolute", bottom: 0, left: 0, height: "2px", background: "rgba(255,255,255,0.6)", animation: `progress ${AUTOPLAY_DELAY}ms linear infinite`, zIndex: 20 }} />
          </div>

          {/* Barra mobile sotto l'immagine */}
          <div className="hero-bar-mobile">
            <CtaButton cta={slide.cta} style={{ fontSize: "0.9rem", padding: "13px 36px", width: "100%", textAlign: "center" as const }} />
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              {slides.map((_, i) => (
                <button key={i} onClick={() => goTo(i, i > current ? "right" : "left")}
                  style={{ width: i === current ? "32px" : "10px", height: "10px", borderRadius: "5px", background: i === current ? "#dc2626" : "rgba(255,255,255,0.3)", border: "none", cursor: "pointer", transition: "all 0.3s ease", padding: 0 }} />
              ))}
            </div>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase" }}>
              scorri per vedere di più
            </p>
          </div>
        </div>
      )}
    </>
  );
}