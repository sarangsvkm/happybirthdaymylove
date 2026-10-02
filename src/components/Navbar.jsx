import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Lock, Unlock } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export default function Navbar({ isUnlocked }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    if (!isUnlocked && id !== 'hero') return;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[#0b0512]/80 backdrop-blur-lg border-b border-rose-500/20 shadow-lg shadow-rose-950/20'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-2 font-serif-romantic text-lg sm:text-xl font-bold text-white group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center border border-rose-500/40 group-hover:scale-110 transition-transform">
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
          </div>
          <span className="tracking-wide">
            {birthdayData.recipientName}'s <span className="text-rose-400 font-script text-2xl font-normal">Day</span>
          </span>
        </button>

        {/* Navigation Links */}
        {isUnlocked ? (
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-rose-100/80">
            <button onClick={() => scrollToSection('hero')} className="hover:text-rose-300 transition-colors cursor-pointer">
              Hero
            </button>
            <button onClick={() => scrollToSection('memories')} className="hover:text-rose-300 transition-colors cursor-pointer">
              Memories
            </button>
            <button onClick={() => scrollToSection('gallery')} className="hover:text-rose-300 transition-colors cursor-pointer">
              Gallery
            </button>
            <button onClick={() => scrollToSection('letter')} className="hover:text-rose-300 transition-colors cursor-pointer">
              Love Letter
            </button>
            <button onClick={() => scrollToSection('surprises')} className="hover:text-rose-300 transition-colors cursor-pointer">
              Surprises
            </button>
          </nav>
        ) : (
          <div className="hidden md:flex items-center gap-2 text-xs text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
            <Lock className="w-3.5 h-3.5" />
            <span>Full Sections Unlock at 12:00 AM Midnight</span>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={() => scrollToSection(isUnlocked ? 'surprises' : 'hero')}
          className="px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-md shadow-rose-500/20 hover:scale-105 transition-transform cursor-pointer"
        >
          {isUnlocked ? (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Surprises</span>
            </>
          ) : (
            <>
              <Lock className="w-3.5 h-3.5" />
              <span>Locked till 12 AM</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
