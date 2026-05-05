import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { ShoppingBagIcon, CloseIcon, TrashIcon } from './Icons.jsx';

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

export default function CartDrawer() {
  const { open, closeDrawer, items, totalQty, setQty, remove } = useCart();

  return (
    <>
      <div
        className={`cart-pop-overlay${open ? ' is-open' : ''}`}
        onClick={closeDrawer}
        aria-hidden="true"
      />
      <aside
        className={`cart-pop${open ? ' is-open' : ''}`}
        role="dialog"
        aria-label="Кошик"
        aria-hidden={!open}
      >
        <header className="cart-pop__head">
          <div className="cart-pop__title-group">
            <span className="cart-pop__bag">
              <ShoppingBagIcon width={22} height={26} />
              {totalQty > 0 && <span className="cart-pop__bag-count">{totalQty}</span>}
            </span>
            <span className="cart-pop__title">твоя сумка:</span>
          </div>
          <button
            type="button"
            className="cart-pop__close"
            onClick={closeDrawer}
            aria-label="Закрити"
          >
            <CloseIcon size={18} />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="cart-pop__empty">
            Поки що порожньо.<br />Знайди свій смак ↓
          </div>
        ) : (
          <>
            <div className="cart-pop__items">
              {items.map((it) => {
                const setImages = SET_IMAGES[it.id];
                return (
                  <article className="cart-pop__item" key={it.id}>
                    <div className={`cart-pop__media${setImages ? ' cart-pop__media--multi' : ''}`}>
                      {setImages
                        ? setImages.map((src, i) => <img key={i} src={src} alt="" />)
                        : <img src={it.image} alt="" />}
                    </div>
                    <div className="cart-pop__details">
                      <div className="cart-pop__details-top">
                        <h3 className="cart-pop__name">{it.fullName || it.name}</h3>
                        <button
                          type="button"
                          className="cart-pop__remove"
                          onClick={() => remove(it.id)}
                          aria-label="Видалити"
                        >
                          <TrashIcon width={21} height={27} />
                        </button>
                      </div>
                      <div className="cart-pop__details-bottom">
                        <div className="cart-pop__qty">
                          <button
                            type="button"
                            className="cart-pop__qty-btn"
                            onClick={() => setQty(it.id, it.qty - 1)}
                            aria-label="Зменшити"
                          >
                            <svg width="16" height="3" viewBox="0 0 16 3" aria-hidden="true">
                              <rect width="16" height="3" rx="1" fill="#000" />
                            </svg>
                          </button>
                          <span className="cart-pop__qty-value">{it.qty}</span>
                          <button
                            type="button"
                            className="cart-pop__qty-btn"
                            onClick={() => setQty(it.id, it.qty + 1)}
                            aria-label="Збільшити"
                          >
                            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                              <rect x="6.5" y="0" width="3" height="16" rx="1" fill="#000" />
                              <rect x="0" y="6.5" width="16" height="3" rx="1" fill="#000" />
                            </svg>
                          </button>
                        </div>
                        <span className="cart-pop__price">{it.qty * it.price} ₴</span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <Link
              to="/cart"
              className="cart-pop__checkout"
              onClick={closeDrawer}
            >
              оформити
              <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M4 12h14M13 6l7 6-7 6"
                  stroke="#000"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </>
        )}
      </aside>
    </>
  );
}
