const API_URL = "https://febal-cms-strapi-production.up.railway.app";
const API_TOKEN = "73dd9abb005138fe096666c0bdfbadd9d7e7ff5289ce256c2f383cad69cff05b0947a133231ea37433cc7f5360b4edba226aed8bf1e3f956f0824d67e82af05898d421a08289b014a13d0d80facf2ae279f4c72e977c8968b95a2eaedaec39db028ad8e942cda7214e50e3b874d0852a021df0ec7d6eb2072486ee12a88547cf"; // Copia il token da Strapi

export const fetchCategories = async () => {
  const res = await fetch(`${API_URL}/api/categorie?populate=*`, {
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`
    }
  });
  return (await res.json()).data;
};

export const fetchCollections = async () => {
  const res = await fetch(`${API_URL}/api/collezioni?populate=*`, {
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`
    }
  });
  return (await res.json()).data;
};

export const fetchProducts = async () => {
  const res = await fetch(`${API_URL}/api/prodotti?populate=*`, {
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`
    }
  });
  return (await res.json()).data;
};