import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Sparkles, Scroll } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="letter" className="relative py-24 px-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-3 border border-rose-500/20"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>From My Heart</span>
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-5xl font-serif-romantic font-bold text-white mb-4"
        >
          {birthdayData.letterHeader}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-slate-300 font-light text-sm sm:text-base"
        >
          {birthdayData.letterSubtitle}
        </motion.p>
      </div>

      {/* Envelope & Letter Container */}
      <div className="flex flex-col items-center">
        {!isOpen ? (
          /* Sealed Envelope Card */
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setIsOpen(true)}
            className="w-full max-w-md glass-card-rose p-8 sm:p-12 rounded-3xl border border-rose-500/40 shadow-2xl text-center cursor-pointer group relative overflow-hidden glow-pink"
          >
            {/* Stamp Decor */}
            <div className="absolute top-4 right-4 w-12 h-14 bg-rose-950/60 border border-rose-400/40 rounded-md p-1 flex flex-col items-center justify-center text-rose-300">
              <Heart className="w-4 h-4 fill-rose-400 text-rose-400" />
              <span className="text-[9px] font-mono mt-1">LOVE</span>
            </div>

            {/* Wax Seal Button */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-600/50 border-2 border-white/20"
            >
              <Heart className="w-9 h-9 text-white fill-white" />
            </motion.div>

            <h3 className="text-2xl font-serif-romantic font-bold text-white mb-2">
              {birthdayData.letterEnvelopeTitle}
            </h3>
            <p className="text-xs text-rose-300/80 mb-6">
              Sealed with affection • Tap to open 💌
            </p>

            <button className="px-6 py-2.5 rounded-full bg-rose-500/20 hover:bg-rose-500/40 text-rose-200 text-sm font-semibold border border-rose-400/30 transition-colors inline-flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Unseal Letter</span>
            </button>
          </motion.div>
        ) : (
          /* Opened Parchment Letter */
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full bg-[#160c1d] p-8 sm:p-12 rounded-3xl border border-rose-500/30 shadow-2xl relative text-left glow-purple"
          >
            {/* Top Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 px-3 py-1 rounded-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-medium border border-rose-500/30 transition-colors cursor-pointer"
            >
              Fold Letter
            </button>

            {/* Letter Body */}
            <div className="space-y-4 text-slate-200 text-base sm:text-lg font-light leading-relaxed font-sans-clean">
              {birthdayData.letterContent.map((paragraph, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.15 }}
                  className={
                    idx === 0
                      ? "font-serif-romantic text-2xl text-rose-300 font-bold mb-4"
                      : idx >= birthdayData.letterContent.length - 2
                      ? "font-script text-2xl text-rose-400 font-bold pt-2"
                      : "text-slate-200/90"
                  }
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-rose-500/20 flex items-center justify-between text-xs text-rose-300/60">
              <div className="flex items-center gap-1.5">
                <Scroll className="w-4 h-4 text-rose-400" />
                <span>Personal Birthday Letter</span>
              </div>
              <span>Forever & Always</span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
