// components/Hero.tsx
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full h-screen">
      {/* Immagine di sfondo */}
      <img src="/hero.jpg" alt="Hero" className="w-full h-full object-cover" />

      {/* Box centrato */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            Benvenuti da F.lli Gaeta
          </h1>
          <p className="text-white text-lg md:text-xl mb-6 drop-shadow-md">
            Scopri le nostre Collezioni di arredamento uniche e di qualità
          </p>
          <Link
            href="/collezioni"
            className="inline-block bg-red-600 text-white font-semibold px-6 py-3 rounded hover:bg-red-700 transition"
          >
            Esplora le Collezioni
          </Link>
        </div>
      </div>
    </section>
  );
}
