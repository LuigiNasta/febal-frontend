"use client";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface Image {
  url: string;
}

interface Categoria {
  id: number | null;
  nome?: string;
}

interface Collezione {
  id: number;
  nome?: string;
}

interface TextChild {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

interface RichTextNode {
  type: string;
  children: TextChild[];
}

interface Product {
  id: number;
  nome: string;
  descrizione?: RichTextNode[];
  immagini?: Image[];
  categoria: Categoria | null;
  collezione?: Collezione | null;
  in_evidenza?: boolean;
}

interface ProductsProps {
  categoryId: number | null;
  isOfferte?: boolean;
  searchQuery?: string;
}

export default function Products({ categoryId, isOfferte = false, searchQuery = "" }: ProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedImageIndex, setExpandedImageIndex] = useState<number | null>(null);

  // Funzione per rendere il testo con formattazione
  const renderDescription = (nodes: RichTextNode[]) => {
    return nodes.map((node, idx) => {
      if (node.type === 'paragraph') {
        return (
          <p key={idx} className="mb-3">
            {node.children.map((child, i) => {
              let element: any = child.text;
              if (child.bold) element = <strong key={i}>{element}</strong>;
              if (child.italic) element = <em key={i}>{element}</em>;
              if (child.underline) element = <u key={i}>{element}</u>;
              return element;
            })}
          </p>
        );
      }
      if (node.type === 'heading-1') {
        return (
          <h3 key={idx} className="text-2xl font-bold mb-3 text-gray-900">
            {node.children.map((c, i) => (
              <span key={i}>{c.text}</span>
            ))}
          </h3>
        );
      }
      if (node.type === 'heading-2') {
        return (
          <h4 key={idx} className="text-xl font-bold mb-2 text-gray-800">
            {node.children.map((c, i) => (
              <span key={i}>{c.text}</span>
            ))}
          </h4>
        );
      }
      if (node.type === 'heading-3') {
        return (
          <h5 key={idx} className="text-lg font-bold mb-2 text-gray-800">
            {node.children.map((c, i) => (
              <span key={i}>{c.text}</span>
            ))}
          </h5>
        );
      }
      if (node.type === 'list') {
        return (
          <ul key={idx} className="list-disc list-inside mb-3 space-y-1">
            {node.children.map((item, i) => (
              <li key={i} className="text-gray-700">
                {item.text}
              </li>
            ))}
          </ul>
        );
      }
      return null;
    });
  };

  // Funzione per estrarre testo semplice (per anteprima)
  const getPlainText = (nodes: RichTextNode[]) => {
    return nodes
      .map(node => node.children.map(c => c.text).join(" "))
      .join(" ")
      .substring(0, 100);
  };

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/prodotti?populate=*&pagination[pageSize]=100`, {
    })
      .then(res => res.json())
      .then(data => {
        if (!data?.data) {
          setProducts([]);
          setLoading(false);
          return;
        }

        let prods: Product[] = data.data.map((p: any) => ({
          id: p.id,
          nome: p.nome || "Nome non disponibile",
          descrizione: p.descrizione || [],
          immagini: p.immagini || [],
          categoria: p.categoria || null,
          collezione: p.collezione || null,
          in_evidenza: p.in_evidenza || false,
        }));

        // Filtro per offerte (prodotti NON in evidenza)
        if (isOfferte) {
          prods = prods.filter(prod => prod.in_evidenza === false);
        }
        // Filtro per categoria
        else if (categoryId !== null) {
          prods = prods.filter(prod => prod.categoria?.id === categoryId);
        }
        // Filtro per ricerca testuale
        if (searchQuery.trim()) {
          prods = prods.filter(prod =>
            prod.nome.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        setProducts(prods);
        setLoading(false);
      })
      .catch(err => {
        console.error("❌ Errore fetch prodotti:", err);
        setLoading(false);
      });
  }, [categoryId, isOfferte]);

  if (loading) {
    return (
      <p className="text-center py-16 text-gray-600">
        Caricamento in corso...
      </p>
    );
  }

  if (products.length === 0) {
    return (
      <p className="text-center py-16 text-gray-600">
        {isOfferte ? "Nessuna offerta disponibile al momento." : categoryId !== null ? "Nessun prodotto in questa categoria." : "Nessun prodotto disponibile."}
      </p>
    );
  }

  return (
    <>
      <section id="prodotti" className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map(prod => {
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
      </section>

      {selectedProduct && (
        <>
          {/* Sfondo semi-trasparente leggero */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setSelectedProduct(null)}
          />
          
          {/* Modal elegante */}
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in duration-300">
              
              {/* Bottone chiudi */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition z-10"
              >
                <X size={24} className="text-gray-700" />
              </button>

              {/* Contenuto */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                
                {/* Immagine - Sinistra */}
                <div className="flex flex-col justify-center">
                  <img
                    src={
                      selectedProduct.immagini?.[0]?.url || "/placeholder.png"
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

                {/* Dettagli - Destra */}
                <div className="flex flex-col justify-start space-y-6">
                  <div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-2">
                      {selectedProduct.nome}
                    </h2>
                    {selectedProduct.collezione?.nome && (
                      <p className="text-sm text-blue-600 font-semibold uppercase tracking-wide">
                        {selectedProduct.collezione.nome}
                      </p>
                    )}
                  </div>

                  {/* Categoria */}
                  <div className="border-l-4 border-blue-500 pl-4">
                    <p className="text-xs text-gray-500 uppercase tracking-widest">Categoria</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {selectedProduct.categoria?.nome || "N/A"}
                    </p>
                  </div>

                  {/* Descrizione con formattazione */}
                  {selectedProduct.descrizione && selectedProduct.descrizione.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Descrizione</p>
                      <div className="text-gray-700 leading-relaxed text-base">
                        {renderDescription(selectedProduct.descrizione)}
                      </div>
                    </div>
                  )}

                  {/* Collezione */}
                  {selectedProduct.collezione?.nome && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                      <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Collezione</p>
                      <p className="text-lg font-semibold text-blue-900">
                        {selectedProduct.collezione.nome}
                      </p>
                    </div>
                  )}

                  {/* Bottone chiudi in basso */}
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
            {/* Bottone chiudi */}
            <button
              onClick={() => setExpandedImageIndex(null)}
              className="absolute top-6 right-6 bg-white hover:bg-gray-200 rounded-full p-3 transition z-60"
            >
              <X size={28} className="text-gray-900" />
            </button>

            {/* Contenitore immagine */}
            <div className="relative max-w-4xl max-h-[90vh] flex items-center justify-center">
              <img
                src={`${selectedProduct.immagini[expandedImageIndex].url}`}
                alt={selectedProduct.nome}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />

              {/* Freccia sinistra */}
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

              {/* Freccia destra */}
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

              {/* Contatore immagini */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                {expandedImageIndex + 1} / {selectedProduct.immagini.length}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}