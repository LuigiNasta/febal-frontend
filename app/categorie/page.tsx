"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Categories from "../components/Categories";
import Products from "../components/Products";

export default function CategoriePage() {
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Fetch tutte le categorie
    fetch("http://localhost:1337/api/categorie?populate=*")
      .then(res => res.json())
      .then(data => setCategories(data.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    // Se c'è un categoryId nei query params, seleziona quella categoria
    const categoryId = searchParams.get("categoryId");
    if (categoryId && categories.length > 0) {
      const found = categories.find(cat => cat.id === parseInt(categoryId));
      if (found) {
        setSelectedCategory(found);
      }
    }
  }, [searchParams, categories]);

  // ✅ Crea una funzione che elabora la categoria
  const handleCategorySelect = (category: any) => {
    setSelectedCategory(category);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero / Header della pagina */}
      <section className="bg-gray-800 text-white py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Categorie</h1>
        <p className="mt-2 text-lg md:text-xl">Ricerca gli articoli che desideri in base alla categoria.</p>
      </section>

      {/* ✅ Sezione categorie cliccabili - passa la funzione, non setState direttamente */}
      <Categories onSelectCategory={handleCategorySelect} />

      {/* Nome categoria selezionata */}
      {selectedCategory && (
        <h2 className="text-2xl font-semibold text-center mt-12 mb-6">
          Categoria: {selectedCategory.nome}
        </h2>
      )}

      {/* ✅ Prodotti della categoria selezionata */}
      <Products categoryId={selectedCategory?.id ?? null} />
    </main>
  );
}