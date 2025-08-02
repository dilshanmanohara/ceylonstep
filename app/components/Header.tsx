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
      {/* Hamburger menu for mobile */}
      <button
        className="md:hidden flex flex-col gap-1.5 items-center justify-center p-2 rounded hover:bg-white/40 transition"
        onClick={() => setDrawerOpen(true)}
        aria-label="Open navigation menu"
      >
        <span className="block w-7 h-0.5 bg-gray-900"></span>
        <span className="block w-7 h-0.5 bg-gray-900"></span>
        <span className="block w-7 h-0.5 bg-gray-900"></span>
      </button>
      {/* Mobile Drawer */}
      {drawerOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-50"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close navigation menu overlay"
          />
          <nav className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 flex flex-col p-8 gap-8 animate-slide-in">
            <button
              className="self-end mb-4 text-2xl text-gray-700 hover:text-yellow-500"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close navigation menu"
            >
              &times;
            </button>
            <ul className="flex flex-col gap-6 text-lg font-semibold">
              <li><a href="/" onClick={() => setDrawerOpen(false)} className="hover:text-yellow-500 transition">Home</a></li>
              <li><a href="/#about" onClick={() => setDrawerOpen(false)} className="hover:text-yellow-500 transition">About</a></li>
              <li><a href="/vehicles" onClick={() => setDrawerOpen(false)} className="hover:text-yellow-500 transition">Vehicles</a></li>
              <li><a href="/#services" onClick={() => setDrawerOpen(false)} className="hover:text-yellow-500 transition">Services</a></li>
              <li><a href="/#gallery" onClick={() => setDrawerOpen(false)} className="hover:text-yellow-500 transition">Gallery</a></li>
              <li><a href="/#reviews" onClick={() => setDrawerOpen(false)} className="hover:text-yellow-500 transition">Reviews</a></li>
              <li><a href="/#contact" onClick={() => setDrawerOpen(false)} className="hover:text-yellow-500 transition">Contact</a></li>
            </ul>
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