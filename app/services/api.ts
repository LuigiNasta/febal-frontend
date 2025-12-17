const API_URL = "http://febal-cms-production.up.railway.app";

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
