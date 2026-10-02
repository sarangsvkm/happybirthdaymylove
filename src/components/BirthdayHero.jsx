import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Clock, ArrowDown, Sparkles, Lock, Unlock, KeyRound } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export default function BirthdayHero({ activeUnlocked, togglePreview, forceUnlockPreview }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(birthdayData.birthdayDate).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0 && !forceUnlockPreview) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [forceUnlockPreview]);

  const scrollToSection = () => {
    if (activeUnlocked) {
      document.getElementById('memories')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight * 0.7, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-rose-600/30 to-pink-500/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center"
      >
        {/* Floating Romantic Pill Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs sm:text-sm font-medium mb-6 backdrop-blur-md ${
            activeUnlocked
              ? 'bg-rose-500/20 border-rose-400 text-rose-200 glow-pink'
              : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
          }`}
        >
          {activeUnlocked ? (
            <>
              <Sparkles className="w-4 h-4 text-rose-400 animate-spin" />
              <span>🎉 IT'S YOUR BIRTHDAY TODAY! • Infinite Love</span>
              <Sparkles className="w-4 h-4 text-rose-400 animate-spin" />
            </>
          ) : (
            <>
              <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>⏳ Advance Birthday Mode • Official Midnight Unlock at 12:00 AM!</span>
            </>
          )}
        </motion.div>

        {/* Glowing Birthday Queen Avatar Frame */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-6 rounded-full p-1.5 bg-gradient-to-tr from-rose-500 via-pink-400 to-purple-600 shadow-2xl shadow-rose-500/50 glow-pink group"
        >
          <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#0b0512] relative bg-slate-900">
            <img
              src="/images/chakkara_birthday_queen.jpg"
              alt="Birthday Queen Chakkara"
              className="w-full h-full object-cover img-align-avatar group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xs font-bold shadow-lg border border-white/30 flex items-center gap-1.5 whitespace-nowrap">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>👑 Birthday Queen Chakkara</span>
          </div>
        </motion.div>

        {/* Main Hero Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-romantic font-bold text-white tracking-tight leading-tight mb-4">
          {activeUnlocked ? (
            <>
              Happy Birthday, <br />
              <span className="bg-gradient-to-r from-rose-400 via-pink-300 to-rose-500 bg-clip-text text-transparent glow-text-pink">
                My Love {birthdayData.recipientName} ❤️
              </span>
            </>
          ) : (
            <>
              Advance Happy Birthday, <br />
              <span className="bg-gradient-to-r from-rose-400 via-amber-200 to-pink-400 bg-clip-text text-transparent glow-text-pink">
                {birthdayData.recipientName} ❤️
              </span>
            </>
          )}
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-slate-300 text-base sm:text-xl font-light leading-relaxed mb-8">
          {activeUnlocked
            ? `"${birthdayData.heroTagline}"`
            : `"Counting down the hours until 12:00 AM Midnight when your official birthday celebration & surprises unlock! 🎂"`}
        </p>

        {/* Live Countdown Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`w-full max-w-xl glass-card-rose p-6 rounded-3xl border shadow-2xl mb-10 ${
            activeUnlocked ? 'border-rose-500/40 glow-pink' : 'border-amber-500/30'
          }`}
        >
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4">
            {activeUnlocked ? (
              <>
                <Unlock className="w-4 h-4 text-rose-400" />
                <span className="text-rose-300">Official Birthday Unlocked!</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 text-amber-400 animate-pulse" />
                <span className="text-amber-300">12:00 AM Midnight Countdown</span>
              </>
            )}
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
            <div className="p-3 sm:p-4 rounded-2xl bg-rose-950/50 border border-rose-500/20">
              <span className="block text-2xl sm:text-4xl font-bold font-serif-romantic text-white">{timeLeft.days}</span>
              <span className="text-[10px] sm:text-xs text-rose-300/80 font-medium">Days</span>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl bg-rose-950/50 border border-rose-500/20">
              <span className="block text-2xl sm:text-4xl font-bold font-serif-romantic text-white">{timeLeft.hours}</span>
              <span className="text-[10px] sm:text-xs text-rose-300/80 font-medium">Hours</span>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl bg-rose-950/50 border border-rose-500/20">
              <span className="block text-2xl sm:text-4xl font-bold font-serif-romantic text-white">{timeLeft.minutes}</span>
              <span className="text-[10px] sm:text-xs text-rose-300/80 font-medium">Mins</span>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl bg-rose-950/50 border border-rose-500/20">
              <span className="block text-2xl sm:text-4xl font-bold font-serif-romantic text-white">{timeLeft.seconds}</span>
              <span className="text-[10px] sm:text-xs text-rose-300/80 font-medium">Secs</span>
            </div>
          </div>
        </motion.div>

        {/* Scroll CTA */}
        <motion.button
          whileHover={{ y: 5 }}
          onClick={scrollToSection}
          className="flex flex-col items-center gap-2 text-rose-300/80 hover:text-rose-200 text-sm font-medium transition-colors cursor-pointer group"
        >
          <span>{activeUnlocked ? 'Explore Memories & Surprises' : 'Check Lock Status'}</span>
          <div className="w-9 h-9 rounded-full bg-rose-500/20 flex items-center justify-center border border-rose-500/30 group-hover:bg-rose-500/40 transition-colors">
            <ArrowDown className="w-4 h-4 animate-bounce text-rose-300" />
          </div>
        </motion.button>
      </motion.div>
    </section>
  );
}
