import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, MapPin, X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export default function Gallery() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  const openLightbox = (index) => setSelectedPhotoIndex(index);
  const closeLightbox = () => setSelectedPhotoIndex(null);

  const prevPhoto = (e) => {
    e.stopPropagation();
    setSelectedPhotoIndex((prev) => (prev === 0 ? birthdayData.photos.length - 1 : prev - 1));
  };

  const nextPhoto = (e) => {
    e.stopPropagation();
    setSelectedPhotoIndex((prev) => (prev === birthdayData.photos.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="gallery" className="relative py-24 px-4 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-3 border border-rose-500/20"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>Our Photo Album</span>
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-5xl font-serif-romantic font-bold text-white mb-4"
        >
          {birthdayData.galleryHeader}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-slate-300 font-light text-sm sm:text-base"
        >
          {birthdayData.gallerySubtitle}
        </motion.p>
      </div>

      {/* Polaroid Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {birthdayData.photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            whileHover={{ scale: 1.04, rotate: 0, zIndex: 10 }}
            onClick={() => openLightbox(index)}
            className={`cursor-pointer ${photo.rotate} transition-transform duration-300`}
          >
            <div className="bg-slate-100 p-4 pb-6 rounded-2xl shadow-2xl hover:shadow-rose-500/20 transition-all border border-white/40 group relative">
              {/* Pushpin decor */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-rose-500 border-2 border-white shadow-md z-10 flex items-center justify-center">
                <Heart className="w-3 h-3 text-white fill-white" />
              </div>

              {/* Photo Frame */}
              <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden mb-4 bg-slate-900 shadow-inner">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className={`w-full h-full object-cover ${photo.imageAlign || 'img-align-top'} group-hover:scale-105 transition-transform duration-500`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 px-4 py-2 rounded-full bg-rose-600/80 text-white text-xs font-semibold backdrop-blur-sm transition-opacity">
                    View Photo
                  </span>
                </div>
              </div>

              {/* Caption */}
              <div className="text-center px-2">
                <p className="font-script text-xl text-slate-800 font-bold leading-snug">
                  {photo.caption}
                </p>
                {photo.location && (
                  <div className="flex items-center justify-center gap-1 text-[11px] text-rose-600 font-medium mt-1">
                    <MapPin className="w-3 h-3" />
                    <span>{photo.location}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={prevPhoto}
              className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextPhoto}
              className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-rose-500/30 shadow-2xl"
            >
              <div className="relative max-h-[75vh] w-full bg-black/60 flex items-center justify-center p-3">
                <img
                  src={birthdayData.photos[selectedPhotoIndex].url}
                  alt={birthdayData.photos[selectedPhotoIndex].caption}
                  className="max-h-[72vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
                />
              </div>
              <div className="p-6 bg-slate-900 text-center">
                <p className="font-serif-romantic text-2xl text-white font-bold mb-2">
                  {birthdayData.photos[selectedPhotoIndex].caption}
                </p>
                {birthdayData.photos[selectedPhotoIndex].location && (
                  <div className="flex items-center justify-center gap-1.5 text-xs text-rose-400 font-medium">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{birthdayData.photos[selectedPhotoIndex].location}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
