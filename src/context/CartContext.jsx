import { createContext, useContext, useEffect, useReducer } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'spraga.cart.v1';

function init() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { items: [], open: false };
}

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      const { product, qty = 1 } = action;
      const existing = state.items.find((i) => i.id === product.id);
      const items = existing
        ? state.items.map((i) =>
            i.id === product.id ? { ...i, qty: i.qty + qty } : i
          )
        : [
            ...state.items,
            {
              id: product.id,
              slug: product.slug,
              name: product.name,
              fullName: product.fullName,
              price: product.price,
              image: product.image,
              qty,
            },
          ];
      return { ...state, items, open: true };
    }
    case 'remove':
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.id),
      };
    case 'setQty': {
      const qty = Math.max(1, action.qty);
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, qty } : i
        ),
      };
    }
    case 'clear':
      return { ...state, items: [] };
    case 'openDrawer':
      return { ...state, open: true };
    case 'closeDrawer':
      return { ...state, open: false };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, init);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  const totalQty = state.items.reduce((s, i) => s + i.qty, 0);
  const totalSum = state.items.reduce((s, i) => s + i.qty * i.price, 0);

  const value = {
    items: state.items,
    open: state.open,
    totalQty,
    totalSum,
    add: (product, qty = 1) => dispatch({ type: 'add', product, qty }),
    remove: (id) => dispatch({ type: 'remove', id }),
    setQty: (id, qty) => dispatch({ type: 'setQty', id, qty }),
    clear: () => dispatch({ type: 'clear' }),
    openDrawer: () => dispatch({ type: 'openDrawer' }),
    closeDrawer: () => dispatch({ type: 'closeDrawer' }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
