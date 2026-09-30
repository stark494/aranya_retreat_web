import React, { useState } from 'react';
import { Clock, Utensils, Sparkles, MapPin, Wine, Calendar } from 'lucide-react';
import { DINING_VENUES, DiningVenue } from '../data/retreatData';
import { DiningModal } from './DiningModal';

export const Dining: React.FC = () => {
  const [activeVenue, setActiveVenue] = useState<DiningVenue>(DINING_VENUES[0]);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="dine" className="py-24 lg:py-32 bg-[#091713] text-[#F7F4EE] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium block mb-2">
            Gastronomy of the Royal Realm
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#FDFBF7] tracking-tight mb-4">
            Dine by Starlight & Water
          </h2>
          <p className="text-sm sm:text-base text-[#F7F4EE]/75 font-light leading-relaxed">
            From heirloom Mewari royal recipes slow-cooked over wood embers to sunset botanical mixology overlooking Lake Badi, dining at Aranya is an immersive celebration of taste, craft, and setting.
          </p>
        </div>

        {/* Venue Selector Segmented Control (Zero-Pill Discipline) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10 p-1.5 bg-[#0E231C] border border-[#C5A880]/20 rounded-md">
          {DINING_VENUES.map((venue) => {
            const isActive = activeVenue.id === venue.id;
            return (
              <button
                key={venue.id}
                onClick={() => setActiveVenue(venue)}
                className={`py-3 px-5 text-left rounded-sm transition-all flex flex-col justify-center ${
                  isActive
                    ? 'bg-[#153329] border-l-2 border-[#C5A880] text-white shadow-sm'
                    : 'text-[#F7F4EE]/60 hover:text-white hover:bg-[#122820]'
                }`}
              >
                <span className="font-serif text-lg font-medium text-[#FDFBF7]">
                  {venue.name}
                </span>
                <span className="text-[11px] text-[#C5A880] tracking-wide truncate">
                  {venue.cuisine}
                </span>
              </button>
            );
          })}
        </div>

        {/* Featured Venue Editorial Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-[#0E231C]/80 border border-[#C5A880]/20 rounded-sm overflow-hidden p-6 lg:p-10 shadow-xl items-center">
          {/* Visual Showcase (16:10 ratio) */}
          <div className="lg:col-span-7 relative aspect-[16/10] rounded-sm overflow-hidden bg-[#091713]">
            <img
              src={activeVenue.image}
              alt={activeVenue.name}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90">
              <span className="flex items-center gap-1.5 bg-black/50 px-2.5 py-1 rounded backdrop-blur-sm border border-white/10">
                <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{activeVenue.setting}</span>
              </span>
              <span className="flex items-center gap-1.5 bg-black/50 px-2.5 py-1 rounded backdrop-blur-sm border border-white/10">
                <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{activeVenue.timings}</span>
              </span>
            </div>
          </div>

          {/* Editorial Detail Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold block mb-1">
                {activeVenue.cuisine}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#FDFBF7] font-light mb-2">
                {activeVenue.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#E4D6C1] italic mb-4 font-light">
                {activeVenue.subtitle}
              </p>
              <p className="text-sm text-[#F7F4EE]/80 font-light leading-relaxed mb-6">
                {activeVenue.description}
              </p>

              {/* Highlights */}
              <div className="space-y-2 mb-6">
                <span className="text-[11px] uppercase tracking-wider text-[#C5A880] font-medium block">
                  Culinary Philosophy
                </span>
                {activeVenue.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#F7F4EE]/85">
                    <span className="text-[#C5A880] font-serif">·</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Signature Dish Callout */}
              <div className="p-3.5 rounded bg-[#142F26] border border-[#C5A880]/25 text-xs">
                <span className="text-[10px] uppercase tracking-wider text-[#C5A880] font-semibold flex items-center gap-1 mb-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Chef's Signature Recommendation</span>
                </span>
                <p className="text-white/90 italic font-light">"{activeVenue.signatureDish}"</p>
              </div>
            </div>

            {/* Action */}
            <div className="pt-4 border-t border-[#C5A880]/20 flex items-center justify-between">
              <span className="text-xs text-[#F7F4EE]/60">
                In-residence & Non-resident guests welcome
              </span>
              <button
                onClick={() => setModalOpen(true)}
                className="px-6 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#0E231C] bg-[#C5A880] hover:bg-[#D4B886] rounded-sm transition-all flex items-center gap-2 shadow"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Reserve Table</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reservation Drawer/Modal */}
      {modalOpen && (
        <DiningModal
          venue={activeVenue}
          onClose={() => setModalOpen(false)}
        />
      )}
    </section>
  );
};
