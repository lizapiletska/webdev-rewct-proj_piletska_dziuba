import { PromoFlowerIcon } from './Icons.jsx';

const PHOTO_BY_NAME = {
  'Анна К.': '/images/reviews/review_4.png',
  'Катря': '/images/reviews/review_5.png',
  'Юля': '/images/reviews/review_2.png',
  'Діана': '/images/reviews/review_3.png',
};

const FLOWER_PATH =
  'M25.2651 2.57215C28.1697 -0.856092 33.4573 -0.856092 36.3618 2.57215C38.1429 4.67439 40.9592 5.58945 43.6358 4.93561C48.0007 3.86936 52.2785 6.97732 52.6132 11.4581C52.8185 14.2057 54.559 16.6014 57.1088 17.6457C61.2668 19.3487 62.9007 24.3775 60.5378 28.1993C59.0889 30.5428 59.0889 33.504 60.5378 35.8476C62.9007 39.6694 61.2668 44.6982 57.1088 46.4012C54.559 47.4455 52.8185 49.8411 52.6132 52.5888C52.2785 57.0695 48.0007 60.1775 43.6358 59.1113C40.9592 58.4574 38.1429 59.3725 36.3618 61.4747C33.4573 64.903 28.1697 64.903 25.2651 61.4747C23.484 59.3725 20.6678 58.4574 17.9911 59.1113C13.6262 60.1775 9.3485 57.0695 9.01374 52.5888C8.80846 49.8411 7.06791 47.4455 4.51817 46.4012C0.360163 44.6982 -1.27379 39.6694 1.0891 35.8476C2.53806 33.504 2.53806 30.5428 1.0891 28.1993C-1.27379 24.3775 0.360164 19.3487 4.51817 17.6457C7.06791 16.6014 8.80846 14.2057 9.01374 11.4581C9.3485 6.97732 13.6262 3.86936 17.9911 4.93561C20.6678 5.58945 23.484 4.67439 25.2651 2.57215Z';

function FlowerSmile() {
  return (
    <svg className="review-card__avatar-icon" viewBox="0 0 62 65" fill="none" aria-hidden="true">
      <path d={FLOWER_PATH} fill="#FFDD33" />
      <g transform="translate(19.5 22.5)" stroke="#000" strokeWidth="3" strokeLinecap="round">
        <path d="M3.25488 1.95117V2.25164" />
        <path d="M19.9307 1.5V2.25116" />
        <path d="M1.5 9.1582C2.56381 12.8815 5.37208 17.539 9.55868 17.9861C12.0548 18.2526 14.5219 17.4637 16.576 16.069C18.7751 14.5759 19.6585 12.0202 20.8834 9.79722" />
      </g>
    </svg>
  );
}

function FlowerPhoto({ src, clipId }) {
  return (
    <svg className="review-card__avatar-icon" viewBox="0 0 62 65" aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <path d={FLOWER_PATH} />
        </clipPath>
      </defs>
      <image
        href={src}
        x="0"
        y="0"
        width="62"
        height="65"
        preserveAspectRatio="xMidYMid slice"
        clipPath={`url(#${clipId})`}
      />
    </svg>
  );
}

function FlowerStar({ filled }) {
  return <PromoFlowerIcon className="review-card__star" filled={filled} aria-hidden="true" />;
}

export default function ReviewCard({ review }) {
  const photo = PHOTO_BY_NAME[review.name];
  const clipId = `flower-clip-${review.id}`;

  return (
    <article className="review-card">
      <div className="review-card__head">
        <div className="review-card__avatar">
          {photo ? <FlowerPhoto src={photo} clipId={clipId} /> : <FlowerSmile />}
        </div>
        <span className="review-card__name">{review.name}</span>
      </div>
      <div className="review-card__body">
        <p className="review-card__text">{review.text}</p>
        <div className="review-card__stars" aria-label={`${review.stars} з 5`}>
          {[0, 1, 2, 3, 4].map((i) => (
            <FlowerStar key={i} filled={i < review.stars} />
          ))}
        </div>
      </div>
    </article>
  );
}
