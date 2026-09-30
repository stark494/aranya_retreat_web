import React from 'react';
import { BedDouble, Heart, MessageSquare } from 'lucide-react';
import { RESORT_INFO } from '../data/retreatData';

interface MobileStickyBarProps {
  onPlanStay: () => void;
  onPlanWedding: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  onPlanStay,
  onPlanWedding,
}) => {
  const whatsappUrl = `https://wa.me/${RESORT_INFO.whatsAppNumber}?text=${encodeURIComponent(
    'Hello Aranya Grand Retreat, I would like to enquire about a stay.'
  )}`;

  return (
    <aside
      aria-label="Quick mobile booking actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#091713]/95 backdrop-blur-md border-t border-[#C5A880]/30 py-2 px-3 shadow-2xl"
    >
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto items-center">
        {/* Stay CTA */}
        <button
          onClick={onPlanStay}
          className="h-11 px-2 flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#0E231C] bg-[#C5A880] active:bg-[#D4B886] rounded-xs shadow-sm transition-transform active:scale-95 whitespace-nowrap"
        >
          <BedDouble className="w-3.5 h-3.5 shrink-0" />
          <span>Stay</span>
        </button>

        {/* Wedding CTA */}
        <button
          onClick={onPlanWedding}
          className="h-11 px-2 flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#FDFBF7] border border-[#C5A880]/50 active:bg-[#C5A880]/20 rounded-xs transition-transform active:scale-95 whitespace-nowrap"
        >
          <Heart className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
          <span>Wedding</span>
        </button>

        {/* WhatsApp Concierge CTA */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="h-11 px-2 flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#25D366] border border-[#25D366]/40 active:bg-[#25D366]/10 rounded-xs transition-transform active:scale-95 whitespace-nowrap"
        >
          <MessageSquare className="w-3.5 h-3.5 shrink-0" />
          <span>WhatsApp</span>
        </a>
      </div>
    </aside>
  );
};
