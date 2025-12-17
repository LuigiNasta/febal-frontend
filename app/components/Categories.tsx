"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Category {
  id: number;
  nome: string;
  immagine?: { url: string };
}

interface Props {
  onSelectCategory?: (category: Category) => void;
}

export default function Categories({ onSelectCategory }: Props) {
  const router = useRouter();
  const isHomepage = !onSelectCategory;


  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("https://febal-cms-production.up.railway.app/api/categorie?populate=*")
      .then(res => res.json())
      .then(data => {
        const cats = data.data.map((cat: any) => ({
          id: cat.id,
          nome: cat.nome,
          immagine: cat.immagine,
        }));
        setCategories(cats);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {categories.map(cat => {
          const imageUrl = cat.immagine?.url
            ? `febal-cms-production.up.railway.app${cat.immagine.url}`
            : "/placeholder.png";

          return (
            <div
              key={cat.id}
              className="relative overflow-hidden rounded-2xl shadow-xl group cursor-pointer transform transition-all duration-500 hover:scale-105"
              onClick={() => {
                if (isHomepage) {
                  router.push(`/categorie?categoryId=${cat.id}`);
                } else {
                  if (onSelectCategory) {
                    onSelectCategory(cat);
                  } else {
                    console.error("❌ onSelectCategory è undefined!");
                  }
                }
              }}
            >
              <img src={imageUrl} alt={cat.nome} className="w-full h-64 object-cover" />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-500"></div>
              <h3 className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold drop-shadow-lg text-center px-2">
                {cat.nome}
              </h3>
            </div>
          );
        })}
      </div>
    </section>
  );
}