import { useEffect, useState } from 'react';
import ArrowIcon from './ArrowIcon.jsx';
import { CloseIcon } from './Icons.jsx';

export default function ReviewPop({ open, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [stars, setStars] = useState(5);
  const [text, setText] = useState('');

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    onSubmit({ name: name.trim(), stars, text: text.trim() });
    setName('');
    setText('');
    setStars(5);
    onClose();
  }

  return (
    <>
      <div
        className={`review-pop-overlay${open ? ' is-open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`review-pop${open ? ' is-open' : ''}`}
        role="dialog"
        aria-label="Залишити відгук"
        aria-hidden={!open}
      >
        <div className="review-pop__head">
          <h3 className="review-pop__title">залиш свій відгук ↓</h3>
          <button
            type="button"
            className="review-pop__close"
            onClick={onClose}
            aria-label="Закрити"
          >
            <CloseIcon size={14} />
          </button>
        </div>

        <form className="review-pop__form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="rp-name">ім'я</label>
            <input
              id="rp-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="як до тебе звертатися"
              required
            />
          </div>

          <div className="field">
            <label>оцінка</label>
            <div className="stars-input" role="radiogroup" aria-label="Оцінка">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  type="button"
                  key={n}
                  className={n <= stars ? 'active' : ''}
                  onClick={() => setStars(n)}
                  aria-label={`${n} зірок`}
                >★</button>
              ))}
            </div>
          </div>

          <div className="field">
            <label htmlFor="rp-text">відгук</label>
            <textarea
              id="rp-text"
              rows="4"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="поділись враженнями"
              required
            />
          </div>

          <button type="submit" className="btn">
            надіслати <ArrowIcon size={18} />
          </button>
        </form>
      </div>
    </>
  );
}
