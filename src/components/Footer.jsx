import { InstagramIcon } from './Icons.jsx';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <h2 className="footer__heading">
          <span>зв'яжіться з нами</span>
          <svg className="footer__heading-arrow" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M22.9874 10.5126C23.6709 11.196 23.6709 12.304 22.9874 12.9874L12.9874 22.9874C12.304 23.6709 11.196 23.6709 10.5126 22.9874L0.512561 12.9874C-0.170855 12.304 -0.170855 11.196 0.512561 10.5126C1.19598 9.82915 2.30402 9.82915 2.98744 10.5126L10 17.5251L10 -5.90104e-07L13.5 -4.37114e-07L13.5 17.5251L20.5126 10.5126C21.196 9.82915 22.304 9.82915 22.9874 10.5126Z"
              fill="#000"
            />
          </svg>
        </h2>

        <ul className="footer__contacts">
          <li className="footer__contact">
            <a href="mailto:spraga@gmail.com">spraga@gmail.com</a>
          </li>
          <li className="footer__contact">
            <a href="tel:+380000000000">+38 (0XX) XXX-XX-XX</a>
          </li>
          <li className="footer__contact">
            <a
              href="https://instagram.com/yahtoll"
              target="_blank"
              rel="noreferrer"
              className="footer__instagram"
            >
              <span>instagram</span>
              <InstagramIcon />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
