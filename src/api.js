const FALLBACK = '/db.json';
const API = 'http://localhost:4000';

async function tryFetch(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error('bad status');
  return res.json();
}

export async function fetchProducts() {
  try {
    return await tryFetch(`${API}/products`);
  } catch {
    const data = await tryFetch(FALLBACK);
    return data.products;
  }
}

export async function fetchProduct(id) {
  try {
    return await tryFetch(`${API}/products/${id}`);
  } catch {
    const data = await tryFetch(FALLBACK);
    return data.products.find((p) => p.id === id || p.slug === id);
  }
}

export async function fetchReviews() {
  try {
    return await tryFetch(`${API}/reviews`);
  } catch {
    const data = await tryFetch(FALLBACK);
    return data.reviews;
  }
}

export async function fetchProductReviews() {
  try {
    return await tryFetch(`${API}/productReviews`);
  } catch {
    const data = await tryFetch(FALLBACK);
    return data.productReviews || [];
  }
}
