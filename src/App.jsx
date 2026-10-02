import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Sparkles, KeyRound } from 'lucide-react';
import confetti from 'canvas-confetti';
import FloatingHearts from './components/FloatingHearts';
import Navbar from './components/Navbar';
import WelcomeScreen from './components/WelcomeScreen';
import BirthdayHero from './components/BirthdayHero';
import Memories from './components/Memories';
import Gallery from './components/Gallery';
import LoveLetter from './components/LoveLetter';
import Surprise from './components/Surprise';
import SecretVault from './components/SecretVault';
import MusicPlayer from './components/MusicPlayer';
import FinalMessage from './components/FinalMessage';
import { birthdayData } from './data/birthdayData';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [forceUnlockPreview, setForceUnlockPreview] = useState(false);

  const audioRef = useRef(null);

  // Check midnight unlock status every second
  useEffect(() => {
    const targetTime = new Date(birthdayData.birthdayDate).getTime();
    
    const checkUnlock = () => {
      const now = new Date().getTime();
      if (now >= targetTime) {
        if (!isUnlocked) {
          setIsUnlocked(true);
          // Trigger automatic Midnight celebration confetti!
          confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.4 },
            colors: ['#f43f5e', '#ec4899', '#fbbf24', '#ffffff']
          });
        }
      } else {
        setIsUnlocked(false);
      }
    };

    checkUnlock();
    const interval = setInterval(checkUnlock, 1000);
    return () => clearInterval(interval);
  }, [isUnlocked]);

  useEffect(() => {
    // Create HTML5 Audio Object
    audioRef.current = new Audio(birthdayData.bgMusicUrl);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleEnter = () => {
    setHasEntered(true);
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log('Autoplay restriction prevented audio:', err));
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleReplay = () => {
    setHasEntered(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeUnlocked = isUnlocked || forceUnlockPreview;

  const togglePreview = () => {
    const nextState = !forceUnlockPreview;
    setForceUnlockPreview(nextState);
    if (nextState) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#f43f5e', '#ec4899', '#fbbf24']
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0512] text-slate-100 relative selection:bg-rose-500 selection:text-white">
      {/* Ambient Floating Particle Background */}
      <FloatingHearts />

      {/* Intro Gateway Modal */}
      <AnimatePresence>
        {!hasEntered && <WelcomeScreen onEnter={handleEnter} />}
      </AnimatePresence>

      {/* Main Website Content */}
      {hasEntered && (
        <>
          <Navbar isUnlocked={activeUnlocked} />

          <main className="relative z-10 space-y-12">
            {/* Hero Section with Live Countdown */}
            <BirthdayHero
              activeUnlocked={activeUnlocked}
              togglePreview={togglePreview}
              forceUnlockPreview={forceUnlockPreview}
            />

            {/* If NOT Unlocked (Before 12:00 AM Midnight): Show Locked Banner */}
            {!activeUnlocked ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl mx-auto my-16 p-8 sm:p-12 glass-card-rose rounded-3xl border border-amber-500/30 text-center glow-pink relative overflow-hidden"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
                  <Lock className="w-10 h-10 animate-pulse" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif-romantic font-bold text-white mb-3">
                  Surprises Locked Until 12:00 AM Midnight 🔒
                </h3>

                <p className="text-slate-300 text-sm sm:text-base font-light mb-8 leading-relaxed max-w-lg mx-auto">
                  Our relationship memories, photo gallery, love letter, interactive gift vouchers, and secret vault will automatically open sharp at <strong>12:00 AM Midnight on October 3</strong>!
                </p>

                <div className="flex flex-col items-center gap-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 text-amber-300 text-xs sm:text-sm font-semibold border border-amber-500/30">
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Countdown in Progress... Stay Tuned!</span>
                  </div>

                  {/* Preview Button for Testing */}
                  <button
                    onClick={togglePreview}
                    className="mt-2 px-5 py-2.5 rounded-full bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-xs font-semibold border border-rose-400/30 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <KeyRound className="w-4 h-4 text-rose-400" />
                    <span>Test & Unlock Everything Now (Preview Mode)</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              /* When Unlocked (At 12:00 AM Midnight or Preview Mode): Show All Sections */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="space-y-12"
              >
                <Memories />
                <Gallery />
                <LoveLetter />
                <Surprise />
                <SecretVault />
                <FinalMessage onReplay={handleReplay} />
              </motion.div>
            )}
          </main>

          {/* Sticky Audio Controller */}
          <MusicPlayer
            isPlaying={isPlaying}
            isMuted={isMuted}
            togglePlay={togglePlay}
            toggleMute={toggleMute}
          />
        </>
      )}
    </div>
  );
}
