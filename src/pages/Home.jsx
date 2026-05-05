import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts, fetchReviews } from '../api.js';
import ReviewCard from '../components/ReviewCard.jsx';
import ReviewPop from '../components/ReviewPop.jsx';
import ArrowIcon from '../components/ArrowIcon.jsx';
import { MoodIcon } from '../components/Icons.jsx';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [extraReviews, setExtraReviews] = useState([]);
  const [reviewOpen, setReviewOpen] = useState(false);

  useEffect(() => {
    fetchProducts().then(setProducts).catch(() => {});
    fetchReviews().then(setReviews).catch(() => {});
  }, []);

  const allReviews = [...reviews, ...extraReviews];

  return (
    <>
      <section className="hero">
        <div className="hero__glow" aria-hidden />
        <div className="container hero__inner">
          <div className="hero__copy">
            <h1 className="hero__title">
              <span>комбуча Spraga</span>
              <span>раптом це твоє!</span>
            </h1>
            <p className="hero__subtitle">твій смак, твій момент</p>
            <div className="hero__cta">
              <Link to="/catalog" className="btn btn--lg">знайти свій смак <ArrowIcon /></Link>
            </div>
          </div>
          <div className="hero__cans" aria-hidden>
            <div className="hero__can hero__can--cherry"><img src="/images/products/drink_cherry.png" alt="" /></div>
            <div className="hero__can hero__can--apple"><img src="/images/products/drink_apple.png" alt="" /></div>
            <div className="hero__can hero__can--garnet"><img src="/images/products/drink_pomegrante.png" alt="" /></div>
            <div className="hero__can hero__can--classic"><img src="/images/products/drink_classic.png" alt="" /></div>
          </div>
        </div>
      </section>

      <section className="unique">
        <h2 className="unique__title">а в чому унікальність?</h2>
        <div className="unique__cell unique__cell--ph-xs" aria-hidden />
        <p className="unique__cell unique__cell--text-1">
          Готується з допомогою симбіотичної культури бактерій. Солодкий чай перетворюється на трохи кислуватий та ігристий завдяки природному процесу ферментації.
        </p>
        <div className="unique__cell unique__cell--ph-people" aria-hidden />
        <div className="unique__cell unique__cell--ph-bench" aria-hidden />
        <div className="unique__cell unique__cell--ph-person" aria-hidden />
        <span className="unique__smile" aria-hidden="true" />
        <p className="unique__cell unique__cell--caption">
          Це ідеальний спосіб насолодитися моментом разом!
        </p>
        <p className="unique__cell unique__cell--text-2">
          Стає вибором тих, хто слідкує за трендами та здоров'ям. Це напій, який додає кожному дню щось нове і особливе.
        </p>
        <div className="unique__cell unique__cell--ph-cards" aria-hidden />
        <div className="unique__cell unique__cell--ph-long" aria-hidden />
        <p className="unique__cell unique__cell--text-3">
          Комбуча — це не просто напій, а стиль життя, який поєднує в собі здоров'я та гарний настрій.
        </p>
      </section>

      <section className="lineup">
        <div className="container">
          <h2 className="section-title">лінійка смаків:</h2>
          <div className="lineup__row">
            {products.slice(0, 4).map((p) => (
              <Link to={`/catalog/${p.slug}`} key={p.id} className="lineup__card" aria-label={p.name}>
                <img className="lineup__card-img" src={p.image} alt={p.fullName} />
                <div className="lineup__card-info">
                  <div className="lineup__card-head">
                    <span className="lineup__card-title">про напій</span>
                    <MoodIcon id={p.id} className="lineup__card-icon" aria-hidden="true" />
                  </div>
                  <p className="lineup__card-text">{p.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="reviews">
        <div className="container">
          <h2 className="section-title">відгуки від своїх:</h2>
          <div className="reviews__scatter">
            {allReviews.slice(0, 5).map((r, i) => (
              <div className={`reviews__slot reviews__slot--${i + 1}`} key={r.id}>
                <ReviewCard review={r} />
              </div>
            ))}
          </div>

          <div className="reviews__cta">
            <button
              type="button"
              className="btn"
              onClick={() => setReviewOpen(true)}
            >
              Залишити свій відгук :)
            </button>
          </div>
        </div>
      </section>

      <ReviewPop
        open={reviewOpen}
        onClose={() => setReviewOpen(false)}
        onSubmit={(r) =>
          setExtraReviews((prev) => [
            { ...r, id: Date.now(), avatarStyle: 'main' },
            ...prev,
          ])
        }
      />

      <div className="marquee" aria-hidden>
        <div className="marquee__track">
          {Array.from({ length: 4 }).map((_, k) => (
            <span key={k}>
              освіжаюча,&nbsp;<em>легка</em>,&nbsp;терпка,&nbsp;<em>незвична</em>,&nbsp;смілива,&nbsp;<em>природна</em>,&nbsp;корисна,&nbsp;<em>пробуджуюча</em>,&nbsp;
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
