"use client";
import { useState } from "react";
import Products from "../components/Products";

export default function ProdottiPage() {
  const [search, setSearch] = useState("");

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gray-800 text-white py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Prodotti</h1>
        <p className="mt-2 text-lg md:text-xl">Visualizza il catalogo completo dei nostri prodotti.</p>

        {/* Searchbar integrata */}
        <div className="mt-8 flex justify-center px-4">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Cerca un prodotto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-6 py-3 rounded-full bg-white/20 text-white placeholder-white/60 backdrop-blur-sm focus:bg-white/90 focus:text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-600 transition text-lg"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-xl"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </section>

      <Products categoryId={null} searchQuery={search} />
    </main>
  );
}