"use client";

import { useState } from "react";

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <header className="w-full bg-white/30 backdrop-blur-md text-gray-900 flex items-center justify-between px-8 py-3 shadow-lg fixed top-0 left-0 z-50 border-b border-white/20">
      {/* Logo space */}
      <div className="flex items-center gap-3">
        <img src="/logo.png" alt="CeylonStep Logo" className="h-12 w-12 object-cover rounded-full border-2 border-white shadow" />
        <span className="text-2xl font-extrabold tracking-tight drop-shadow-sm">CeylonStep</span>
      </div>
      {/* Navigation - desktop */}
      <nav className="hidden md:block">
        <ul className="flex gap-10 text-lg font-semibold">
          <li><a href="/" className="relative after:block after:h-0.5 after:bg-yellow-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Home</a></li>
          <li><a href="/#about" className="relative after:block after:h-0.5 after:bg-yellow-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">About</a></li>
          <li><a href="/vehicles" className="relative after:block after:h-0.5 after:bg-yellow-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Vehicles</a></li>
          <li><a href="/#services" className="relative after:block after:h-0.5 after:bg-yellow-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Services</a></li>
          <li><a href="/#gallery" className="relative after:block after:h-0.5 after:bg-yellow-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Gallery</a></li>
          <li><a href="/#reviews" className="relative after:block after:h-0.5 after:bg-yellow-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Reviews</a></li>
          <li><a href="/#contact" className="relative after:block after:h-0.5 after:bg-yellow-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Contact</a></li>
        </ul>
      </nav>
      {/* Hamburger menu for mobile with animation */}
      <button
        className={`md:hidden flex flex-col gap-1.5 items-center justify-center p-2 rounded hover:bg-white/40 transition relative z-50 ${drawerOpen ? 'open' : ''}`}
        onClick={() => setDrawerOpen(!drawerOpen)}
        aria-label={drawerOpen ? "Close navigation menu" : "Open navigation menu"}
      >
        <span className={`block w-7 h-0.5 bg-gray-900 transition-all duration-300 ${drawerOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`block w-7 h-0.5 bg-gray-900 transition-all duration-300 ${drawerOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-7 h-0.5 bg-gray-900 transition-all duration-300 ${drawerOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>
      {/* Mobile Drawer */}
      {drawerOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close navigation menu overlay"
          />
          <nav className="fixed top-2 right-2 h-[96vh] w-72 bg-white/80 backdrop-blur-2xl shadow-2xl rounded-2xl z-50 flex flex-col p-8 gap-8 animate-slide-in border border-yellow-100/40" style={{background: 'linear-gradient(135deg, #fffbe6 0%, #fff 60%, #fffbe6 100%)'}}>
            <div className="flex flex-col items-center gap-4 mb-6">
              <img src="/logo.png" alt="CeylonStep Logo" className="h-14 w-14 object-cover rounded-full border-2 border-yellow-400 shadow" />
              <span className="text-xl font-extrabold tracking-tight text-yellow-500">CeylonStep</span>
            </div>
            <ul className="flex flex-col gap-6 text-lg font-semibold text-gray-900">
              <li><a href="/" onClick={() => setDrawerOpen(false)} className="hover:text-yellow-500 transition">Home</a></li>
              <li><a href="/#about" onClick={() => setDrawerOpen(false)} className="hover:text-yellow-500 transition">About</a></li>
              <li><a href="/vehicles" onClick={() => setDrawerOpen(false)} className="hover:text-yellow-500 transition">Vehicles</a></li>
              <li><a href="/#services" onClick={() => setDrawerOpen(false)} className="hover:text-yellow-500 transition">Services</a></li>
              <li><a href="/#gallery" onClick={() => setDrawerOpen(false)} className="hover:text-yellow-500 transition">Gallery</a></li>
              <li><a href="/#reviews" onClick={() => setDrawerOpen(false)} className="hover:text-yellow-500 transition">Reviews</a></li>
              <li><a href="/#contact" onClick={() => setDrawerOpen(false)} className="hover:text-yellow-500 transition">Contact</a></li>
            </ul>
            <div className="flex justify-center gap-4 mt-auto">
              <a href="#" className="w-9 h-9 bg-yellow-400 text-gray-900 rounded-full flex items-center justify-center hover:bg-yellow-300 transition-colors duration-300 shadow-lg" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
              </a>
              <a href="#" className="w-9 h-9 bg-yellow-400 text-gray-900 rounded-full flex items-center justify-center hover:bg-yellow-300 transition-colors duration-300 shadow-lg" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.497 5.782 2.225 7.148 2.163 8.414 2.105 8.794 2.163 12 2.163zm0-2.163C8.741 0 8.333.014 7.053.072 2.695.272.273 2.694.073 7.052.014 8.332 0 8.74 0 12c0 3.259.014 3.667.072 4.947.2 4.358 2.622 6.78 6.98 6.98 1.28.058 1.688.072 4.948.072s3.668-.014 4.948-.072c4.358-.2 6.78-2.622 6.98-6.98.058-1.28.072-1.688.072-4.948s-.014-3.668-.072-4.948c-.2-4.358-2.622-6.78-6.98-6.98C15.668.014 15.26 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/></svg>
              </a>
              <a href="#" className="w-9 h-9 bg-yellow-400 text-gray-900 rounded-full flex items-center justify-center hover:bg-yellow-300 transition-colors duration-300 shadow-lg" aria-label="TikTok">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.75 2v12.25a2.25 2.25 0 11-2.25-2.25c.124 0 .25.012.375.037V9.75a5.25 5.25 0 102.25 4.5V2h-0.375zm6.75 0v2.25a3.75 3.75 0 01-3.75-3.75H15V9.75a7.5 7.5 0 007.5 7.5v-2.25a5.25 5.25 0 01-5.25-5.25V2h-0.375z"/></svg>
              </a>
            </div>
          </nav>
          <style>{`
            @keyframes slide-in {
              from { transform: translateX(100%); }
              to { transform: translateX(0); }
            }
            .animate-slide-in {
              animation: slide-in 0.3s cubic-bezier(0.4,0,0.2,1);
            }
            /* Hamburger animation */
            .open span:nth-child(1) { transform: rotate(45deg) translateY(8px); }
            .open span:nth-child(2) { opacity: 0; }
            .open span:nth-child(3) { transform: rotate(-45deg) translateY(-8px); }
          `}</style>
        </>
      )}
    </header>
  );
} 