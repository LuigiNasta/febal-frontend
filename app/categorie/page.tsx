"use client";

import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Categories from "../components/Categories";
import Products from "../components/Products";

interface Category {
  id: number;
  nome: string;
  immagine?: any;
}

function CategorieContent() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    fetch("https://febal-cms-strapi-production.up.railway.app/api/categorie?populate=*")
      .then(res => res.json())
      .then(data => {
        if (data?.data) {
          setCategories(data.data);
        }
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const categoryId = searchParams.get("categoryId");
    if (categoryId && categories.length > 0) {
      const found = categories.find(cat => cat.id === parseInt(categoryId));
      if (found) {
        setSelectedCategory(found);
      }
    }
  }, [searchParams, categories]);

  const handleCategorySelect = (category: any) => {
    setSelectedCategory(category);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gray-800 text-white py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Categorie</h1>
        <p className="mt-2 text-lg md:text-xl">Ricerca gli articoli che desideri in base alla categoria.</p>
      </section>

      <Categories onSelectCategory={handleCategorySelect} />

      {selectedCategory && (
        <h2 className="text-2xl font-semibold text-center mt-12 mb-6">
          Categoria: {selectedCategory.nome}
        </h2>
      )}

      <Products categoryId={selectedCategory?.id ?? null} />
    </main>
  );
}

export default function CategoriePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Caricamento...</div>}>
      <CategorieContent />
    </Suspense>
  );
}