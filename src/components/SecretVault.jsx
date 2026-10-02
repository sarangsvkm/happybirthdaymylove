import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Lock, Unlock, KeyRound, Heart, Eye, EyeOff } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export default function SecretVault() {
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const handleUnlock = (e) => {
    e.preventDefault();
    const cleanPin = pin.trim();
    // Allow matching September 26 (26092026 / 2609) or October 26 (26102026 / 2610)
    if (
      cleanPin === birthdayData.secretVault.defaultPin ||
      cleanPin === '2609' ||
      cleanPin === '26092026' ||
      cleanPin === '2610' ||
      cleanPin === '26102026'
    ) {
      setIsUnlocked(true);
      setError(false);
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 }
      });
    } else {
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <section className="relative py-16 px-4 max-w-3xl mx-auto">
      <div className="glass-card-rose p-8 sm:p-12 rounded-3xl border border-rose-500/30 text-center relative overflow-hidden shadow-2xl">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-rose-300">
          {isUnlocked ? <Unlock className="w-8 h-8 text-rose-400 animate-bounce" /> : <Lock className="w-8 h-8 text-rose-400" />}
        </div>

        <h3 className="text-2xl sm:text-3xl font-serif-romantic font-bold text-white mb-2">
          {birthdayData.secretVault.title}
        </h3>

        {!isUnlocked ? (
          <div>
            <p className="text-xs sm:text-sm text-slate-300 font-light mb-6">
              {birthdayData.secretVault.subtitle}
            </p>

            <form onSubmit={handleUnlock} className="max-w-xs mx-auto flex flex-col items-center gap-4">
              <div className="relative w-full">
                <input
                  type={showPin ? "text" : "password"}
                  maxLength={10}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter Passcode..."
                  className={`w-full py-3 pl-4 pr-10 rounded-full bg-slate-950/80 border ${
                    error ? 'border-red-500 animate-shake' : 'border-rose-500/30 focus:border-rose-400'
                  } text-center font-mono text-lg text-white tracking-widest outline-none transition-all placeholder:text-slate-600`}
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-rose-400/70 hover:text-rose-300 p-1 cursor-pointer"
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {error && (
                <p className="text-xs text-red-400 font-medium animate-pulse">
                  Incorrect Passcode! Try entering the special date we first met ❤️
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-500/30 hover:scale-105 transition-transform cursor-pointer"
              >
                <KeyRound className="w-4 h-4" />
                <span>Unlock Secret</span>
              </button>
            </form>

            <p className="text-[11px] text-rose-300/60 mt-4 italic">
              {birthdayData.secretVault.hint}
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="pt-4 space-y-6"
          >
            <div className="p-5 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-rose-200 text-sm sm:text-base leading-relaxed font-light">
              <Heart className="w-8 h-8 text-rose-400 fill-rose-400 mx-auto mb-3" />
              <p>{birthdayData.secretVault.secretMessage}</p>
            </div>

            {birthdayData.secretVault.secretPhoto && (
              <div className="relative aspect-[4/5] max-w-sm sm:max-w-md mx-auto w-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-slate-900">
                <img
                  src={birthdayData.secretVault.secretPhoto}
                  alt="Secret Memory"
                  className="w-full h-full object-cover img-align-selfie"
                />
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
