import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProduct, fetchProducts, fetchProductReviews } from '../api.js';
import ProductCard from '../components/ProductCard.jsx';
import ReviewCard from '../components/ReviewCard.jsx';
import { MoodIcon } from '../components/Icons.jsx';
import { useCart } from '../context/CartContext.jsx';

const DECOR_TONES = {
  cherry: 'cherry',
  apple: 'apple',
  classic: 'classic',
  garnet: 'garnet',
};

const ALL_TASTES = ['apple', 'cherry', 'classic', 'garnet'];

function ArrowGlyph({ direction = 'right' }) {
  if (direction === 'left') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.9874 22.9874C12.304 23.6709 11.196 23.6709 10.5126 22.9874L0.512563 12.9874C-0.170854 12.304 -0.170853 11.196 0.512563 10.5126L10.5126 0.512561C11.196 -0.170856 12.304 -0.170856 12.9874 0.512561C13.6709 1.19598 13.6709 2.30402 12.9874 2.98744L5.97487 10L23.5 10L23.5 13.5L5.97487 13.5L12.9874 20.5126C13.6709 21.196 13.6709 22.304 12.9874 22.9874Z"
          fill="#000"
        />
      </svg>
    );
  }
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5126 0.512563C11.196 -0.170854 12.304 -0.170854 12.9874 0.512563L22.9874 10.5126C23.6709 11.196 23.6709 12.304 22.9874 12.9874L12.9874 22.9874C12.304 23.6709 11.196 23.6709 10.5126 22.9874C9.82915 22.304 9.82915 21.196 10.5126 20.5126L17.5251 13.5H0V10H17.5251L10.5126 2.98744C9.82915 2.30402 9.82915 1.19598 10.5126 0.512563Z"
        fill="#000"
      />
    </svg>
  );
}

export default function Product() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewStart, setReviewStart] = useState(0);
  const [qty, setQty] = useState(1);
  const { add } = useCart();

  useEffect(() => {
    setProduct(null);
    setQty(1);
    setReviewStart(0);
    fetchProduct(slug).then(setProduct);
    fetchProducts().then(setAllProducts);
    fetchProductReviews().then(setReviews);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const related = useMemo(
    () => allProducts.filter((p) => p.slug !== slug).slice(0, 3),
    [allProducts, slug]
  );

  const visibleReviews = useMemo(() => {
    if (reviews.length === 0) return [];
    const out = [];
    for (let i = 0; i < 3; i++) {
      out.push(reviews[(reviewStart + i) % reviews.length]);
    }
    return out;
  }, [reviews, reviewStart]);

  if (!product) {
    return (
      <div className="container product">
        <div className="skeleton" style={{ height: 460 }} />
      </div>
    );
  }

  const tone = DECOR_TONES[product.id] || 'cherry';

  return (
    <section className="product">
      <div className="container">
        <div className="product__hero">
          <div className="product__media" data-tone={tone}>
            <span className="product__decor product__decor--1" aria-hidden="true">
              <MoodIcon id={tone} width="100%" height="100%" />
            </span>
            <span className="product__decor product__decor--2" aria-hidden="true">
              <MoodIcon id={tone} width="100%" height="100%" />
            </span>
            <img className="product__can" src={product.image} alt={product.fullName} />
          </div>

          <div className="product__info">
            <h1 className="product__title">{product.fullName}</h1>
            <hr className="product__divider" />

            <div className="product__tags">
              {product.tags.map((t) => (
                <span className="product__tag" key={t}>{t}</span>
              ))}
            </div>

            <div className="product__moods">
              {ALL_TASTES.filter((t) => t !== product.id).map((m) => (
                <Link
                  key={m}
                  to={`/catalog/${m}`}
                  className="product__mood-link"
                  aria-label={`Перейти до смаку ${m}`}
                >
                  <MoodIcon id={m} className="product__mood" />
                </Link>
              ))}
            </div>

            <div className="product__about">
              <h4 className="product__about-head">про напій:</h4>
              <p className="product__about-text">{product.description}</p>
            </div>

            <div className="product__buy">
              <button
                className="product__buy-btn"
                onClick={() => add(product, qty)}
                type="button"
              >
                кинути в сумку
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 12h14M13 6l7 6-7 6" stroke="#000" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <div className="product__qty">
                <button
                  type="button"
                  className="product__qty-btn"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  aria-label="Зменшити"
                >
                  <svg width="22" height="4" viewBox="0 0 22 4" aria-hidden="true">
                    <rect width="22" height="4" rx="1" fill="#000" />
                  </svg>
                </button>
                <span className="product__qty-value">{qty}</span>
                <button
                  type="button"
                  className="product__qty-btn"
                  onClick={() => setQty(qty + 1)}
                  aria-label="Збільшити"
                >
                  <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
                    <rect x="9" y="0" width="4" height="22" rx="1" fill="#000" />
                    <rect x="0" y="9" width="22" height="4" rx="1" fill="#000" />
                  </svg>
                </button>
              </div>

              <span className="product__price">{qty * product.price} ₴</span>
            </div>
          </div>
        </div>

        {reviews.length > 0 && (
          <section className="product__reviews">
            <button
              type="button"
              className="product__reviews-arrow"
              onClick={() => setReviewStart((s) => (s - 1 + reviews.length) % reviews.length)}
              aria-label="Попередні відгуки"
            >
              <ArrowGlyph direction="left" />
            </button>
            <div className="product__reviews-track">
              {visibleReviews.map((r, i) => (
                <ReviewCard key={`${r.id}-${i}`} review={r} />
              ))}
            </div>
            <button
              type="button"
              className="product__reviews-arrow"
              onClick={() => setReviewStart((s) => (s + 1) % reviews.length)}
              aria-label="Наступні відгуки"
            >
              <ArrowGlyph direction="right" />
            </button>
          </section>
        )}

        <section className="cross-sell">
          <div className="cross-sell__head">
            <span className="cross-sell__title">також купують:</span>
          </div>
          <div className="cross-sell__row">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} showPromo={p.promo} />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
