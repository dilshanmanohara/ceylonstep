"use client";

export default function WhatsAppFloat() {
  return (
    <>
      <style>{`
        @keyframes bump {
          0%, 100% { transform: scale(1); }
          10% { transform: scale(1.18); }
          20% { transform: scale(0.95); }
          30% { transform: scale(1.12); }
          40% { transform: scale(0.98); }
          50% { transform: scale(1.08); }
          60% { transform: scale(1); }
        }
      `}</style>
      <a
        href="https://wa.me/94773849022"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed z-50 bottom-8 right-8 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg p-5 md:p-6 flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
        style={{
          boxShadow: '0 4px 24px 0 rgba(37, 211, 102, 0.3)',
          animation: 'bump 1.6s infinite',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="currentColor"
        >
          <path d="M22 4C12.058 4 4 12.058 4 22c0 3.88 1.26 7.46 3.42 10.36L4 40l7.26-2.3A17.93 17.93 0 0022 40c9.942 0 18-8.058 18-18S31.942 4 22 4zm0 33c-2.98 0-5.83-.77-8.29-2.23l-.59-.34-5.89 1.87 1.88-5.74-.38-.6A14.47 14.47 0 017 22C7 13.715 13.715 7 22 7s15 6.715 15 15-6.715 15-15 15zm7.2-9.2c-.4-.2-2.32-1.14-2.67-1.27-.35-.13-.62-.2-.88.2-.26.4-1.01 1.27-1.24 1.53-.23.26-.46.28-.87.1-.41-.2-1.7-.62-3.25-1.89-1.2-1.07-2.01-2.39-2.25-2.8-.24-.41-.03-.62.18-.82.2-.2.41-.46.62-.7.21-.24.27-.41.41-.67.14-.26.07-.5-.03-.7-.1-.2-.87-2.13-1.2-2.91-.32-.77-.65-.67-.88-.68-.23-.01-.5-.01-.77-.01-.27 0-.71.1-1.09.5-.38.4-1.44 1.37-1.44 3.33 0 1.96 1.47 3.86 1.68 4.13.21.27 2.9 4.28 7.02 5.83.97.42 1.74.65 2.34.84.97.3 1.85.25 2.54.16.78-.12 2.47-1 2.82-1.97.35-.97.35-1.8.24-1.97-.11-.17-.37-.27-.78-.48z" />
        </svg>
      </a>
    </>
  );
} 