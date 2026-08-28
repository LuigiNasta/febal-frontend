import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

// Nota: i campi in Firestore usano nomi italiani per restare compatibili
// con i componenti esistenti (nome, descrizione, immagini, categoria, collezione).

export const fetchProducts = async () => {
  const snap = await getDocs(collection(db, "prodotti"));
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      nome: data.nome || "",
      descrizione: data.descrizione || "",
      immagini: (data.immagini || []).map((url: string) => ({ url })),
      categoria: data.categoria || null, // stringa, es. "Soggiorno"
      collezione: data.collezione || null, // stringa, es. "Ares"
      in_evidenza: data.in_evidenza ?? true,
    };
  });
};

export const fetchCategories = async () => {
  const products = await fetchProducts();
  const names = [...new Set(products.map((p) => p.categoria).filter(Boolean))];
  return names.map((nome) => ({ id: nome, nome, immagine: null }));
};

export const fetchCollections = async () => {
  const products = await fetchProducts();
  const names = [...new Set(products.map((p) => p.collezione).filter(Boolean))];
  return names.map((nome) => ({ id: nome, nome, immagine_hero: null }));
};
