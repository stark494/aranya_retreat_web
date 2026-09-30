import React from 'react';
import { X, Check, Users, Maximize, Eye, Sparkles, Bed, ShieldCheck, ArrowRight } from 'lucide-react';
import { Room } from '../data/retreatData';

interface RoomModalProps {
  room: Room | null;
  onClose: () => void;
  onBookNow: (room: Room) => void;
}

export const RoomModal: React.FC<RoomModalProps> = ({ room, onClose, onBookNow }) => {
  if (!room) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="room-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-[#0E231C] border border-[#C5A880]/30 rounded-md max-w-4xl w-full overflow-hidden shadow-2xl text-[#F7F4EE] my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-[#F7F4EE]/70 hover:text-white bg-[#091713]/60 hover:bg-[#091713] rounded-full transition-colors"
          aria-label="Close suite details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="relative h-72 sm:h-96 w-full overflow-hidden">
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E231C] via-[#0E231C]/40 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6">
            <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold block mb-1">
              {room.category}
            </span>
            <h2 id="room-modal-title" className="font-serif text-2xl sm:text-4xl text-[#FDFBF7] font-light">
              {room.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#E4D6C1] mt-1 font-light italic">
              {room.tagline}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Key Specs Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 px-5 rounded bg-[#142F26]/70 border border-[#C5A880]/20 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <Maximize className="w-4 h-4 text-[#C5A880]" />
              <div>
                <span className="text-white/60 block text-[10px] uppercase">Space</span>
                <span className="font-medium text-white">{room.sizeSqFt} sq.ft</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#C5A880]" />
              <div>
                <span className="text-white/60 block text-[10px] uppercase">Capacity</span>
                <span className="font-medium text-white">Up to {room.maxGuests} Guests</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Bed className="w-4 h-4 text-[#C5A880]" />
              <div>
                <span className="text-white/60 block text-[10px] uppercase">Bedding</span>
                <span className="font-medium text-white">{room.bedType}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#C5A880]" />
              <div>
                <span className="text-white/60 block text-[10px] uppercase">Vista</span>
                <span className="font-medium text-white">{room.view}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-serif text-xl text-[#FDFBF7] mb-2 font-normal">Architectural Overview</h3>
            <p className="text-sm sm:text-base text-[#F7F4EE]/80 leading-relaxed font-light">
              {room.description}
            </p>
          </div>

          {/* Amenities & Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#C5A880] font-semibold mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Signature Inclusions</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-[#F7F4EE]/80">
                {room.amenities.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#C5A880] mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#C5A880] font-semibold mb-3 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Residence Highlights</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-[#F7F4EE]/80">
                {room.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#C5A880] font-serif text-sm">·</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer Action Bar */}
          <div className="pt-6 border-t border-[#C5A880]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-2xl sm:text-3xl text-[#FDFBF7] font-semibold">
                  ₹{room.demoRateInr.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-[#F7F4EE]/60">/ night + taxes</span>
              </div>
              <span className="text-[11px] text-[#C5A880]/80 tracking-wide block">
                *Demo portfolio rate for presentation & preview
              </span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="w-1/2 sm:w-auto px-5 py-2.5 text-xs uppercase tracking-wider text-[#F7F4EE]/70 hover:text-white border border-[#C5A880]/30 rounded-sm"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  onBookNow(room);
                }}
                className="w-1/2 sm:w-auto px-6 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#0E231C] bg-[#C5A880] hover:bg-[#D4B886] rounded-sm transition-all flex items-center justify-center gap-2"
              >
                <span>Reserve This Suite</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
