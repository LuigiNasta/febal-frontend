"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import { fetchProducts } from "../services/api";

interface Product {
  id: string;
  nome: string;
  descrizione?: string;
  immagini?: { url: string }[];
  categoria?: string | null;
  collezione?: string | null;
  in_evidenza?: boolean;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [expandedImageIndex, setExpandedImageIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Descrizione salvata come testo semplice
  const renderDescription = (text: string) =>
    text.split("\n").filter(Boolean).map((line, idx) => (
      <p key={idx} className="mb-3">{line}</p>
    ));

  const getPlainText = (text: string) => text.substring(0, 100);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data as Product[]);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (query.trim() && products.length > 0) {
      const searchTerm = query.toLowerCase();
      const filtered = products.filter(p =>
        p.nome.toLowerCase().includes(searchTerm) ||
        (p.descrizione || "").toLowerCase().includes(searchTerm)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [query, products]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 flex justify-center items-center">
        <p className="text-gray-600 text-lg">Caricamento...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-32">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Risultati della ricerca
          </h1>
          <p className="text-xl text-gray-600">
            {query ? `"${query}"` : "Nessun termine di ricerca"}
          </p>
          {query && filteredProducts.length > 0 && (
            <p className="text-lg text-blue-600 font-semibold mt-4">
              {filteredProducts.length} {filteredProducts.length === 1 ? "prodotto trovato" : "prodotti trovati"}
            </p>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-2xl text-gray-600 mb-4">
              {query ? "Nessun prodotto trovato" : "Inserisci un termine di ricerca"}
            </p>
            <p className="text-gray-500">
              Prova con parole chiave diverse
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-16">
            {filteredProducts.map(prod => {
              const imageUrl = prod.immagini?.[0]?.url ||"/placeholder.png";

              const descriptionText = prod.descrizione ? getPlainText(prod.descrizione) : "";

              return (
                <div
                  key={prod.id}
                  onClick={() => setSelectedProduct(prod)}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition cursor-pointer relative"
                >
                  {/* Badge Offerta */}
                  {!prod.in_evidenza && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
                      OFFERTA
                    </div>
                  )}

                  <img src={imageUrl} alt={prod.nome} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-center">{prod.nome}</h3>
                    {descriptionText && (
                      <p className="text-gray-600 text-sm mt-2 line-clamp-2">{descriptionText}...</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal Prodotto */}
      {selectedProduct && (
        <>
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setSelectedProduct(null)}
          />

          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in duration-300">
              
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition z-10"
              >
                <X size={24} className="text-gray-700" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                
                <div className="flex flex-col justify-center">
                  <img
                    src={
                      selectedProduct.immagini?.[0]?.url ||"/placeholder.png"
                    }
                    alt={selectedProduct.nome}
                    className="w-full h-96 object-cover rounded-xl shadow-lg cursor-pointer hover:opacity-80 transition"
                    onClick={() => setExpandedImageIndex(0)}
                  />

                  {/* Miniature altre immagini */}
                  {selectedProduct.immagini && selectedProduct.immagini.length > 1 && (
                    <div className="flex gap-2 mt-4">
                      {selectedProduct.immagini.map((img, idx) => (
                        <img
                          key={idx}
                          src={img.url}
                          alt={`${selectedProduct.nome} ${idx + 1}`}
                          className={`w-16 h-16 object-cover rounded cursor-pointer transition ${
                            idx === 0 ? 'border-2 border-blue-500' : 'border border-gray-300 hover:border-blue-500'
                          }`}
                          onClick={() => setExpandedImageIndex(idx)}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-start space-y-6">
                  <div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-2">
                      {selectedProduct.nome}
                    </h2>
                    {selectedProduct.collezione && (
                      <p className="text-sm text-blue-600 font-semibold uppercase tracking-wide">
                        {selectedProduct.collezione}
                      </p>
                    )}
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <p className="text-xs text-gray-500 uppercase tracking-widest">Categoria</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {selectedProduct.categoria || "N/A"}
                    </p>
                  </div>

                  {selectedProduct.descrizione && selectedProduct.descrizione.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Descrizione</p>
                      <div className="text-gray-700 leading-relaxed text-base">
                        {renderDescription(selectedProduct.descrizione)}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="mt-6 px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition"
                  >
                    Chiudi
                  </button>
                </div>

              </div>
            </div>
          </div>
        </>
      )}

      {/* Modal immagine ingrandita */}
      {expandedImageIndex !== null && selectedProduct?.immagini && (
        <>
          <div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setExpandedImageIndex(null)}
          />
          
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <button
              onClick={() => setExpandedImageIndex(null)}
              className="absolute top-6 right-6 bg-white hover:bg-gray-200 rounded-full p-3 transition z-60"
            >
              <X size={28} className="text-gray-900" />
            </button>

            <div className="relative max-w-4xl max-h-[90vh] flex items-center justify-center">
              <img
                src={`${selectedProduct.immagini[expandedImageIndex].url}`}
                alt={selectedProduct.nome}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />

              {expandedImageIndex > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedImageIndex(expandedImageIndex - 1);
                  }}
                  className="absolute left-4 bg-white hover:bg-gray-200 rounded-full p-3 transition"
                >
                  <span className="text-2xl">←</span>
                </button>
              )}

              {expandedImageIndex < selectedProduct.immagini.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedImageIndex(expandedImageIndex + 1);
                  }}
                  className="absolute right-4 bg-white hover:bg-gray-200 rounded-full p-3 transition"
                >
                  <span className="text-2xl">→</span>
                </button>
              )}

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                {expandedImageIndex + 1} / {selectedProduct.immagini.length}
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Caricamento...</div>}>
      <SearchContent />
    </Suspense>
  );
}