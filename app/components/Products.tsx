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

interface RichTextNode {
  type: string;
  children: { text: string }[];
}

interface Product {
  id: number;
  nome: string;
  descrizione?: RichTextNode[];
  immagini?: Image[];
  categoria: Categoria | null;
  collezione?: Collezione | null;
}

interface ProductsProps {
  categoryId: number | null;
}

export default function Products({ categoryId }: ProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    fetch("http://localhost:1337/api/prodotti?populate=*")
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
        }));

        if (categoryId !== null) {
          prods = prods.filter(prod => prod.categoria?.id === categoryId);
        }

        setProducts(prods);
        setLoading(false);
      })
      .catch(err => {
        console.error("❌ Errore fetch prodotti:", err);
        setLoading(false);
      });
  }, [categoryId]);

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
        {categoryId !== null ? "Nessun prodotto in questa categoria." : "Nessun prodotto disponibile."}
      </p>
    );
  }

  return (
    <>
      <section id="prodotti" className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map(prod => {
            const imageUrl = prod.immagini?.[0]?.url
              ? `http://localhost:1337${prod.immagini[0].url}`
              : "/placeholder.png";

            const descriptionText =
              prod.descrizione?.map(d => d.children.map(c => c.text).join(" ")).join(" ") || "";

            return (
              <div
                key={prod.id}
                onClick={() => setSelectedProduct(prod)}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition cursor-pointer"
              >
                <img src={imageUrl} alt={prod.nome} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-center">{prod.nome}</h3>
                  {descriptionText && (
                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">{descriptionText}</p>
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
                      selectedProduct.immagini?.[0]?.url
                        ? `http://localhost:1337${selectedProduct.immagini[0].url}`
                        : "/placeholder.png"
                    }
                    alt={selectedProduct.nome}
                    className="w-full h-96 object-cover rounded-xl shadow-lg"
                  />
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

                  {/* Descrizione */}
                  {selectedProduct.descrizione && selectedProduct.descrizione.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Descrizione</p>
                      <p className="text-gray-700 leading-relaxed text-base">
                        {selectedProduct.descrizione
                          ?.map(d => d.children.map(c => c.text).join(" "))
                          .join(" ")}
                      </p>
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
    </>
  );
}