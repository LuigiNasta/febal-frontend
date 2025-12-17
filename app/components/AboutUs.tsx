// components/AboutUs.tsx
"use client";
import { useEffect, useState } from "react";

export default function AboutUs() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("about-us");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8) {
        setVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // controlla subito se visibile
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="about-us"
      className={`py-20 bg-white transition-all duration-1000 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
        {/* Testo */}
        <div className="lg:w-1/2">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Vendita e Montaggio Arredamenti
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Siamo rivenditori ufficiali Febal Casa, specializzati nella vendita e nel montaggio
            di arredamenti su misura per la tua casa. Offriamo soluzioni eleganti, moderne e
            funzionali, per ogni ambiente: cucine, camere da letto, soggiorni e molto altro.
          </p>
          <p className="text-gray-600 text-lg">
            La nostra esperienza e passione ci permettono di accompagnarti dalla scelta
            dell’arredamento fino all’installazione finale, garantendo qualità e attenzione
            ai dettagli.
          </p>
        </div>

        {/* Immagini */}
        <div className="lg:w-1/2 grid grid-cols-2 gap-4">
          <img
            src="/about1.jpg"
            alt="Cucina Febal Casa"
            className="w-full h-48 object-cover rounded-lg shadow-lg hover:scale-105 transition"
          />
          <img
            src="/about2.jpg"
            alt="Camera da letto Febal Casa"
            className="w-full h-48 object-cover rounded-lg shadow-lg hover:scale-105 transition"
          />
          <img
            src="/about3.jpg"
            alt="Soggiorno Febal Casa"
            className="w-full h-48 object-cover rounded-lg shadow-lg hover:scale-105 transition"
          />
          <img
            src="/about4.jpg"
            alt="Montaggio arredamento Febal Casa"
            className="w-full h-48 object-cover rounded-lg shadow-lg hover:scale-105 transition"
          />
        </div>
      </div>
    </section>
  );
}
