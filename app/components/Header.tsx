"use client";

import { useState } from "react";

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <header className="w-full bg-gray-900/95 backdrop-blur-md text-white flex items-center justify-between px-8 py-3 shadow-lg fixed top-0 left-0 z-50 border-b-2 border-yellow-400/50 relative overflow-hidden">
      {/* Subtle yellow dot SVG pattern background */}
      <div aria-hidden="true" className="absolute inset-0 z-0 opacity-15 pointer-events-none select-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD600' fill-opacity='0.25'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }} />
      </div>
      {/* Soft yellow glow */}
      <div aria-hidden="true" className="absolute left-1/2 top-0 -translate-x-1/2 z-0" style={{width: '40vw', height: '100%', filter: 'blur(32px)', background: 'radial-gradient(circle, rgba(255,214,0,0.10) 0%, rgba(255,214,0,0.0) 80%)'}} />
      <div className="relative z-10 w-full flex items-center justify-between">
      {/* Logo space */}
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="CeylonStep Logo" className="h-12 w-12 object-cover rounded-full border-2 border-yellow-400 shadow-lg" />
          <span className="text-2xl font-extrabold tracking-tight text-yellow-400 drop-shadow-sm">CeylonStep</span>
        </div>
      {/* Navigation - desktop */}
        <nav className="hidden md:block">
          <ul className="flex gap-10 text-lg font-semibold">
            <li><a href="/" className="relative text-gray-200 hover:text-yellow-400 after:block after:h-0.5 after:bg-yellow-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Home</a></li>
            <li><a href="/#about" className="relative text-gray-200 hover:text-yellow-400 after:block after:h-0.5 after:bg-yellow-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">About</a></li>
            <li><a href="/vehicles" className="relative text-gray-200 hover:text-yellow-400 after:block after:h-0.5 after:bg-yellow-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Vehicles</a></li>
            <li><a href="/#services" className="relative text-gray-200 hover:text-yellow-400 after:block after:h-0.5 after:bg-yellow-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Services</a></li>
            <li><a href="/#gallery" className="relative text-gray-200 hover:text-yellow-400 after:block after:h-0.5 after:bg-yellow-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Gallery</a></li>
            <li><a href="/#reviews" className="relative text-gray-200 hover:text-yellow-400 after:block after:h-0.5 after:bg-yellow-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Reviews</a></li>
            <li><a href="/#contact" className="relative text-gray-200 hover:text-yellow-400 after:block after:h-0.5 after:bg-yellow-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Contact</a></li>
          </ul>
        </nav>
      </div>
      {/* Hamburger menu for mobile with animation, replaced by back arrow when open */}
      {!drawerOpen ? (
        <button
          className="md:hidden flex flex-col gap-1.5 items-center justify-center p-2 rounded hover:bg-yellow-400/10 transition relative z-50"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open navigation menu"
        >
          <span className="block w-7 h-0.5 bg-yellow-400 transition-all duration-300"></span>
          <span className="block w-7 h-0.5 bg-yellow-400 transition-all duration-300"></span>
          <span className="block w-7 h-0.5 bg-yellow-400 transition-all duration-300"></span>
        </button>
      ) : null}
      {/* Mobile Drawer */}
      {drawerOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close navigation menu overlay"
          />
          <nav className="fixed top-2 right-2 h-[96vh] w-72 bg-gray-900/95 backdrop-blur-2xl shadow-2xl rounded-2xl z-50 flex flex-col p-8 gap-8 animate-slide-in border border-yellow-400/30 relative overflow-hidden" style={{background: 'linear-gradient(135deg, #23272F 0%, #18181b 100%)'}}>
            {/* Back Arrow for closing drawer */}
            <button
              className="absolute top-4 left-4 z-50 flex items-center gap-2 text-yellow-400 hover:text-yellow-300 text-2xl font-bold focus:outline-none"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close navigation menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            {/* Subtle yellow dot SVG pattern background */}
            <div aria-hidden="true" className="absolute inset-0 z-0 opacity-15 pointer-events-none select-none">
              <div className="absolute inset-0" style={{
                backgroundImage: `url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD600' fill-opacity='0.25'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")`,
                backgroundSize: '60px 60px',
              }} />
            </div>
            {/* Soft yellow glow */}
            <div aria-hidden="true" className="absolute left-1/2 top-0 -translate-x-1/2 z-0" style={{width: '40vw', height: '100%', filter: 'blur(32px)', background: 'radial-gradient(circle, rgba(255,214,0,0.10) 0%, rgba(255,214,0,0.0) 80%)'}} />
            <div className="relative z-10 flex flex-col items-center gap-4 mb-6 mt-8">
              <img src="/logo.png" alt="CeylonStep Logo" className="h-14 w-14 object-cover rounded-full border-2 border-yellow-400 shadow-lg" />
              <span className="text-xl font-extrabold tracking-tight text-yellow-400">CeylonStep</span>
            </div>
            <ul className="relative z-10 flex flex-col gap-6 text-lg font-semibold text-gray-200">
              <li><a href="/" onClick={() => setDrawerOpen(false)} className="hover:text-yellow-400 transition">Home</a></li>
              <li><a href="/#about" onClick={() => setDrawerOpen(false)} className="hover:text-yellow-400 transition">About</a></li>
              <li><a href="/vehicles" onClick={() => setDrawerOpen(false)} className="hover:text-yellow-400 transition">Vehicles</a></li>
              <li><a href="/#services" onClick={() => setDrawerOpen(false)} className="hover:text-yellow-400 transition">Services</a></li>
              <li><a href="/#gallery" onClick={() => setDrawerOpen(false)} className="hover:text-yellow-400 transition">Gallery</a></li>
              <li><a href="/#reviews" onClick={() => setDrawerOpen(false)} className="hover:text-yellow-400 transition">Reviews</a></li>
              <li><a href="/#contact" onClick={() => setDrawerOpen(false)} className="hover:text-yellow-400 transition">Contact</a></li>
            </ul>
            <div className="relative z-10 flex justify-center gap-4 mt-auto">
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
          `}</style>
        </>
      )}
    </header>
  );
} 