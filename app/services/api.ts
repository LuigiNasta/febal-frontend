const API_URL = "http://localhost:1337";

export const fetchCategories = async () => {
  const res = await fetch(`${API_URL}/api/categorie?populate=*`);
  return (await res.json()).data;
};

export const fetchCollections = async () => {
  const res = await fetch(`${API_URL}/api/collezioni?populate=*`);
  return (await res.json()).data;
};

export const fetchProducts = async () => {
  const res = await fetch(`${API_URL}/api/prodotti?populate=*`);
  return (await res.json()).data;
};
