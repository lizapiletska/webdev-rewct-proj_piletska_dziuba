export default function ArrowIcon({ size = 24, className = 'arrow' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5126 0.512563C11.196 -0.170854 12.304 -0.170854 12.9874 0.512563L22.9874 10.5126C23.6709 11.196 23.6709 12.304 22.9874 12.9874L12.9874 22.9874C12.304 23.6709 11.196 23.6709 10.5126 22.9874C9.82915 22.304 9.82915 21.196 10.5126 20.5126L17.5251 13.5H0V10H17.5251L10.5126 2.98744C9.82915 2.30402 9.82915 1.19598 10.5126 0.512563Z"
        fill="currentColor"
      />
    </svg>
  );
}
