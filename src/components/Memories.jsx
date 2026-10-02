import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Quote, Sparkles, Heart, X, Maximize2 } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export default function Memories() {
  const [activeModalPhoto, setActiveModalPhoto] = useState(null);
  return (
    <section id="memories" className="relative py-24 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-3 border border-rose-500/20"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Timeline of Us</span>
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-5xl font-serif-romantic font-bold text-white mb-4"
        >
          {birthdayData.memoriesHeader}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-slate-300 font-light text-sm sm:text-base"
        >
          {birthdayData.memoriesSubtitle}
        </motion.p>
      </div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Central Glowing Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-rose-500/20 via-pink-500/50 to-rose-500/20 -translate-x-1/2 rounded-full hidden md:block" />
        <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-rose-500/20 via-pink-500/50 to-rose-500/20 rounded-full md:hidden" />

        <div className="space-y-12 md:space-y-16">
          {birthdayData.memories.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-rose-500 border-4 border-[#0b0512] shadow-lg shadow-rose-500/50 z-20" />

                {/* Content Box */}
                <div className="w-full md:w-1/2 pl-14 md:pl-0 md:px-8">
                  <div className="glass-card-rose p-6 sm:p-8 rounded-3xl border border-rose-500/20 shadow-xl hover:border-rose-500/40 transition-all group">
                    {/* Tag & Date */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold">
                        {item.tag}
                      </span>
                      <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
                        <Calendar className="w-3.5 h-3.5 text-rose-400" />
                        <span>{item.date}</span>
                      </div>
                    </div>

                    {/* Render Chat UI OR Image Preview */}
                    {item.chatType === 'linkedin' ? (
                      /* LinkedIn Chat UI Box Only (No Image) */
                      <div className="w-full rounded-2xl overflow-hidden mb-5 border border-blue-500/30 bg-[#0d1527] shadow-xl">
                        {/* LinkedIn Header */}
                        <div className="bg-[#004182] px-4 py-3 flex items-center justify-between text-white border-b border-blue-400/20">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-white text-[#004182] font-black text-sm flex items-center justify-center shadow-md">
                              in
                            </div>
                            <div className="text-left">
                              <span className="block text-xs font-bold leading-tight">LinkedIn Messaging</span>
                              <span className="text-[10px] text-blue-200 font-medium">Kukku & Chakkara • Connected</span>
                            </div>
                          </div>
                          <span className="text-[10px] bg-blue-700/80 font-mono px-2 py-0.5 rounded text-blue-100 border border-blue-400/30">
                            1st Message 💼
                          </span>
                        </div>
                        {/* Chat Messages */}
                        <div className="p-4 space-y-3.5 text-xs font-sans">
                          {item.chats.map((chat, cIdx) => (
                            <div
                              key={cIdx}
                              className={`flex flex-col ${
                                chat.sender === 'Kukku' ? 'items-end' : 'items-start'
                              }`}
                            >
                              <div className="flex items-center gap-1 mb-1 px-1">
                                <span className="text-[10px] text-slate-400 font-semibold">{chat.sender}</span>
                              </div>
                              <div
                                className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                                  chat.sender === 'Kukku'
                                    ? 'bg-[#0066c2] text-white rounded-br-none shadow-md'
                                    : 'bg-slate-800 text-slate-100 rounded-bl-none border border-slate-700'
                                }`}
                              >
                                {chat.text}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : item.chatType === 'instagram' ? (
                      /* Instagram DM Chat UI Box Only (No Image) */
                      <div className="w-full rounded-2xl overflow-hidden mb-5 border border-pink-500/30 bg-[#140a21] shadow-xl">
                        {/* Instagram Header */}
                        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 px-4 py-3 flex items-center justify-between text-white">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold border border-white/40 shadow-sm">
                              📷
                            </div>
                            <div className="text-left">
                              <span className="block text-xs font-bold leading-tight">chakkara_x_kukku</span>
                              <span className="text-[10px] text-pink-100 font-medium">Instagram Direct Message</span>
                            </div>
                          </div>
                          <Heart className="w-4 h-4 fill-white text-white animate-pulse" />
                        </div>
                        {/* Chat Messages */}
                        <div className="p-4 space-y-3.5 text-xs font-sans">
                          {item.chats.map((chat, cIdx) => (
                            <div
                              key={cIdx}
                              className={`flex flex-col ${
                                chat.sender === 'Kukku' ? 'items-end' : 'items-start'
                              }`}
                            >
                              <span className="text-[10px] text-pink-300/80 mb-1 px-1 font-semibold">{chat.sender}</span>
                              <div
                                className={`max-w-[85%] px-4 py-2.5 rounded-2xl relative text-xs leading-relaxed ${
                                  chat.sender === 'Kukku'
                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-br-none shadow-md'
                                    : 'bg-slate-800/90 text-slate-100 rounded-bl-none border border-pink-500/20'
                                }`}
                              >
                                {chat.text}
                                {cIdx === 1 && (
                                  <span className="absolute -bottom-1.5 -right-1 text-[11px]">❤️</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      /* Photo Preview (Used for First Meeting, Relationship & Birthday) */
                      <div
                        onClick={() => setActiveModalPhoto(item)}
                        className="relative aspect-[16/11] sm:aspect-[4/3] w-full rounded-2xl overflow-hidden mb-5 border border-white/10 shadow-lg bg-slate-900 cursor-pointer group/img"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className={`w-full h-full object-cover ${item.imageAlign || 'img-align-top'} group-hover/img:scale-105 transition-transform duration-500`}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0512]/40 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-[11px] text-white/90 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center gap-1 border border-white/10">
                          <Maximize2 className="w-3 h-3 text-rose-300" />
                          <span>View Full Photo</span>
                        </div>
                      </div>
                    )}

                    {/* Title & Description */}
                    <h3 className="text-xl sm:text-2xl font-serif-romantic font-bold text-white mb-2 group-hover:text-rose-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4 font-light">
                      {item.description}
                    </p>

                    {/* Personal Quote */}
                    <div className="pt-3 border-t border-rose-500/20 flex items-start gap-2 text-xs text-rose-200/90 italic">
                      <Quote className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span>"{item.quote}"</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Full Photo Modal */}
      <AnimatePresence>
        {activeModalPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModalPhoto(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center"
          >
            <button
              onClick={() => setActiveModalPhoto(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-rose-500/30 shadow-2xl"
            >
              <div className="relative max-h-[75vh] w-full bg-black/60 flex items-center justify-center p-3">
                <img
                  src={activeModalPhoto.image}
                  alt={activeModalPhoto.title}
                  className="max-h-[72vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
                />
              </div>
              <div className="p-5 bg-slate-900 text-center">
                <h4 className="font-serif-romantic text-xl text-white font-bold mb-1">
                  {activeModalPhoto.title}
                </h4>
                <p className="text-xs text-rose-300 italic">
                  "{activeModalPhoto.quote}"
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
