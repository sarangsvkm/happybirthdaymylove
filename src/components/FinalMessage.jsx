import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, RefreshCw } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export default function FinalMessage({ onReplay }) {
  const triggerFireworks = () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#f43f5e', '#ec4899', '#fbbf24']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#f43f5e', '#ec4899', '#fbbf24']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <section className="relative py-28 px-4 text-center overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-rose-950/40 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-500/20 rounded-full blur-[140px] pointer-events-none animate-pulse" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl mx-auto flex flex-col items-center"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-20 h-20 mb-8 rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-rose-600 flex items-center justify-center shadow-xl shadow-rose-500/50"
        >
          <Heart className="w-10 h-10 text-white fill-white" />
        </motion.div>

        <h2 className="text-3xl sm:text-5xl font-serif-romantic font-bold text-white mb-6 leading-tight">
          {birthdayData.finalMessageHeader}
        </h2>

        <p className="text-lg sm:text-2xl font-script text-rose-300 mb-10 max-w-2xl leading-relaxed">
          "{birthdayData.finalMessageSub}"
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={triggerFireworks}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-semibold text-base sm:text-lg flex items-center gap-2 shadow-xl shadow-rose-500/40 cursor-pointer"
          >
            <Sparkles className="w-5 h-5" />
            <span>Celebrate & Fireworks 🎉</span>
          </motion.button>

          <button
            onClick={onReplay}
            className="px-6 py-4 rounded-full bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 font-semibold text-sm sm:text-base border border-rose-400/30 flex items-center gap-2 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Replay Intro</span>
          </button>
        </div>

        {/* Footer Credit */}
        <p className="text-xs text-rose-300/50 font-light">
          {birthdayData.footerText} • Made with ❤️ for {birthdayData.recipientName}
        </p>
      </motion.div>
    </section>
  );
}
