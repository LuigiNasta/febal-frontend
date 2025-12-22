"use client";
import Products from "../components/Products";

export default function OffertePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-red-800 text-white py-25 text-center">
        <h1 className="text-5xl font-bold">OFFERTE SPECIALI</h1>
        <p className="mt-4 text-xl">Articoli invenduti nuovi a prezzi incredibili!</p>
      </section>

      <Products categoryId={null} isOfferte={true} />
    </main>
  );
}