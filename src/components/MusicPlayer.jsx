import React from 'react';
import { Volume2, VolumeX, Play, Pause, Music } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export default function MusicPlayer({ isPlaying, isMuted, togglePlay, toggleMute }) {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
      <div className="glass-pill px-4 py-2 rounded-full flex items-center gap-3 shadow-2xl border border-rose-500/40 glow-pink backdrop-blur-md">
        {/* Equalizer Bars */}
        <div className="flex items-end gap-1 h-4 w-4">
          <span className={`w-1 bg-rose-400 rounded-full transition-all duration-300 ${isPlaying && !isMuted ? 'h-4 animate-bounce' : 'h-1.5'}`} style={{ animationDelay: '0ms' }} />
          <span className={`w-1 bg-rose-400 rounded-full transition-all duration-300 ${isPlaying && !isMuted ? 'h-3 animate-bounce' : 'h-2'}`} style={{ animationDelay: '150ms' }} />
          <span className={`w-1 bg-rose-400 rounded-full transition-all duration-300 ${isPlaying && !isMuted ? 'h-4 animate-bounce' : 'h-1'}`} style={{ animationDelay: '300ms' }} />
        </div>

        <div className="hidden sm:flex flex-col text-left pr-1">
          <span className="text-[10px] text-rose-300 font-medium tracking-wider uppercase">Background Music</span>
          <span className="text-xs text-white font-semibold truncate max-w-[130px]">
            {birthdayData.musicTitle}
          </span>
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          aria-label="Toggle Playback"
          className="w-8 h-8 rounded-full bg-rose-500/20 hover:bg-rose-500/40 text-rose-200 flex items-center justify-center transition-colors cursor-pointer"
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-rose-200" /> : <Play className="w-4 h-4 fill-rose-200 ml-0.5" />}
        </button>

        {/* Mute Button */}
        <button
          onClick={toggleMute}
          aria-label="Toggle Mute"
          className="w-8 h-8 rounded-full bg-rose-500/20 hover:bg-rose-500/40 text-rose-200 flex items-center justify-center transition-colors cursor-pointer"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-rose-300" />}
        </button>
      </div>
    </div>
  );
}
