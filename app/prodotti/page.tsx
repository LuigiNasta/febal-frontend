import Products from "../components/Products";

export default function ProdottiPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gray-800 text-white py-25 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Prodotti</h1>
        <p className="mt-2 text-lg md:text-xl">Visualizza il catalogo completo dei nostri prodotti.</p>
      </section>
      <Products categoryId={null} />
    </main>
  );
}
