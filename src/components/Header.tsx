import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare } from 'lucide-react';
import { RESORT_INFO } from '../data/retreatData';

interface HeaderProps {
  onOpenBooking: () => void;
  onOpenWeddingForm: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking, onOpenWeddingForm }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Stay', href: '#stay' },
    { label: 'Dine', href: '#dine' },
    { label: 'Experiences', href: '#experiences' },
    { label: 'Weddings', href: '#weddings' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Universal 3-Zone Top Bar Contract */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0E231C]/90 backdrop-blur-md border-b border-[#C5A880]/15 py-3 shadow-lg'
            : 'bg-gradient-to-b from-[#091713]/80 via-[#0E231C]/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="font-serif text-2xl lg:text-3xl font-semibold tracking-wide text-[#FDFBF7] hover:text-[#C5A880] transition-colors whitespace-nowrap"
          >
            {RESORT_INFO.shortName}
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wider text-[#F7F4EE]/80">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="hover:text-[#C5A880] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C5A880] hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenWeddingForm}
              className="hidden lg:inline-flex text-xs uppercase tracking-widest text-[#C5A880] hover:text-[#FDFBF7] transition-colors px-3 py-2 whitespace-nowrap font-medium"
            >
              Weddings
            </button>
            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0E231C] bg-[#C5A880] hover:bg-[#D4B886] rounded-sm transition-all duration-200 shadow-sm active:scale-95 whitespace-nowrap"
            >
              Plan Your Stay
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#F7F4EE] hover:text-[#C5A880] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Accessible Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0E231C]/98 backdrop-blur-xl md:hidden pt-24 px-6 flex flex-col justify-between pb-10 animate-fade-in">
          <div className="space-y-6">
            <div className="border-b border-[#C5A880]/15 pb-4">
              <span className="font-serif text-2xl text-[#FDFBF7] block">
                {RESORT_INFO.shortName}
              </span>
              <span className="text-xs text-[#C5A880] tracking-wider block mt-1">
                {RESORT_INFO.location}
              </span>
            </div>
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="text-lg font-serif text-[#F7F4EE] hover:text-[#C5A880] transition-colors py-1 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-[#C5A880]/60 font-sans">0{navLinks.indexOf(link) + 1}</span>
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-3 pt-6 border-t border-[#C5A880]/15">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-[#0E231C] bg-[#C5A880] hover:bg-[#D4B886] rounded-sm transition-all"
            >
              Plan Your Stay
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWeddingForm();
              }}
              className="w-full py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-[#FDFBF7] border border-[#C5A880]/40 hover:bg-[#C5A880]/10 rounded-sm transition-all"
            >
              Plan Your Wedding
            </button>
            <div className="flex items-center justify-between text-xs text-[#F7F4EE]/70 pt-2 px-1">
              <a href={`tel:${RESORT_INFO.phoneRaw}`} className="flex items-center gap-1.5 hover:text-[#C5A880]">
                <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{RESORT_INFO.phone}</span>
              </a>
              <a
                href={`https://wa.me/${RESORT_INFO.whatsAppNumber}?text=Hello%20Aranya%20Grand%20Retreat%2C%20I%20would%20like%20to%20enquire%20about%20a%20stay.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#C5A880]"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Concierge Chat</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
