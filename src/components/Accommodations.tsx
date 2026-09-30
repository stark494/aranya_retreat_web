import React, { useState } from 'react';
import { Users, Maximize, ArrowRight, Eye, Sparkles } from 'lucide-react';
import { ROOMS, Room } from '../data/retreatData';
import { RoomModal } from './RoomModal';

interface AccommodationsProps {
  onSelectRoomToBook: (room: Room) => void;
}

export const Accommodations: React.FC<AccommodationsProps> = ({ onSelectRoomToBook }) => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Grand Suites' | 'Lake View Rooms' | 'Private Villas'>('All');
  const [selectedRoomForModal, setSelectedRoomForModal] = useState<Room | null>(null);

  const filteredRooms = activeCategory === 'All'
    ? ROOMS
    : ROOMS.filter((room) => room.category === activeCategory);

  return (
    <section id="stay" className="py-24 lg:py-32 bg-[#0E231C] text-[#F7F4EE] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium block mb-2">
              Sanctuaries of Stillness
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#FDFBF7] tracking-tight">
              Accommodations
            </h2>
          </div>

          {/* Interactive Filter Controls (Functional Tabs adhering to Zero-Pill Discipline) */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#091713]/80 border border-[#C5A880]/20 rounded-md">
            {(['All', 'Grand Suites', 'Lake View Rooms', 'Private Villas'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-medium tracking-wider rounded-sm transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-[#C5A880] text-[#0E231C] font-semibold shadow-sm'
                    : 'text-[#F7F4EE]/70 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accommodation Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <article
              key={room.id}
              className="group bg-[#142F26]/70 border border-[#C5A880]/20 hover:border-[#C5A880]/50 rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-xl"
            >
              <div>
                {/* Media Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#091713]">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#142F26] via-transparent to-black/20" />
                  
                  {/* Category subtle text kicker */}
                  <div className="absolute top-4 left-4">
                    <span className="text-[11px] tracking-wider uppercase font-semibold text-[#FDFBF7] bg-[#0E231C]/80 px-2.5 py-1 backdrop-blur-sm border border-[#C5A880]/30 rounded-xs">
                      {room.category}
                    </span>
                  </div>

                  {/* Demo Price Tag */}
                  <div className="absolute bottom-3 right-4 text-right">
                    <span className="text-sm font-serif font-medium text-[#FDFBF7]">
                      ₹{room.demoRateInr.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-[#C5A880] block">Demo Rate / Night</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  {/* Title & Tagline */}
                  <h3 className="font-serif text-2xl text-[#FDFBF7] group-hover:text-[#C5A880] transition-colors mb-1">
                    {room.name}
                  </h3>
                  <p className="text-xs text-[#D0BC9F] italic font-light mb-4 line-clamp-1">
                    {room.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-[#F7F4EE]/75 font-light leading-relaxed mb-6 line-clamp-3">
                    {room.description}
                  </p>

                  {/* Capacity & Space row */}
                  <div className="flex items-center gap-4 text-xs text-[#F7F4EE]/70 py-3 border-y border-[#C5A880]/15 mb-4">
                    <span className="flex items-center gap-1.5">
                      <Maximize className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>{room.sizeSqFt} sq.ft</span>
                    </span>
                    <span className="text-[#C5A880]/30">·</span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>Up to {room.maxGuests} Guests</span>
                    </span>
                  </div>

                  {/* Signature Inclusions (Preview 3 items) */}
                  <div className="space-y-1.5 mb-2">
                    {room.amenities.slice(0, 3).map((amenity, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#F7F4EE]/80">
                        <Sparkles className="w-3 h-3 text-[#C5A880] shrink-0" />
                        <span className="truncate">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 pt-0 flex items-center gap-3">
                <button
                  onClick={() => setSelectedRoomForModal(room)}
                  className="flex-1 py-2.5 px-3 text-xs uppercase tracking-wider font-medium text-[#F7F4EE]/80 hover:text-white border border-[#C5A880]/30 hover:border-[#C5A880] rounded-sm transition-colors flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Details</span>
                </button>
                <button
                  onClick={() => onSelectRoomToBook(room)}
                  className="flex-1 py-2.5 px-3 text-xs uppercase tracking-wider font-semibold text-[#0E231C] bg-[#C5A880] hover:bg-[#D4B886] rounded-sm transition-all flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <span>Reserve</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Demo rate note */}
        <div className="mt-8 text-center text-xs text-[#C5A880]/70 font-light">
          *All displayed prices and room packages are fictional demo rates crafted for portfolio presentation. Real reservations are confirmed by our concierge team.
        </div>
      </div>

      {/* Room Detail Modal */}
      <RoomModal
        room={selectedRoomForModal}
        onClose={() => setSelectedRoomForModal(null)}
        onBookNow={(room) => {
          setSelectedRoomForModal(null);
          onSelectRoomToBook(room);
        }}
      />
    </section>
  );
};
