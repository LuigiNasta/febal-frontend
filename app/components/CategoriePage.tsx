"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Categories from "../components/Categories";
import Products from "../components/Products";

interface Category {
  id: number;
  nome: string;
  immagine?: any;
}

export default function CategoriePage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const searchParams = useSearchParams();

  // Fetch tutte le categorie al mount
  useEffect(() => {
    fetch("https://febal-cms-strapi-production.up.railway.app/api/categorie?populate=*")
      .then(res => res.json())
      .then(data => {
        if (data?.data) {
          setCategories(data.data);
        }
      })
      .catch(err => console.error("❌ Errore nel fetch categorie:", err));
  }, []);

  // Gestisci i query params per selezionare una categoria
  useEffect(() => {
    const categoryId = searchParams.get("categoryId");
    if (categoryId && categories.length > 0) {
      const found = categories.find(cat => cat.id === parseInt(categoryId));
      if (found) {
        setSelectedCategory(found);
      }
    }
  }, [searchParams, categories]);

  const handleSelectCategory = (category: any) => {
    setSelectedCategory(category);
  };

  // Callback stabile per evitare re-render infiniti
  const onCategorySelect = (cat: any) => {
    handleSelectCategory(cat);
  };

  // Log quando selectedCategory cambia
  useEffect(() => {
  }, [selectedCategory]);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero / Header della pagina */}
      <section className="bg-gray-800 text-white py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Categorie</h1>
        <p className="mt-2 text-lg md:text-xl">
          Ricerca gli articoli che desideri in base alla categoria.
        </p>
      </section>

      {/* Sezione categorie cliccabili */}
      <Categories onSelectCategory={onCategorySelect} />

      {/* Nome categoria selezionata */}
      {selectedCategory && (
        <h2 className="text-2xl font-semibold text-center mt-12 mb-6">
          Categoria: {selectedCategory.nome}
        </h2>
      )}

      {/* Prodotti della categoria selezionata */}
      <div>
        <div className="text-center text-sm text-blue-600 mb-4">
          📊 categoryId passato a Products: {selectedCategory?.id ?? "null"} ({selectedCategory?.nome ?? "nessuna"})
        </div>
        <Products categoryId={selectedCategory?.id ?? null} />
      </div>
    </main>
  );
}