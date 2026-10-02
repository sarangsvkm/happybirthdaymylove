import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift, Sparkles, Utensils, HeartHandshake, ShoppingBag, Car, X, Check, Copy } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

const iconMap = {
  Utensils: Utensils,
  HeartHandshake: HeartHandshake,
  ShoppingBag: ShoppingBag,
  Car: Car
};

export default function Surprise() {
  const [activeGift, setActiveGift] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const openGift = (gift) => {
    setActiveGift(gift);
    setCopiedCode(false);

    // Trigger Heart & Gold Confetti Burst!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#ec4899', '#fbbf24', '#ffffff']
    });
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <section id="surprises" className="relative py-24 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-3 border border-rose-500/20"
        >
          <Gift className="w-3.5 h-3.5" />
          <span>Interactive Gifts</span>
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-5xl font-serif-romantic font-bold text-white mb-4"
        >
          {birthdayData.surprisesHeader}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-slate-300 font-light text-sm sm:text-base"
        >
          {birthdayData.surprisesSubtitle}
        </motion.p>
      </div>

      {/* Gift Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {birthdayData.gifts.map((gift, idx) => {
          const IconComponent = iconMap[gift.icon] || Gift;
          return (
            <motion.div
              key={gift.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              onClick={() => openGift(gift)}
              className="glass-card-rose p-6 rounded-3xl border border-rose-500/30 text-center cursor-pointer group hover:border-rose-400 shadow-xl glow-pink relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-3">
                <Sparkles className="w-4 h-4 text-rose-400/60 group-hover:rotate-45 transition-transform" />
              </div>

              {/* Gift Icon Box */}
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-500/40 group-hover:scale-110 transition-transform">
                <IconComponent className="w-8 h-8 text-white" />
              </div>

              <span className="text-[11px] text-rose-300 uppercase font-semibold tracking-wider block mb-1">
                Gift #{gift.id}
              </span>
              <h3 className="text-lg font-serif-romantic font-bold text-white mb-2">
                {gift.title}
              </h3>
              <p className="text-xs text-slate-300 font-light line-clamp-2 mb-4">
                {gift.description}
              </p>

              <button className="w-full py-2 rounded-full bg-rose-500/20 hover:bg-rose-500/40 text-rose-200 text-xs font-semibold border border-rose-400/30 transition-colors">
                Open Gift 🎁
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Gift Reveal Modal */}
      <AnimatePresence>
        {activeGift && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveGift(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md p-4 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-md w-full glass-card-rose p-8 rounded-3xl border border-rose-500/50 shadow-2xl text-center relative"
            >
              <button
                onClick={() => setActiveGift(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center shadow-xl shadow-rose-500/50">
                <Gift className="w-10 h-10 text-white" />
              </div>

              <span className="text-xs text-rose-300 font-bold uppercase tracking-widest block mb-1">
                🎉 Birthday Gift Unlocked!
              </span>

              <h3 className="text-2xl font-serif-romantic font-bold text-white mb-3">
                {activeGift.title}
              </h3>

              <p className="text-slate-200 text-sm leading-relaxed mb-6 font-light">
                {activeGift.description}
              </p>

              {/* Coupon Code Pill */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-rose-500/30 flex items-center justify-between gap-2 mb-6">
                <div className="text-left">
                  <span className="text-[10px] text-rose-400 uppercase font-semibold block">Voucher Code</span>
                  <span className="text-sm font-mono text-white font-bold">{activeGift.code}</span>
                </div>
                <button
                  onClick={() => copyCode(activeGift.code)}
                  className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-semibold border border-rose-400/30 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              <p className="text-[11px] text-rose-300/70 italic">
                Show this voucher code to {birthdayData.senderName} whenever you'd like to redeem it! ❤️
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
