import { useState } from 'react';
import ArrowIcon from './ArrowIcon.jsx';

export default function AddReviewForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [stars, setStars] = useState(5);
  const [text, setText] = useState('');
  const [done, setDone] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    onSubmit({ name: name.trim(), stars, text: text.trim() });
    setName('');
    setText('');
    setStars(5);
    setDone(true);
    setTimeout(() => setDone(false), 2400);
  }

  return (
    <form className="reviews__add" onSubmit={handleSubmit}>
      <h3>залиш свій відгук ↓</h3>
      <div className="field">
        <label htmlFor="r-name">ім'я</label>
        <input
          id="r-name"
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
        <label htmlFor="r-text">відгук</label>
        <textarea
          id="r-text"
          rows="3"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="поділись враженнями"
          required
        />
      </div>
      <button type="submit" className="btn">
        надіслати <ArrowIcon size={18} />
      </button>
      {done && <span style={{ marginLeft: 12, color: 'var(--c-green-dark)' }}>дякуємо!</span>}
    </form>
  );
}
