"use client";
// components/PromoSection.tsx
import { useState } from "react";

const promoCards = [
  { image: "/off1.PNG", alt: "Il momento giusto per i tuoi nuovi spazi è ora" },
  { image: "/off2.PNG", alt: "Fino a 2.000€ di sconto su soggiorno e camera da letto" },
  { image: "/off3.PNG", alt: "Elettrodomestici e tavolo in ceramica a metà prezzo" },
  { image: "/off4.PNG", alt: "Top in gres in regalo" },
];

export default function PromoSection() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section id="promo-primavera" className="bg-white py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#dc2626", marginBottom: "12px" }}>
            Dal 13 Febbraio al 31 Maggio 2026
          </p>
          <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, color: "#1a1a1a", lineHeight: 1.2, marginBottom: "16px" }}>
            Promozione Primavera 2026
          </h2>
          <p style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)", color: "#555", maxWidth: "620px", margin: "0 auto", lineHeight: 1.7 }}>
            Il momento giusto per progettare i tuoi spazi è ora. Più valore ai tuoi ambienti, più vantaggi per te.
          </p>
        </div>

        {/* 4 images grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }} className="md:grid-cols-4">
          {promoCards.map((card, i) => (
            <div key={i} style={{ borderRadius: "4px", overflow: "hidden", aspectRatio: "1 / 1" }}>
              <img
                src={card.image}
                alt={card.alt}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s ease" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.03)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
              />
            </div>
          ))}
        </div>

        {/* Offer highlights */}
        <div style={{ marginTop: "48px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px" }}>
          {[
            { value: "2.000€", label: "di sconto su soggiorno\ne camera da letto", prefix: "Fino a" },
            { value: "Metà prezzo", label: "su elettrodomestici e tavolo\ncon top in ceramica", prefix: "" },
            { value: "In regalo", label: "il top cucina\nin gres Optimum", prefix: "" },
          ].map((item, i) => (
            <div key={i} style={{ borderTop: "2px solid #dc2626", paddingTop: "16px" }}>
              {item.prefix && (
                <p style={{ fontSize: "0.8rem", color: "#888", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "2px" }}>{item.prefix}</p>
              )}
              <p style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)", fontWeight: 800, color: "#1a1a1a", lineHeight: 1.1, marginBottom: "6px" }}>{item.value}</p>
              <p style={{ fontSize: "0.88rem", color: "#666", lineHeight: 1.5, whiteSpace: "pre-line" }}>{item.label}</p>
            </div>
          ))}
        </div>

        {/* Description */}
        <div style={{ marginTop: "40px", padding: "28px 32px", background: "#f9f9f9", borderLeft: "3px solid #dc2626", borderRadius: "2px" }}>
          <p style={{ fontSize: "0.95rem", color: "#444", lineHeight: 1.8, marginBottom: "12px" }}>
            Acquista una <strong>cucina completa</strong> con almeno 4 elettrodomestici Beko, Hotpoint o Whirlpool (forno, frigo, piano cottura, lavastoviglie + eventuale microonde) e ottieni gli elettrodomestici <strong>a metà prezzo</strong> e il piano di lavoro Optimum lineare <strong>in omaggio</strong>.
          </p>
          <p style={{ fontSize: "0.95rem", color: "#444", lineHeight: 1.8 }}>
            Con l'acquisto di arredi <strong>Giorno, Notte o Momenti</strong> da almeno 4.570€ ottieni <strong>1.000€ di sconto</strong>; da 8.090€ ottieni <strong>2.000€ di sconto</strong>. Il tavolo con top in gres è acquistabile a <strong>metà prezzo</strong>.
          </p>
        </div>

        {/* Fine print */}
        <p style={{ marginTop: "16px", fontSize: "0.75rem", color: "#aaa", lineHeight: 1.6 }}>
          * Offerta valida dal 13/02/2026 al 31/05/2026 presso i punti vendita Febal Casa aderenti all'iniziativa. Sconto di 1.000€ e 2.000€ attivabili presentando il coupon scaricabile su febalcasa.com. Finiture selezionate e lavorazioni escluse.
        </p>

        {/* CTA */}
        <div style={{ marginTop: "36px", textAlign: "center" }}>
          <button
            onClick={() => setShowModal(true)}
            style={{
              display: "inline-block",
              background: "#dc2626",
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.95rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "15px 40px",
              borderRadius: "2px",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(220,38,38,0.3)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#b91c1c";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#dc2626";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            Prenota una consulenza gratuita
          </button>
        </div>

      </div>

      {/* Contact Modal */}
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(4px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: "4px",
              width: "100%",
              maxWidth: "420px",
              padding: "36px 32px",
              boxShadow: "0 24px 60px rgba(0,0,0,0.2)",
              position: "relative",
            }}
          >
            {/* Close */}
            <button
              onClick={() => setShowModal(false)}
              style={{ position: "absolute", top: "14px", right: "16px", background: "none", border: "none", cursor: "pointer", color: "#999", fontSize: "1.6rem", lineHeight: 1 }}
            >
              ×
            </button>

            {/* Title */}
            <div style={{ borderLeft: "3px solid #dc2626", paddingLeft: "12px", marginBottom: "28px" }}>
              <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#dc2626", marginBottom: "4px" }}>
                F.lli Gaeta
              </p>
              <h3 style={{ fontFamily: "'Georgia', serif", fontSize: "1.35rem", fontWeight: 700, color: "#1a1a1a", lineHeight: 1.2 }}>
                Prenota una consulenza gratuita
              </h3>
            </div>

            {/* Email */}
            <a
              href="mailto:flligaeta@libero.it?subject=Consulenza%20gratuita%20-%20Promo%20Primavera%202026&body=Buongiorno%2C%20vorrei%20prenotare%20una%20consulenza%20gratuita%20per%20la%20Promozione%20Primavera%202026."
              style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px 18px", background: "#fff5f5", border: "1px solid #fecaca", borderRadius: "4px", marginBottom: "12px", textDecoration: "none", transition: "background 0.2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#fee2e2")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#fff5f5")}
            >
              <div style={{ width: "40px", height: "40px", background: "#dc2626", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div>
                <p style={{ fontSize: "0.72rem", fontWeight: 600, color: "#dc2626", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "2px" }}>Scrivici una mail</p>
                <p style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1a1a1a" }}>flligaeta@libero.it</p>
              </div>
            </a>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "18px 0" }}>
              <div style={{ flex: 1, height: "1px", background: "#e5e7eb" }} />
              <span style={{ fontSize: "0.75rem", color: "#aaa", fontWeight: 500 }}>oppure chiamaci</span>
              <div style={{ flex: 1, height: "1px", background: "#e5e7eb" }} />
            </div>

            {/* Phone 1 */}
            <a
              href="tel:081948905"
              style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px 18px", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "4px", marginBottom: "10px", textDecoration: "none", transition: "background 0.2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#f3f4f6")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#f9fafb")}
            >
              <div style={{ width: "40px", height: "40px", background: "#1a1a1a", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </div>
              <div>
                <p style={{ fontSize: "0.72rem", fontWeight: 600, color: "#666", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "2px" }}>Telefono fisso</p>
                <p style={{ fontSize: "1rem", fontWeight: 700, color: "#1a1a1a" }}>081 948905</p>
              </div>
            </a>

            {/* Phone 2 */}
            <a
              href="tel:+393333038342"
              style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px 18px", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "4px", textDecoration: "none", transition: "background 0.2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#f3f4f6")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#f9fafb")}
            >
              <div style={{ width: "40px", height: "40px", background: "#1a1a1a", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                  <line x1="12" y1="18" x2="12.01" y2="18"/>
                </svg>
              </div>
              <div>
                <p style={{ fontSize: "0.72rem", fontWeight: 600, color: "#666", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "2px" }}>Cellulare</p>
                <p style={{ fontSize: "1rem", fontWeight: 700, color: "#1a1a1a" }}>+39 333 303 8342</p>
              </div>
            </a>

            <p style={{ marginTop: "20px", fontSize: "0.78rem", color: "#aaa", textAlign: "center", lineHeight: 1.5 }}>
              Vieni a trovarci in negozio oppure contattaci per fissare un appuntamento con i nostri esperti.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}