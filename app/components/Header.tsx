"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const isProdottiPage = pathname === "/prodotti";

  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
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

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search)}`);
      setSearch("");
      setShowSearch(false);
    }
  };

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

          {/* Desktop SearchBar — nascosta su /prodotti */}
          {!isProdottiPage && (
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
          )}
        </nav>

        {/* Mobile buttons */}
        <div className="flex items-center space-x-4 lg:hidden">
          {/* Icona ricerca — nascosta su /prodotti */}
          {!isProdottiPage && (
            <button
              className="text-white text-xl font-bold focus:outline-none"
              onClick={() => setShowSearch(!showSearch)}
            >
              🔍
            </button>
          )}
          <div
            className="text-white text-2xl cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            ☰
          </div>
        </div>
      </div>

      {/* Mobile SearchBar — nascosta su /prodotti */}
      {showSearch && !isProdottiPage && (
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

      {/* Mobile menu — fullscreen overlay */}
      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.96)",
            backdropFilter: "blur(12px)",
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header overlay */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 24px" }}>
            <Link href="/" onClick={() => setOpen(false)} style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
              <Image src="/logo.jpg" alt="F.lli Gaeta" width={36} height={36} className="rounded-full" />
              <span style={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem" }}>F.lli Gaeta</span>
            </Link>
            <button
              onClick={() => setOpen(false)}
              style={{ background: "none", border: "none", color: "#fff", fontSize: "1.8rem", cursor: "pointer", lineHeight: 1, padding: "4px 8px" }}
            >
              ✕
            </button>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", margin: "0 24px" }} />

          {/* Nav items */}
          <nav style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 24px", gap: "0" }}>
            {menuItems.map((item, i) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "20px 8px",
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                  textDecoration: "none",
                  color: item.name === "Offerte" ? "#facc15" : "#fff",
                  fontSize: "clamp(1.4rem, 6vw, 1.9rem)",
                  fontWeight: 700,
                  fontFamily: "'Georgia', serif",
                  letterSpacing: "0.01em",
                  animation: `slideInMenu 0.45s cubic-bezier(0.22,1,0.36,1) both`,
                  animationDelay: `${i * 55}ms`,
                  WebkitTapHighlightColor: "transparent",
                  transition: "padding-left 0.15s ease, color 0.15s ease, background 0.15s ease",
                  borderRadius: "4px",
                }}
                onTouchStart={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(220,38,38,0.15)";
                  el.style.paddingLeft = "20px";
                  el.style.color = "#dc2626";
                }}
                onTouchEnd={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  setTimeout(() => {
                    if (el) {
                      el.style.background = "";
                      el.style.paddingLeft = "8px";
                      el.style.color = item.name === "Offerte" ? "#facc15" : "#fff";
                    }
                  }, 200);
                }}
              >
                <span>{item.name}</span>
                <svg
                  width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  style={{ opacity: 0.3, flexShrink: 0 }}
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            ))}
          </nav>

          {/* Footer contatti */}
          <div style={{ padding: "20px 32px 44px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "10px" }}>
              Contatti rapidi
            </p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <a href="tel:081948905" style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0.7)", fontSize: "0.95rem", fontWeight: 600, textDecoration: "none" }}>
                <span style={{ fontSize: "1rem" }}>📞</span> 081 948905
              </a>
              <a href="tel:+393333038342" style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0.7)", fontSize: "0.95rem", fontWeight: 600, textDecoration: "none" }}>
                <span style={{ fontSize: "1rem" }}>📱</span> +39 333 303 8342
              </a>
            </div>
          </div>

          <style>{`
            @keyframes slideInMenu {
              from { opacity: 0; transform: translateX(-28px); }
              to   { opacity: 1; transform: translateX(0); }
            }
          `}</style>
        </div>
      )}
    </header>
  );
}