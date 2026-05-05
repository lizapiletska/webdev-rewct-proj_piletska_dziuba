import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { ShoppingBagIcon } from './Icons.jsx';

export default function Header() {
  const { totalQty, openDrawer } = useCart();
  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__logo" aria-label="spraga — на головну">
          <img src="/images/ui/logo_spraga.png" alt="spraga" />
        </Link>
        <nav className="header__nav">
          <NavLink to="/catalog">комбуча</NavLink>
        </nav>
        <div className="header__spacer" />
        <button
          className="header__cart"
          onClick={openDrawer}
          aria-label="Відкрити кошик"
        >
          <ShoppingBagIcon />
          {totalQty > 0 && <span className="header__cart-badge">{totalQty}</span>}
        </button>
      </div>
    </header>
  );
}
