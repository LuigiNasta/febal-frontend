"use client";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

export default function Collections() {
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCollection, setSelectedCollection] = useState<any>(null);

  useEffect(() => {
    fetch("https://febal-cms-strapi-production.up.railway.app/api/collezioni?populate=*")
      .then(res => res.json())
      .then(data => {
        if (data?.data) {
          setCollections(data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <p className="text-gray-600 text-lg">Caricamento collezioni...</p>
      </div>
    );
  }

  if (collections.length === 0) {
    return (
      <div className="flex justify-center items-center py-32">
        <p className="text-gray-600 text-lg">Nessuna collezione disponibile</p>
      </div>
    );
  }

  return (
    <>
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Le Nostre Collezioni
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Scopri le nostre esclusive collezioni di design e arredamento
            </p>
          </div>

          {/* Grid Collections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map(c => {
              const imageUrl = c.immagine_hero
                ? `https://febal-cms-strapi-production.up.railway.app${c.immagine_hero.url}`
                : "/placeholder.png";

              const description = c.descrizione?.[0]?.children?.[0]?.text || "";

              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedCollection(c)}
                  className="group cursor-pointer"
                >
                  {/* Card */}
                  <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
                    {/* Immagine */}
                    <div className="relative h-72 overflow-hidden bg-gray-200">
                      <img
                        src={imageUrl}
                        alt={c.nome}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Overlay scuro al hover */}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-500" />
                    </div>

                    {/* Contenuto */}
                    <div className="relative bg-white p-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition">
                        {c.nome}
                      </h2>

                      {description && (
                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                          {description}
                        </p>
                      )}

                      {/* Bottone */}
                      <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                        Scopri di più
                        <ArrowRight size={20} className="ml-2" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modal Dettaglio Collezione */}
      {selectedCollection && (
        <>
          {/* Sfondo */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setSelectedCollection(null)}
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
              
              {/* Bottone chiudi */}
              <button
                onClick={() => setSelectedCollection(null)}
                className="sticky top-6 right-6 absolute bg-gray-100 hover:bg-gray-200 rounded-full p-3 transition z-10"
              >
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Contenuto Modal */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
                
                {/* Immagine */}
                <div className="flex items-center justify-center">
                  <img
                    src={
                      selectedCollection.immagine_hero
                        ? `https://febal-cms-strapi-production.up.railway.app${selectedCollection.immagine_hero.url}`
                        : "/placeholder.png"
                    }
                    alt={selectedCollection.nome}
                    className="w-full h-96 object-cover rounded-2xl shadow-lg"
                  />
                </div>

                {/* Dettagli */}
                <div className="flex flex-col justify-center space-y-8">
                  <div>
                    <p className="text-sm text-blue-600 font-bold uppercase tracking-widest mb-2">
                      Collezione Esclusiva
                    </p>
                    <h2 className="text-5xl font-bold text-gray-900 mb-4">
                      {selectedCollection.nome}
                    </h2>
                  </div>

                  {/* Descrizione */}
                  {selectedCollection.descrizione && selectedCollection.descrizione.length > 0 && (
                    <div>
                      <p className="text-gray-700 text-lg leading-relaxed">
                        {selectedCollection.descrizione
                          .map((d: any) => d.children.map((c: any) => c.text).join(" "))
                          .join("\n")}
                      </p>
                    </div>
                  )}

                  {/* Numero di prodotti */}
                  {selectedCollection.prodotti && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                      <p className="text-sm text-gray-600 uppercase tracking-wide mb-2">Collezione contiene</p>
                      <p className="text-3xl font-bold text-blue-600">
                        {selectedCollection.prodotti.length} prodotti
                      </p>
                    </div>
                  )}

                  {/* Bottoni */}
                  <div className="flex gap-4 mt-8">
                    <a
                      href={`/prodotti?collezioneId=${selectedCollection.id}`}
                      className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition shadow-lg text-center"
                    >
                      Vedi Prodotti
                    </a>
                    <button
                      onClick={() => setSelectedCollection(null)}
                      className="flex-1 px-8 py-4 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-xl transition"
                    >
                      Chiudi
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}