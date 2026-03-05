// components/PromoSection.tsx
"use client";
import Link from "next/link";

const promoCards = [
  {
    image: "/off1.PNG",
    alt: "Il momento giusto per i tuoi nuovi spazi è ora",
  },
  {
    image: "/off2.PNG",
    alt: "Fino a 2.000€ di sconto su soggiorno e camera da letto",
  },
  {
    image: "/off3.PNG",
    alt: "Elettrodomestici e tavolo in ceramica a metà prezzo",
  },
  {
    image: "/off4.PNG",
    alt: "Top in gres in regalo",
  },
];

export default function PromoSection() {
  return (
    <section id="promo-primavera" className="bg-white py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#dc2626",
              marginBottom: "12px",
            }}
          >
            Dal 13 Febbraio al 31 Maggio 2026
          </p>
          <h2
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 700,
              color: "#1a1a1a",
              lineHeight: 1.2,
              marginBottom: "16px",
            }}
          >
            Promozione Primavera 2026
          </h2>
          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.15rem)",
              color: "#555",
              maxWidth: "620px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Il momento giusto per progettare i tuoi spazi è ora.
            Più valore ai tuoi ambienti, più vantaggi per te.
          </p>
        </div>

        {/* 4 images grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "12px",
          }}
          className="md:grid-cols-4"
        >
          {promoCards.map((card, i) => (
            <div
              key={i}
              style={{
                borderRadius: "4px",
                overflow: "hidden",
                aspectRatio: "1 / 1",
              }}
            >
              <img
                src={card.image}
                alt={card.alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.4s ease",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.03)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")
                }
              />
            </div>
          ))}
        </div>

        {/* Offer highlights */}
        <div
          style={{
            marginTop: "48px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "24px",
          }}
        >
          {[
            { value: "2.000€", label: "di sconto su soggiorno\ne camera da letto", prefix: "Fino a" },
            { value: "Metà prezzo", label: "su elettrodomestici e tavolo\ncon top in ceramica", prefix: "" },
            { value: "In regalo", label: "il top cucina\nin gres Optimum", prefix: "" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                borderTop: "2px solid #dc2626",
                paddingTop: "16px",
              }}
            >
              {item.prefix && (
                <p style={{ fontSize: "0.8rem", color: "#888", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "2px" }}>
                  {item.prefix}
                </p>
              )}
              <p style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)", fontWeight: 800, color: "#1a1a1a", lineHeight: 1.1, marginBottom: "6px" }}>
                {item.value}
              </p>
              <p style={{ fontSize: "0.88rem", color: "#666", lineHeight: 1.5, whiteSpace: "pre-line" }}>
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Description */}
        <div
          style={{
            marginTop: "40px",
            padding: "28px 32px",
            background: "#f9f9f9",
            borderLeft: "3px solid #dc2626",
            borderRadius: "2px",
          }}
        >
          <p style={{ fontSize: "0.95rem", color: "#444", lineHeight: 1.8, marginBottom: "12px" }}>
            Acquista una <strong>cucina completa</strong> con almeno 4 elettrodomestici Beko, Hotpoint o Whirlpool
            (forno, frigo, piano cottura, lavastoviglie + eventuale microonde) e ottieni gli elettrodomestici
            <strong> a metà prezzo</strong> e il piano di lavoro Optimum lineare <strong>in omaggio</strong>.
          </p>
          <p style={{ fontSize: "0.95rem", color: "#444", lineHeight: 1.8 }}>
            Con l'acquisto di arredi <strong>Giorno, Notte o Momenti</strong> da almeno 4.570€ ottieni{" "}
            <strong>1.000€ di sconto</strong>; da 8.090€ ottieni <strong>2.000€ di sconto</strong>.
            Il tavolo con top in gres è acquistabile a <strong>metà prezzo</strong>.
          </p>
        </div>

        {/* Fine print */}
        <p style={{ marginTop: "16px", fontSize: "0.75rem", color: "#aaa", lineHeight: 1.6 }}>
          * Offerta valida dal 13/02/2026 al 31/05/2026 presso i punti vendita Febal Casa aderenti all'iniziativa.
          Sconto di 1.000€ e 2.000€ attivabili presentando il coupon scaricabile su febalcasa.com.
          Finiture selezionate e lavorazioni escluse. Per i dettagli completi visita il punto vendita.
        </p>

        {/* CTA */}
        <div style={{ marginTop: "36px", textAlign: "center" }}>
          <Link
            href="/collezioni"
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
          </Link>
        </div>

      </div>
    </section>
  );
}