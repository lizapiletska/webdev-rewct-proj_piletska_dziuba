import { useEffect, useMemo, useState } from 'react';
import { fetchProducts } from '../api.js';
import ProductCard from '../components/ProductCard.jsx';

const FILTERS = ['терпка', 'пряна', 'фруктова', 'ягідна', 'без цукру'];

const REGULAR_ORDER = ['apple', 'classic', 'cherry'];
const PROMO_ORDER = ['garnet', 'try-all', 'garnet-set'];

const byOrder = (order) => (a, b) => {
  const ai = order.indexOf(a.id);
  const bi = order.indexOf(b.id);
  return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
};

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [active, setActive] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchProducts()
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  function toggle(tag) {
    const next = new Set(active);
    if (next.has(tag)) next.delete(tag);
    else next.add(tag);
    setActive(next);
  }

  const regular = useMemo(
    () => products.filter((p) => !p.promo).sort(byOrder(REGULAR_ORDER)),
    [products]
  );
  const promos = useMemo(
    () => products.filter((p) => p.promo).sort(byOrder(PROMO_ORDER)),
    [products]
  );

  const matchesFilter = (p) =>
    active.size === 0 || [...active].every((t) => p.tags.includes(t));

  const visibleRegular = regular.filter(matchesFilter);
  const visiblePromos = promos.filter(matchesFilter);

  return (
    <section className="catalog">
      <div className="container">
        <h1 className="catalog__title">комбуча</h1>

        <div className="catalog__filters" role="toolbar" aria-label="Фільтри смаку">
          {FILTERS.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`catalog__filter${active.has(tag) ? ' is-active' : ''}`}
              onClick={() => toggle(tag)}
              aria-pressed={active.has(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="catalog__row">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="skeleton" style={{ height: 429, width: 296, borderRadius: 24 }} />
            ))}
          </div>
        ) : (
          <>
            <div className="catalog__row">
              {visibleRegular.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            {visiblePromos.length > 0 && (
              <>
                <div className="catalog__marquee" aria-hidden="true">
                  <div className="catalog__marquee-track">
                    {Array.from({ length: 4 }).map((_, k) => (
                      <span key={k} className="catalog__marquee-group">
                        <span className="catalog__marquee-text">акційні пропозиції</span>
                        <span className="catalog__marquee-arrow">↓</span>
                        <em className="catalog__marquee-text catalog__marquee-text--italic">акційні пропозиції</em>
                        <span className="catalog__marquee-arrow">↓</span>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="catalog__row">
                  {visiblePromos.map((p) => (
                    <ProductCard key={p.id} product={p} showPromo />
                  ))}
                </div>
              </>
            )}

            {visibleRegular.length === 0 && visiblePromos.length === 0 && (
              <p className="empty">Нічого не знайшлося. Спробуй змінити фільтри.</p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
