"use client";
import { useEffect, useState } from "react";

interface Image {
  url: string;
}

interface Category {
  id: number;
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
  categorie: Category[];
  collezione?: Collezione | null;
}

interface ProductsProps {
  categoryId: number | null;
}

export default function Products({ categoryId }: ProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch("https://febal-cms-strapi-production.up.railway.app/api/prodotti?populate=*")
      .then(res => res.json())
      .then(data => {
        if (!data?.data) {
          setProducts([]);
          return;
        }

        // Mapping con tipizzazione esplicita
        let prods: Product[] = data.data.map((p: any) => ({
          id: p.id,
          nome: p.nome || "Nome non disponibile",
          descrizione: p.descrizione || [],
          immagini: p.immagini || [],
          categorie: p.categorie || [],
          collezione: p.collezione || null,
        }));

        // Filtro per categoryId se specificato
        if (categoryId !== null) {
          prods = prods.filter((prod: Product) =>
            Array.isArray(prod.categorie) &&
            prod.categorie.some((cat: Category) => cat.id === categoryId)
          );
        }

        setProducts(prods);
      })
      .catch(err => console.error(err));
  }, [categoryId]);

  if (products.length === 0) {
    return (
      <p className="text-center py-16 text-gray-600">
        Nessun prodotto disponibile.
      </p>
    );
  }

  return (
    <>
      <section id="prodotti" className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((prod: Product) => {
            const imageUrl = prod.immagini?.[0]?.url
              ? `https://febal-cms-strapi-production.up.railway.app${prod.immagini[0].url}`
              : "/placeholder.png";

            // Tipizzazione esplicita per d e c
            const descriptionText =
              prod.descrizione
                ?.map((d: RichTextNode) =>
                  d.children.map((c: { text: string }) => c.text).join(" ")
                )
                .join(" ") || "";

            return (
              <div
                key={prod.id}
                onClick={() => setSelectedProduct(prod)}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition cursor-pointer"
              >
                <img
                  src={imageUrl}
                  alt={prod.nome}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-center">
                    {prod.nome}
                  </h3>
                  {descriptionText && (
                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                      {descriptionText}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              <div>
                <img
                  src={
                    selectedProduct.immagini?.[0]?.url
                      ? `febal-cms-strapi-production.up.railway.app${selectedProduct.immagini[0].url}`
                      : "/placeholder.png"
                  }
                  alt={selectedProduct.nome}
                  className="w-full rounded-lg"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">
                  {selectedProduct.nome}
                </h2>

                <div className="mb-4">
                  <p className="text-gray-600 font-semibold">Categoria:</p>
                  <p className="text-gray-800">
                    {selectedProduct.categorie?.length
                      ? selectedProduct.categorie
                          .map((cat: Category) => cat.nome || "Senza nome")
                          .join(", ")
                      : "N/A"}
                  </p>
                </div>

                <div className="mb-4">
                  <p className="text-gray-600 font-semibold">Collezione:</p>
                  <p className="text-gray-800">
                    {selectedProduct.collezione?.nome || "N/A"}
                  </p>
                </div>

                <div className="mb-4">
                  <p className="text-gray-600 font-semibold">Descrizione:</p>
                  <p className="text-gray-800">
                    {selectedProduct.descrizione
                      ?.map((d: RichTextNode) =>
                        d.children.map((c: { text: string }) => c.text).join(" ")
                      )
                      .join(" ") || "Nessuna descrizione"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
