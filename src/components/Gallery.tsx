import React, { useState } from 'react';
import { X, Maximize2, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { GALLERY_ITEMS, GalleryItem } from '../data/retreatData';

export const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const categories = [
    { id: 'all', label: 'All Perspectives' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'rooms', label: 'Rooms & Villas' },
    { id: 'food', label: 'Dining' },
    { id: 'weddings', label: 'Weddings' },
    { id: 'landscape', label: 'Landscape' },
    { id: 'experiences', label: 'Experiences' },
  ];

  const filteredItems = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const handleOpenLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredItems.length);
    }
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-[#0E231C] text-[#F7F4EE] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header with Framer Motion Stagger */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ staggerChildren: shouldReduceMotion ? 0 : 0.15 }}
          >
            <motion.span
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0.2 : 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium block mb-2"
            >
              Visual Chronicle
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0.2 : 0.85, delay: shouldReduceMotion ? 0 : 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#FDFBF7] tracking-tight"
            >
              Cinematic Gallery
            </motion.h2>
          </motion.div>

          {/* Category Tabs (Adhering to Zero-Pill Discipline with clean segmented tabs) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#091713]/80 border border-[#C5A880]/20 rounded-md">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium tracking-wider rounded-sm transition-all whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-[#C5A880] text-[#0E231C] font-semibold shadow-sm'
                    : 'text-[#F7F4EE]/70 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cinematic Masonry / Asymmetric Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item, idx) => {
            // Asymmetric heights for dynamic editorial masonry presence
            const isSpan = idx === 0 || idx === 7;
            return (
              <div
                key={item.id}
                onClick={() => handleOpenLightbox(idx)}
                className={`group relative overflow-hidden rounded-sm bg-[#091713] cursor-pointer border border-[#C5A880]/15 hover:border-[#C5A880]/50 transition-all duration-300 shadow-md ${
                  isSpan ? 'sm:col-span-2 aspect-[21/9]' : 'aspect-[4/3]'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle Hover Scrim & Reveal */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

                <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between">
                  <div className="flex justify-end">
                    <span className="p-2 rounded-full bg-black/40 text-white/80 group-hover:text-white group-hover:bg-[#C5A880] group-hover:text-[#0E231C] transition-colors">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <div className="transform transition-transform duration-300 group-hover:-translate-y-1">
                    <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold block mb-1">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl text-[#FDFBF7] font-normal leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#F7F4EE]/70 font-light mt-1 opacity-0 group-hover:opacity-100 transition-opacity line-clamp-1">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && filteredItems[selectedPhotoIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8 animate-fade-in"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          {/* Top Bar */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20 text-white">
            <span className="text-xs tracking-widest uppercase text-[#C5A880]">
              {selectedPhotoIndex + 1} / {filteredItems.length} · {filteredItems[selectedPhotoIndex].category}
            </span>
            <button
              onClick={() => setSelectedPhotoIndex(null)}
              className="p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Controls */}
          <button
            onClick={handlePrevPhoto}
            className="absolute left-4 sm:left-8 z-20 p-3 text-white/80 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNextPhoto}
            className="absolute right-4 sm:right-8 z-20 p-3 text-white/80 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Center Image */}
          <div
            className="max-w-5xl max-h-[75vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredItems[selectedPhotoIndex].image}
              alt={filteredItems[selectedPhotoIndex].title}
              className="max-h-[68vh] w-auto max-w-full object-contain rounded-xs shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="mt-4 text-center max-w-2xl">
              <h4 className="font-serif text-xl sm:text-2xl text-[#FDFBF7]">
                {filteredItems[selectedPhotoIndex].title}
              </h4>
              <p className="text-xs sm:text-sm text-[#F7F4EE]/70 mt-1 font-light">
                {filteredItems[selectedPhotoIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
