import { Link } from 'react-router-dom';
import ArrowIcon from '../components/ArrowIcon.jsx';

export default function NotFound() {
  return (
    <section className="container" style={{ padding: '120px 0', textAlign: 'center' }}>
      <h1>404</h1>
      <p style={{ marginTop: 14, color: 'var(--c-mute)' }}>Такої сторінки немає. Може, спробуєш каталог?</p>
      <div className="center-row" style={{ marginTop: 22 }}>
        <Link to="/" className="btn">на головну <ArrowIcon size={18} /></Link>
      </div>
    </section>
  );
}
