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
    const token = "73dd9abb005138fe096666c0bdfbadd9d7e7ff5289ce256c2f383cad69cff05b0947a133231ea37433cc7f5360b4edba226aed8bf1e3f956f0824d67e82af05898d421a08289b014a13d0d80facf2ae279f4c72e977c8968b95a2eaedaec39db028ad8e942cda7214e50e3b874d0852a021df0ec7d6eb2072486ee12a88547cf";
    fetch("https://febal-cms-strapi-production.up.railway.app/api/categorie?populate=*", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
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
            ? `https://febal-cms-strapi-production.up.railway.app${cat.immagine.url}`
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