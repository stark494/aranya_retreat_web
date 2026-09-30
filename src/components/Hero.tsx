import React, { useState } from 'react';
import { Calendar, Users, BedDouble, ChevronDown, ArrowRight, Sparkles } from 'lucide-react';
import { RESORT_INFO } from '../data/retreatData';

interface HeroProps {
  onPlanStay: (initialBookingData?: { checkIn: string; checkOut: string; guests: number; roomCategory: string }) => void;
  onPlanWedding: () => void;
  onExploreResort: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onPlanStay, onPlanWedding, onExploreResort }) => {
  // Quick bar state
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const dayAfterTomorrow = new Date(Date.now() + 172800000).toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(tomorrow);
  const [checkOut, setCheckOut] = useState(dayAfterTomorrow);
  const [guests, setGuests] = useState(2);
  const [roomCategory, setRoomCategory] = useState('Grand Suites');
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onPlanStay({
      checkIn,
      checkOut,
      guests,
      roomCategory,
    });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 lg:pb-16 overflow-hidden">
      {/* Background Cinematic Treatment */}
      <div className="absolute inset-0 z-0">
        {/* Fallback stylized gradient while loading or on network loss */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#091713] via-[#0E231C] to-[#162D24]" />
        
        {/* Curated High-Resolution Cinematic Visual with graceful fade-in */}
        <img
          src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2400&q=85"
          alt="Aranya Grand Retreat tranquil lakeside architecture and sandstone pavilion at dusk"
          className={`w-full h-full object-cover object-center transition-opacity duration-1000 scale-105 motion-safe:animate-[kenburns_30s_infinite_alternate] ${
            imageLoaded ? 'opacity-55' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          referrerPolicy="no-referrer"
          fetchPriority="high"
        />

        {/* Cinematic Scrims ensuring WCAG AA Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E231C] via-[#0E231C]/65 to-[#091713]/85" />
        <div className="absolute inset-0 bg-radial-[circle_at_top_right] from-transparent via-[#0E231C]/40 to-[#0E231C]/90" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0E231C] to-transparent pointer-events-none" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full my-auto py-12">
        <div className="max-w-3xl">
          {/* Subtle location indicator */}
          <div className="inline-flex items-center gap-2 mb-6 text-xs tracking-[0.25em] uppercase text-[#C5A880] font-medium">
            <span>Udaipur, Rajasthan</span>
            <span className="text-[#C5A880]/40">·</span>
            <span>Near Lake Badi</span>
          </div>

          {/* Primary Editorial Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-[#FDFBF7] tracking-tight leading-[1.08] mb-6 drop-shadow-sm">
            Where celebrations <br />
            <span className="italic font-normal text-[#E4D6C1]">become stories.</span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-base sm:text-lg lg:text-xl text-[#F7F4EE]/85 font-light leading-relaxed max-w-2xl mb-10 text-pretty">
            A private retreat on the shores of Udaipur, created for slow mornings, unforgettable celebrations and beautifully considered escapes.
          </p>

          {/* Primary, Secondary, and Additional CTAs */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            <button
              onClick={() => onPlanStay()}
              className="px-7 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#0E231C] bg-[#C5A880] hover:bg-[#D4B886] rounded-sm transition-all duration-200 shadow-lg hover:shadow-[#C5A880]/20 active:scale-98 flex items-center gap-2"
            >
              <span>Plan Your Stay</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onPlanWedding}
              className="px-7 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#FDFBF7] border border-[#C5A880]/60 hover:bg-[#C5A880]/15 hover:border-[#C5A880] rounded-sm transition-all duration-200"
            >
              Plan Your Wedding
            </button>

            <button
              onClick={onExploreResort}
              className="px-4 py-3.5 text-xs sm:text-sm font-medium tracking-wider text-[#F7F4EE]/70 hover:text-[#C5A880] transition-colors flex items-center gap-1.5"
            >
              <span>Explore the Resort</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Availability Search Bar */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full mt-6">
        <form
          onSubmit={handleQuickSearch}
          className="bg-[#142F26]/90 backdrop-blur-md border border-[#C5A880]/25 rounded-md p-4 lg:p-5 shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4 items-center"
        >
          {/* Check-in */}
          <div className="flex flex-col gap-1">
            <label htmlFor="hero-check-in" className="text-[11px] uppercase tracking-wider text-[#C5A880] font-medium flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Check-in</span>
            </label>
            <input
              id="hero-check-in"
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="bg-[#0E231C]/80 border border-[#C5A880]/20 rounded px-3 py-2 text-xs sm:text-sm text-[#F7F4EE] focus:border-[#C5A880] focus:outline-none"
              required
            />
          </div>

          {/* Check-out */}
          <div className="flex flex-col gap-1">
            <label htmlFor="hero-check-out" className="text-[11px] uppercase tracking-wider text-[#C5A880] font-medium flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Check-out</span>
            </label>
            <input
              id="hero-check-out"
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={checkIn}
              className="bg-[#0E231C]/80 border border-[#C5A880]/20 rounded px-3 py-2 text-xs sm:text-sm text-[#F7F4EE] focus:border-[#C5A880] focus:outline-none"
              required
            />
          </div>

          {/* Guests */}
          <div className="flex flex-col gap-1">
            <label htmlFor="hero-guests" className="text-[11px] uppercase tracking-wider text-[#C5A880] font-medium flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              <span>Guests</span>
            </label>
            <select
              id="hero-guests"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="bg-[#0E231C]/80 border border-[#C5A880]/20 rounded px-3 py-2 text-xs sm:text-sm text-[#F7F4EE] focus:border-[#C5A880] focus:outline-none"
            >
              <option value={1} className="bg-[#0E231C] text-white">1 Guest</option>
              <option value={2} className="bg-[#0E231C] text-white">2 Guests</option>
              <option value={3} className="bg-[#0E231C] text-white">3 Guests</option>
              <option value={4} className="bg-[#0E231C] text-white">4 Guests</option>
              <option value={6} className="bg-[#0E231C] text-white">5-6 Guests (Villa)</option>
            </select>
          </div>

          {/* Room Type */}
          <div className="flex flex-col gap-1">
            <label htmlFor="hero-room-type" className="text-[11px] uppercase tracking-wider text-[#C5A880] font-medium flex items-center gap-1.5">
              <BedDouble className="w-3.5 h-3.5" />
              <span>Accommodations</span>
            </label>
            <select
              id="hero-room-type"
              value={roomCategory}
              onChange={(e) => setRoomCategory(e.target.value)}
              className="bg-[#0E231C]/80 border border-[#C5A880]/20 rounded px-3 py-2 text-xs sm:text-sm text-[#F7F4EE] focus:border-[#C5A880] focus:outline-none"
            >
              <option value="Grand Suites" className="bg-[#0E231C] text-white">Grand Suites</option>
              <option value="Lake View Rooms" className="bg-[#0E231C] text-white">Lake View Rooms</option>
              <option value="Private Villas" className="bg-[#0E231C] text-white">Private Villas</option>
            </select>
          </div>

          {/* Search Button */}
          <div className="flex flex-col justify-end pt-1 sm:pt-0 sm:col-span-2 lg:col-span-1">
            <button
              type="submit"
              className="w-full py-2.5 sm:py-3 px-4 text-xs uppercase tracking-widest font-semibold text-[#0E231C] bg-[#C5A880] hover:bg-[#D4B886] rounded transition-all shadow active:scale-95"
            >
              Check Rates
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
