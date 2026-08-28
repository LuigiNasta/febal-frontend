"use client";

import { useEffect, useState, useRef } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { getApps, getApp, initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const CATEGORIES = ["Camera da letto", "Soggiorno", "Cucina", "Bagno"];

interface Product {
  id: string;
  nome: string;
  descrizione?: string;
  immagini?: string[];
  categoria?: string;
  collezione?: string;
}

interface PendingImage {
  file: File;
  localUrl: string;
}

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthChecked(true);
    });
    return () => unsub();
  }, []);

  const handleLogin = async () => {
    setLoginError("");
    setLoginLoading(true);
    try {
      await signInWithEmailAndPassword(auth, loginEmail.trim(), loginPassword);
    } catch {
      setLoginError("Accesso non riuscito. Controlla email e password.");
    }
    setLoginLoading(false);
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f3ee]">
        <p className="text-gray-500 text-sm">Caricamento...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f3ee] px-4">
        <div className="max-w-sm w-full bg-white border border-gray-200 rounded-xl p-8">
          <h1 className="text-2xl font-serif font-semibold mb-6">Accesso admin</h1>
          <div className="mb-4">
            <label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">
              Email
            </label>
            <input
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              autoComplete="username"
            />
          </div>
          <div className="mb-5">
            <label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">
              Password
            </label>
            <input
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              autoComplete="current-password"
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>
          <button
            onClick={handleLogin}
            disabled={loginLoading}
            className="w-full bg-gray-900 text-white rounded-md py-2.5 text-sm font-semibold hover:bg-gray-800 disabled:opacity-50"
          >
            {loginLoading ? "Accesso..." : "Accedi"}
          </button>
          {loginError && (
            <p className="text-red-600 text-xs mt-3">{loginError}</p>
          )}
        </div>
      </div>
    );
  }

  return <AdminDashboard user={user} />;
}

function AdminDashboard({ user }: { user: User }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState("");
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [nome, setNome] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [categoria, setCategoria] = useState("");
  const [collezione, setCollezione] = useState("");
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [pendingImages, setPendingImages] = useState<PendingImage[]>([]);
  const [uploadStatus, setUploadStatus] = useState("");
  const [formMsg, setFormMsg] = useState<{ text: string; type: "ok" | "err" | "" }>({
    text: "",
    type: "",
  });
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const q = query(collection(db, "prodotti"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const items: Product[] = [];
        snap.forEach((d) => items.push({ id: d.id, ...(d.data() as any) }));
        setProducts(items);
        setLoading(false);
      },
      () => setLoading(false)
    );
    return () => unsub();
  }, []);

  const collectionOptions = Array.from(
    new Set(products.map((p) => p.collezione).filter(Boolean))
  ) as string[];

  const filtered = products.filter((p) => {
    if (filterCategory && p.categoria !== filterCategory) return false;
    if (search) {
      const hay = `${p.nome || ""} ${p.collezione || ""}`.toLowerCase();
      if (!hay.includes(search.toLowerCase())) return false;
    }
    return true;
  });

  function resetForm() {
    setEditingId(null);
    setNome("");
    setDescrizione("");
    setCategoria("");
    setCollezione("");
    setExistingImages([]);
    setPendingImages([]);
    setFormMsg({ text: "", type: "" });
  }

  function startEdit(p: Product) {
    setEditingId(p.id);
    setNome(p.nome || "");
    setDescrizione(p.descrizione || "");
    setCategoria(p.categoria || "");
    setCollezione(p.collezione || "");
    setExistingImages(p.immagini || []);
    setPendingImages([]);
    setFormMsg({ text: "", type: "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function onFilesSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    const items = files.map((file) => ({ file, localUrl: URL.createObjectURL(file) }));
    setPendingImages((prev) => [...prev, ...items]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removeExistingImage(i: number) {
    setExistingImages((prev) => prev.filter((_, idx) => idx !== i));
  }

  function removePendingImage(i: number) {
    setPendingImages((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function uploadPending(): Promise<string[]> {
    const urls: string[] = [];
    for (let i = 0; i < pendingImages.length; i++) {
      setUploadStatus(`Caricamento immagine ${i + 1}/${pendingImages.length}...`);
      const file = pendingImages[i].file;
      const path = `products/${Date.now()}_${i}_${file.name}`;
      const sref = ref(storage, path);
      await uploadBytes(sref, file);
      urls.push(await getDownloadURL(sref));
    }
    setUploadStatus("");
    return urls;
  }

  async function handleSave() {
    if (!nome.trim()) {
      setFormMsg({ text: "Il titolo è obbligatorio.", type: "err" });
      return;
    }
    setSaving(true);
    setFormMsg({ text: "Salvataggio in corso...", type: "" });
    try {
      const newUrls = await uploadPending();
      const immagini = [...existingImages, ...newUrls];
      const data = {
        nome: nome.trim(),
        descrizione: descrizione.trim(),
        categoria,
        collezione: collezione.trim(),
        immagini,
        updatedAt: serverTimestamp(),
      };
      if (editingId) {
        await updateDoc(doc(db, "prodotti", editingId), data);
        setFormMsg({ text: "Prodotto aggiornato.", type: "ok" });
      } else {
        await addDoc(collection(db, "prodotti"), { ...data, createdAt: serverTimestamp() });
        setFormMsg({ text: "Prodotto salvato.", type: "ok" });
      }
      resetForm();
    } catch (e: any) {
      setFormMsg({ text: "Errore: " + e.message, type: "err" });
    }
    setSaving(false);
  }

  async function handleDelete(p: Product) {
    if (!confirm(`Eliminare "${p.nome}"? Questa azione non può essere annullata.`)) return;
    try {
      for (const url of p.immagini || []) {
        try {
          const path = decodeURIComponent(new URL(url).pathname.split("/o/")[1].split("?")[0]);
          await deleteObject(ref(storage, path));
        } catch {
          /* ignore */
        }
      }
      await deleteDoc(doc(db, "prodotti", p.id));
    } catch (e: any) {
      alert("Errore nell'eliminazione: " + e.message);
    }
  }

  return (
    <div className="min-h-screen bg-[#f6f3ee] text-[#1c1a17]">
      <header className="border-b border-gray-200 px-6 md:px-10 py-6 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-serif text-2xl font-semibold">
            Febal <span className="text-[#8a6a4b]">·</span> Prodotti
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">Gestione catalogo</p>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <span>{user.email}</span>
          <button
            onClick={() => signOut(auth)}
            className="border border-gray-300 rounded-md px-3 py-1.5 text-xs hover:bg-gray-100"
          >
            Esci
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 md:px-10 py-8">
        {/* Form */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
          <h2 className="font-serif text-lg font-semibold mb-4">
            {editingId ? "Modifica prodotto" : "Nuovo prodotto"}
          </h2>

          <div className="mb-4">
            <label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">
              Titolo
            </label>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Es. Poltrona Ares"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">
              Testo / descrizione
            </label>
            <textarea
              value={descrizione}
              onChange={(e) => setDescrizione(e.target.value)}
              placeholder="Descrizione del prodotto..."
              rows={4}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-y"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">
                Categoria
              </label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
              >
                <option value="">Seleziona categoria</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">
                Collezione
              </label>
              <input
                value={collezione}
                onChange={(e) => setCollezione(e.target.value)}
                placeholder="Es. Ares, Modula..."
                list="collection-list"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
              <datalist id="collection-list">
                {collectionOptions.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>
          </div>

          <div className="mb-2">
            <label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">
              Immagini
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={onFilesSelected}
              className="text-sm"
            />
            {uploadStatus && (
              <p className="text-xs text-gray-500 mt-1">{uploadStatus}</p>
            )}
            <div className="flex flex-wrap gap-2 mt-3">
              {existingImages.map((url, i) => (
                <div key={`ex-${i}`} className="relative w-20 h-20 rounded-md overflow-hidden border border-gray-200">
                  <img src={url} className="w-full h-full object-cover" />
                  <button
                    onClick={() => removeExistingImage(i)}
                    className="absolute top-0.5 right-0.5 bg-black/60 text-white rounded-full w-5 h-5 text-xs leading-none"
                  >
                    ×
                  </button>
                </div>
              ))}
              {pendingImages.map((img, i) => (
                <div key={`pe-${i}`} className="relative w-20 h-20 rounded-md overflow-hidden border border-gray-200">
                  <img src={img.localUrl} className="w-full h-full object-cover" />
                  <button
                    onClick={() => removePendingImage(i)}
                    className="absolute top-0.5 right-0.5 bg-black/60 text-white rounded-full w-5 h-5 text-xs leading-none"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 mt-5">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#5f4630] text-white rounded-md px-5 py-2.5 text-sm font-semibold hover:bg-[#8a6a4b] disabled:opacity-50"
            >
              Salva prodotto
            </button>
            {editingId && (
              <button
                onClick={resetForm}
                className="border border-gray-300 rounded-md px-4 py-2.5 text-sm hover:bg-gray-100"
              >
                Annulla modifica
              </button>
            )}
            {formMsg.text && (
              <span
                className={`text-sm ${
                  formMsg.type === "ok"
                    ? "text-green-700"
                    : formMsg.type === "err"
                    ? "text-red-600"
                    : "text-gray-500"
                }`}
              >
                {formMsg.text}
              </span>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-4">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
          >
            <option value="">Tutte le categorie</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cerca per titolo o collezione..."
            className="border border-gray-300 rounded-md px-3 py-2 text-sm flex-1 min-w-[200px]"
          />
        </div>

        {loading && <p className="text-sm text-gray-500 py-4">Caricamento prodotti...</p>}
        {!loading && filtered.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-10">
            Nessun prodotto trovato.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col"
            >
              <div className="aspect-square bg-gray-100">
                {p.immagini?.[0] && (
                  <img src={p.immagini[0]} className="w-full h-full object-cover" />
                )}
              </div>
              <div className="p-3 flex-1 flex flex-col gap-1">
                <div className="font-semibold text-sm">{p.nome}</div>
                <div className="text-xs text-gray-500 line-clamp-2">
                  {(p.descrizione || "").slice(0, 80)}
                </div>
                <div className="flex gap-1.5 flex-wrap mt-1">
                  {p.categoria && (
                    <span className="text-[11px] bg-[#f6f3ee] border border-gray-200 rounded-full px-2 py-0.5 text-[#5f4630]">
                      {p.categoria}
                    </span>
                  )}
                  {p.collezione && (
                    <span className="text-[11px] bg-[#f6f3ee] border border-gray-200 rounded-full px-2 py-0.5 text-[#5f4630]">
                      {p.collezione}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex border-t border-gray-200">
                <button
                  onClick={() => startEdit(p)}
                  className="flex-1 text-xs py-2 hover:bg-gray-50"
                >
                  Modifica
                </button>
                <button
                  onClick={() => handleDelete(p)}
                  className="flex-1 text-xs py-2 text-red-600 hover:bg-red-50 border-l border-gray-200"
                >
                  Elimina
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
