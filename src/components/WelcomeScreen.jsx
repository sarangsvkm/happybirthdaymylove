import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export default function WelcomeScreen({ onEnter }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0b0512] px-6 text-center overflow-hidden"
    >
      {/* Background Radial Glow */}
      <div className="absolute w-96 h-96 bg-rose-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute w-80 h-80 bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 max-w-md w-full glass-card-rose p-8 md:p-12 rounded-3xl shadow-2xl border border-rose-500/30 text-center"
      >
        {/* Animated Heart Icon */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-500/40"
        >
          <Heart className="w-10 h-10 text-white fill-white" />
        </motion.div>

        <h1 className="text-3xl md:text-4xl font-serif-romantic font-bold text-white mb-3 tracking-wide glow-text-pink">
          {birthdayData.welcomeTitle}
        </h1>

        <p className="text-rose-200/90 text-sm md:text-base font-light mb-8 leading-relaxed">
          {birthdayData.welcomeSubtitle}
        </p>

        {/* Enter Button */}
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(244,63,94,0.6)" }}
          whileTap={{ scale: 0.95 }}
          onClick={onEnter}
          className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-semibold text-base md:text-lg flex items-center justify-center gap-2 shadow-xl shadow-rose-500/30 transition-all group cursor-pointer"
        >
          <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span>{birthdayData.welcomeButtonText}</span>
          <Sparkles className="w-5 h-5 group-hover:-rotate-12 transition-transform" />
        </motion.button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 text-xs text-rose-300/60 font-light"
      >
        💡 Turn on sound for the best experience 🎵
      </motion.p>
    </motion.div>
  );
}
