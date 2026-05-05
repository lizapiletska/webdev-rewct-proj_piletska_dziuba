import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { PromoFlowerIcon } from './Icons.jsx';

const SET_IMAGES = {
  'try-all': [
    '/images/products/drink_pomegrante.png',
    '/images/products/drink_classic.png',
    '/images/products/drink_cherry.png',
    '/images/products/drink_apple.png',
  ],
  'garnet-set': [
    '/images/products/drink_pomegrante.png',
    '/images/products/drink_pomegrante.png',
    '/images/products/drink_pomegrante.png',
    '/images/products/drink_pomegrante.png',
  ],
};

function PromoFlower({ price }) {
  return (
    <span className="product-card__promo" aria-hidden="true">
      <PromoFlowerIcon className="product-card__promo-shape" />
      <span className="product-card__promo-text">{price} ₴</span>
    </span>
  );
}

export default function ProductCard({ product, showPromo = false }) {
  const { add } = useCart();
  const setImages = SET_IMAGES[product.id];
  const tagsTop = product.tags.slice(0, 2);
  const tagBottom = product.tags[2];

  return (
    <article className="product-card">
      {showPromo && product.promo && <PromoFlower price={product.price} />}

      <div className="product-card__top">
        <div className="product-card__head">
          <span className="product-card__name">{product.name}</span>
          {!showPromo && (
            <span className="product-card__price">{product.price} ₴</span>
          )}
        </div>

        <Link
          to={`/catalog/${product.slug}`}
          className={`product-card__media${setImages ? ' product-card__media--multi' : ''}`}
          aria-label={`Перейти до ${product.name}`}
        >
          {setImages ? (
            setImages.map((src, i) => (
              <img key={i} src={src} alt="" loading="lazy" />
            ))
          ) : (
            <img src={product.image} alt={product.fullName} loading="lazy" />
          )}
        </Link>
      </div>

      <div className="product-card__bottom">
        {tagsTop.length > 0 && (
          <div className="product-card__tag-row">
            {tagsTop.map((t) => (
              <span className="product-card__tag" key={t}>{t}</span>
            ))}
          </div>
        )}

        <div className="product-card__tag-row">
          {tagBottom ? (
            <span className="product-card__tag product-card__tag--wide">{tagBottom}</span>
          ) : (
            <span className="product-card__tag product-card__tag--wide">в наявності</span>
          )}
          <button
            type="button"
            className="product-card__add"
            onClick={() => add(product, 1)}
            aria-label={`Додати ${product.name} до кошика`}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
              <rect x="14" y="6" width="4" height="20" fill="#000" />
              <rect x="6" y="14" width="20" height="4" fill="#000" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
