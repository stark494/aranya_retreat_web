import React from 'react';
import { Phone, Mail, MapPin, MessageSquare, ArrowUp, Heart } from 'lucide-react';
import { RESORT_INFO } from '../data/retreatData';

interface FooterProps {
  onPlanStay: () => void;
  onPlanWedding: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onPlanStay, onPlanWedding }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Accommodations', href: '#stay' },
    { label: 'Royal Dining', href: '#dine' },
    { label: 'Curated Experiences', href: '#experiences' },
    { label: 'Weddings & Celebrations', href: '#weddings' },
    { label: 'Cinematic Gallery', href: '#gallery' },
    { label: 'Location & Arrival', href: '#contact' },
  ];

  return (
    <footer className="bg-[#091713] text-[#F7F4EE] border-t border-[#C5A880]/20 pt-16 pb-24 md:pb-16 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-[#C5A880]/15">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <span className="font-serif text-2xl sm:text-3xl font-semibold text-[#FDFBF7] tracking-wide block">
              {RESORT_INFO.name}
            </span>
            <p className="font-serif text-lg text-[#C5A880] italic">
              "{RESORT_INFO.tagline}"
            </p>
            <p className="text-xs sm:text-sm text-[#F7F4EE]/70 font-light leading-relaxed max-w-md">
              A private luxury retreat on the shores of Lake Badi, Udaipur. Designed for slow mornings, royal heritage celebrations, destination weddings, and beautifully considered escapes.
            </p>
            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={onPlanStay}
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0E231C] bg-[#C5A880] hover:bg-[#D4B886] rounded-xs transition-colors"
              >
                Plan Your Stay
              </button>
              <button
                onClick={onPlanWedding}
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#FDFBF7] border border-[#C5A880]/40 hover:bg-[#C5A880]/10 rounded-xs transition-colors"
              >
                Plan Your Wedding
              </button>
            </div>
          </div>

          {/* Quick Navigation Column */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-semibold block mb-2">
              Retreat Directory
            </span>
            <ul className="space-y-2 text-xs sm:text-sm text-[#F7F4EE]/75">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-[#C5A880] transition-colors py-0.5 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-semibold block mb-2">
              Reservations & Inquiries
            </span>
            <div className="space-y-2.5 text-xs sm:text-sm text-[#F7F4EE]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>{RESORT_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                <a href={`tel:${RESORT_INFO.phoneRaw}`} className="hover:text-[#C5A880] transition-colors">
                  {RESORT_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
                <a href={`mailto:${RESORT_INFO.email}`} className="hover:text-[#C5A880] transition-colors">
                  {RESORT_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Heart className="w-4 h-4 text-[#C5A880] shrink-0" />
                <a href={`mailto:${RESORT_INFO.weddingEmail}`} className="hover:text-[#C5A880] transition-colors">
                  {RESORT_INFO.weddingEmail} (Weddings Desk)
                </a>
              </div>
              <div className="flex items-center gap-2.5 pt-1">
                <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href={`https://wa.me/${RESORT_INFO.whatsAppNumber}?text=Hello%20Aranya%20Grand%20Retreat%2C%20I%20would%20like%20to%20enquire%20about%20a%20stay.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] hover:underline"
                >
                  Direct WhatsApp Concierge (+91 294 555 7288)
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal / Disclaimer & Back to Top */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#F7F4EE]/50 font-light">
          <div className="space-y-1 text-center md:text-left">
            <p>© {new Date().getFullYear()} Aranya Grand Retreat & Weddings. All rights reserved.</p>
            <p className="text-[11px] text-[#C5A880]/80">
              *Notice: This is a fictional portfolio/demo brand. All prices, reviews, statistics, and business information are fictional.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-[#C5A880] hover:text-white transition-colors"
          >
            <span>Return to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
