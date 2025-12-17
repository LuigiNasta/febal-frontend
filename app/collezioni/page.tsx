import Collections from "../components/Collections";

export default function CollezioniPage() {
  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="relative h-[70vh] w-full">
        <img
          src="../collezioni/hero1.jpg"
          alt="Collezioni arredamento"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Testo */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-white text-4xl md:text-6xl font-bold tracking-wide">
            Le nostre Collezioni
          </h1>
          <p className="text-white/90 mt-6 max-w-2xl text-lg md:text-xl">
            Ambienti esclusivi, design senza tempo e qualità firmata
            <span className="block font-semibold mt-1">Febal Casa</span>
          </p>

          <div className="mt-10">
            <a
              href="#collezioni"
              className="inline-block bg-red-600 text-white px-8 py-4 uppercase tracking-widest text-sm font-semibold hover:bg-red-700 transition"
            >
              Scopri le collezioni
            </a>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">
          Arredamenti che raccontano uno stile
        </h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
          Ogni collezione è pensata per creare spazi unici, funzionali ed eleganti.
          Dalla zona giorno alla zona notte, uniamo design italiano, materiali di
          pregio e soluzioni su misura per la tua casa.
        </p>
      </section>

      {/* COLLEZIONI */}
      <section
        id="collezioni"
        className="bg-gray-50 py-20"
      >
        <div className="max-w-7xl mx-auto px-4">
          <Collections />
        </div>
      </section>
    </main>
  );
}
