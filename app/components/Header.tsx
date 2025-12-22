"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [open, setOpen] = useState(false); // menu mobile
  const [showSearch, setShowSearch] = useState(false); // search bar mobile
  const [search, setSearch] = useState("");

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Categorie", href: "/categorie" },
    { name: "Collezioni", href: "/collezioni" },
    { name: "Prodotti", href: "/prodotti" },
    { name: "Offerte", href: "/offerte" },
    { name: "Contatti", href: "/contatti" },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setOpen(false);
        setShowSearch(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Funzione per gestire la ricerca
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search)}`);
      setSearch("");
      setShowSearch(false);
    }
  };

  // Funzione per il bottone ricerca
  const handleSearchClick = () => {
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search)}`);
      setSearch("");
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-black/30 transition-colors duration-300 hover:bg-black">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/logo.jpg"
            alt="F.lli Gaeta"
            width={48}
            height={48}
            className="rounded-full"
          />
          <span className="text-2xl font-bold text-white">F.lli Gaeta</span>
        </Link>

        {/* Menu desktop */}
        <nav className="hidden lg:flex items-center space-x-6">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`relative text-white after:block after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:transition-all after:duration-300 hover:after:w-full ${
                item.name === "Offerte" ? "after:bg-yellow-500 font-semibold" : "after:bg-red-600"
              }`}
            >
              {item.name}
            </Link>
          ))}

          {/* Desktop SearchBar */}
          <form onSubmit={handleSearch} className="ml-6 relative flex items-center w-64">
            <input
              type="text"
              placeholder="Cerca prodotti..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 rounded-full bg-white/20 text-white placeholder-white/70 backdrop-blur-sm focus:bg-white/90 focus:text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
            />
            <button 
              type="submit"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 px-3 py-1 text-white hover:text-red-600 transition"
            >
              🔍
            </button>
          </form>
        </nav>

        {/* Mobile buttons */}
        <div className="flex items-center space-x-4 lg:hidden">
          {/* Mostra/Nascondi SearchBar */}
          <button
            className="text-white text-xl font-bold focus:outline-none"
            onClick={() => setShowSearch(!showSearch)}
          >
            🔍
          </button>
          <div
            className="text-white text-2xl cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            ☰
          </div>
        </div>
      </div>

      {/* Mobile SearchBar */}
      {showSearch && (
        <div className="lg:hidden bg-black/70 backdrop-blur-sm p-4">
          <form onSubmit={handleSearch} className="relative flex items-center w-full">
            <input
              type="text"
              placeholder="Cerca prodotti..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 rounded-full bg-white/20 text-white placeholder-white/70 backdrop-blur-sm focus:bg-white/90 focus:text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
            />
            <button 
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 text-white hover:text-red-600 transition"
            >
              🔍
            </button>
          </form>
        </div>
      )}

      {/* Mobile menu */}
      {open && (
        <nav className="lg:hidden bg-black/70 backdrop-blur-sm">
          <div className="flex flex-col p-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`transition ${
                  item.name === "Offerte"
                    ? "text-yellow-400 hover:text-yellow-300 font-semibold"
                    : "text-white hover:text-red-600 hover:underline"
                }`}
                onClick={() => setOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}