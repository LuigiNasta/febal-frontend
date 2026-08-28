"use client";
import { useRouter } from "next/navigation";

interface Category {
  id: string;
  nome: string;
  immagine?: string;
}

interface Props {
  onSelectCategory?: (category: Category) => void;
}

// Categorie fisse del catalogo. Le immagini vanno messe in /public/categorie/
const CATEGORIES: Category[] = [
  { id: "Camera da letto", nome: "Camera da letto", immagine: "/categorie/camera.jpg" },
  { id: "Soggiorno", nome: "Soggiorno", immagine: "/categorie/soggiorno.jpg" },
  { id: "Cucina", nome: "Cucina", immagine: "/categorie/cucina.jpg" },
  { id: "Bagno", nome: "Bagno", immagine: "/categorie/bagno.jpg" },
];

export default function Categories({ onSelectCategory }: Props) {
  const router = useRouter();
  const isHomepage = !onSelectCategory;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {CATEGORIES.map(cat => {
          const imageUrl = cat.immagine || "/placeholder.png";

          return (
            <div
              key={cat.id}
              className="relative overflow-hidden rounded-2xl shadow-xl group cursor-pointer transform transition-all duration-500 hover:scale-105"
              onClick={() => {
                if (isHomepage) {
                  router.push(`/categorie?categoryId=${encodeURIComponent(cat.id)}`);
                } else {
                  if (onSelectCategory) {
                    onSelectCategory(cat);
                  } else {
                    console.error("❌ onSelectCategory è undefined!");
                  }
                }
              }}
            >
              <img src={imageUrl} alt={cat.nome} className="w-full h-64 object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.png"; }} />
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
