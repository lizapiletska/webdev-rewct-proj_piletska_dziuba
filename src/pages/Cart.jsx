import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { ShoppingBagIcon, TrashIcon } from '../components/Icons.jsx';

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

const DELIVERY_FEE = 69;

export default function Cart() {
  const { items, totalSum, totalQty, setQty, remove, clear } = useCart();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    delivery: 'nova-poshta',
    city: '',
    branch: '',
    payment: 'card',
    cardNumber: '',
    cardDate: '',
    cardCvv: '',
  });

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  const isValid = useMemo(() => {
    if (!form.firstName.trim() || !form.lastName.trim() || !form.phone.trim()) return false;
    if (form.delivery === 'nova-poshta' && (!form.city.trim() || !form.branch.trim())) return false;
    if (form.payment === 'card' && (!form.cardNumber.trim() || !form.cardDate.trim() || !form.cardCvv.trim())) return false;
    return true;
  }, [form]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid || items.length === 0) return;
    setSubmitted(true);
    clear();
    setTimeout(() => navigate('/'), 2400);
  }

  if (submitted) {
    return (
      <section className="checkout container">
        <h1 className="checkout__title">дякуємо!</h1>
        <p style={{ textAlign: 'center' }}>Замовлення прийнято. Менеджер зв'яжеться з тобою найближчим часом.</p>
      </section>
    );
  }

  return (
    <section className="checkout">
      <div className="container">
        <h1 className="checkout__title">оформлення замовлення</h1>

        <form className="checkout__grid" onSubmit={handleSubmit}>
          <div className="checkout__main">
            <div className="checkout-card checkout-card--bag">
              <div className="checkout-card__head">
                <span className="cart-pop__bag">
                  <ShoppingBagIcon width={22} height={26} />
                  {totalQty > 0 && <span className="cart-pop__bag-count">{totalQty}</span>}
                </span>
                <span className="checkout-card__title">твоя сумка:</span>
              </div>

              {items.length === 0 ? (
                <p className="empty" style={{ padding: '12px 0' }}>Кошик порожній. <Link to="/catalog">До каталогу →</Link></p>
              ) : (
                <>
                  <div className="checkout__items">
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
                  <div className="checkout-card__total">
                    <span className="checkout-card__total-label">Комбучі на суму:</span>
                    <span className="checkout-card__total-value">{totalSum} ₴</span>
                  </div>
                </>
              )}
            </div>

            <fieldset className="checkout-card">
              <legend className="checkout-card__title">дані</legend>
              <Field label="Ім'я" value={form.firstName} placeholder="Поле" onChange={(v) => update('firstName', v)} />
              <Field label="Прізвище" value={form.lastName} placeholder="Поле" onChange={(v) => update('lastName', v)} />
              <Field label="Номер телефону" value={form.phone} placeholder="+38 (0XX) XXX-XX-XX" onChange={(v) => update('phone', v)} />
            </fieldset>

            <fieldset className="checkout-card">
              <legend className="checkout-card__title">спосіб доставки</legend>
              <RadioOption
                checked={form.delivery === 'nova-poshta'}
                onSelect={() => update('delivery', 'nova-poshta')}
                label="Відділення нової пошти"
              />
              {form.delivery === 'nova-poshta' && (
                <div className="checkout-card__row">
                  <SelectField
                    value={form.city}
                    placeholder="Місто"
                    onChange={(v) => update('city', v)}
                  />
                  <SelectField
                    value={form.branch}
                    placeholder="N відділення"
                    onChange={(v) => update('branch', v)}
                  />
                </div>
              )}
              <RadioOption
                checked={form.delivery === 'postomat'}
                onSelect={() => update('delivery', 'postomat')}
                label="Поштомат"
              />
              <RadioOption
                checked={form.delivery === 'courier'}
                onSelect={() => update('delivery', 'courier')}
                label="Кур'єр"
              />
            </fieldset>

            <fieldset className="checkout-card">
              <legend className="checkout-card__title">оплата</legend>
              <RadioOption
                checked={form.payment === 'on-delivery'}
                onSelect={() => update('payment', 'on-delivery')}
                label="Під час отримання"
              />
              <RadioOption
                checked={form.payment === 'card'}
                onSelect={() => update('payment', 'card')}
                label="Карткою"
              />
              {form.payment === 'card' && (
                <>
                  <InputBox
                    value={form.cardNumber}
                    placeholder="1234 5678 9012 3456"
                    onChange={(v) => update('cardNumber', v)}
                  />
                  <div className="checkout-card__row">
                    <InputBox
                      value={form.cardDate}
                      placeholder="00/00"
                      onChange={(v) => update('cardDate', v)}
                    />
                    <InputBox
                      value={form.cardCvv}
                      placeholder="Код CVV"
                      onChange={(v) => update('cardCvv', v)}
                    />
                  </div>
                </>
              )}
              <RadioOption
                checked={form.payment === 'liqpay'}
                onSelect={() => update('payment', 'liqpay')}
                label="LiqPay/ ApplePay"
              />
              <RadioOption
                checked={form.payment === 'privat24'}
                onSelect={() => update('payment', 'privat24')}
                label="Privat24"
              />
            </fieldset>
          </div>

          <aside className="checkout__summary">
            <div className="checkout-card checkout-card--summary">
              <span className="checkout-card__title">ціна:</span>
              <div className="summary__lines">
                <div className="summary__line">
                  <span className="summary__label">Комбучі на суму:</span>
                  <span className="summary__value">{totalSum} ГРН</span>
                </div>
                <div className="summary__line">
                  <span className="summary__label">Вартість доставки:</span>
                  <span className="summary__value">{DELIVERY_FEE} ГРН</span>
                </div>
                <div className="summary__line">
                  <span className="summary__label">Загальна вартість:</span>
                  <span className="summary__value">{totalSum + DELIVERY_FEE} ГРН</span>
                </div>
              </div>
              <button
                type="submit"
                className={`checkout__submit${isValid && items.length > 0 ? '' : ' is-disabled'}`}
                disabled={!isValid || items.length === 0}
              >
                оформити
              </button>
            </div>
          </aside>
        </form>
      </div>
    </section>
  );
}

function Field({ label, value, placeholder, onChange }) {
  return (
    <label className="checkout-field">
      <span className="checkout-field__label">{label}</span>
      <input
        className="checkout-field__input"
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function InputBox({ value, placeholder, onChange }) {
  return (
    <input
      className="checkout-field__input"
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function SelectField({ value, placeholder, onChange }) {
  return (
    <div className="checkout-select">
      <input
        type="text"
        className="checkout-field__input"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      <svg className="checkout-select__caret" width="14" height="9" viewBox="0 0 14 9" aria-hidden="true">
        <path d="M1 1l6 6 6-6" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function RadioOption({ checked, onSelect, label }) {
  return (
    <button
      type="button"
      className={`checkout-radio${checked ? ' is-checked' : ''}`}
      onClick={onSelect}
      aria-pressed={checked}
    >
      <span className="checkout-radio__label">{label}</span>
      <span className="checkout-radio__dot" aria-hidden="true" />
    </button>
  );
}
