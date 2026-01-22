const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchCategories = async () => {
  const res = await fetch(`${API_URL}/categorie?populate=*`);
  const json = await res.json();
  return json.data;
};

export const fetchCollections = async () => {
  const res = await fetch(`${API_URL}/collezioni?populate=*`);
  const json = await res.json();
  return json.data;
};

export const fetchProducts = async () => {
  const res = await fetch(`${API_URL}/prodotti?populate=*`);
  const json = await res.json();
  return json.data;
};
