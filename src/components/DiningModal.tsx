import React, { useState } from 'react';
import { X, Calendar, Clock, Users, Utensils, CheckCircle, Sparkles } from 'lucide-react';
import { DiningVenue, DINING_VENUES } from '../data/retreatData';

interface DiningModalProps {
  venue: DiningVenue | null;
  onClose: () => void;
}

export const DiningModal: React.FC<DiningModalProps> = ({ venue, onClose }) => {
  const [selectedVenueId, setSelectedVenueId] = useState(venue?.id || 'aranya-kitchen');
  const [date, setDate] = useState(new Date(Date.now() + 86400000).toISOString().split('T')[0]);
  const [time, setTime] = useState('20:00');
  const [guests, setGuests] = useState('2 Guests');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [dietary, setDietary] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!venue) return null;

  const currentVenue = DINING_VENUES.find((v) => v.id === selectedVenueId) || venue;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = 'ARN-DINE-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(ref);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dining-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-[#0E231C] border border-[#C5A880]/30 rounded-md max-w-2xl w-full overflow-hidden shadow-2xl text-[#F7F4EE] my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-[#F7F4EE]/70 hover:text-white bg-[#091713]/60 hover:bg-[#091713] rounded-full transition-colors"
          aria-label="Close dining reservation modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Visual */}
        <div className="relative h-44 sm:h-52 w-full overflow-hidden">
          <img
            src={currentVenue.image}
            alt={currentVenue.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E231C] via-[#0E231C]/60 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-[11px] uppercase tracking-widest text-[#C5A880] font-medium block">
              Table Reservation
            </span>
            <h2 id="dining-modal-title" className="font-serif text-2xl sm:text-3xl text-[#FDFBF7]">
              {currentVenue.name}
            </h2>
            <p className="text-xs text-[#E4D6C1] italic">{currentVenue.subtitle}</p>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#C5A880]/15 border border-[#C5A880] flex items-center justify-center text-[#C5A880]">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl text-[#FDFBF7]">Reservation Requested</h3>
              <p className="text-sm text-[#F7F4EE]/80 max-w-md mx-auto font-light leading-relaxed">
                Thank you, <span className="font-medium text-white">{name}</span>. Our Maître d’ at {currentVenue.name} will prepare your table for <span className="text-[#C5A880]">{guests}</span> on <span className="text-white">{date}</span> at <span className="text-white">{time}</span>.
              </p>
              <div className="bg-[#142F26] border border-[#C5A880]/20 rounded p-3 max-w-xs mx-auto text-xs text-[#C5A880] font-mono">
                Booking Reference: {bookingRef}
              </div>
              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#0E231C] bg-[#C5A880] hover:bg-[#D4B886] rounded-sm transition-all"
                >
                  Return to Dining
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Venue Selector */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#C5A880] font-medium mb-1.5">
                  Select Dining Venue
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {DINING_VENUES.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVenueId(v.id)}
                      className={`p-2 text-xs rounded border text-left transition-all ${
                        selectedVenueId === v.id
                          ? 'border-[#C5A880] bg-[#142F26] text-white font-medium'
                          : 'border-[#C5A880]/20 text-[#F7F4EE]/70 hover:border-[#C5A880]/40'
                      }`}
                    >
                      <span className="block truncate">{v.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date, Time, Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C5A880] font-medium mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Date</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#091713] border border-[#C5A880]/25 rounded px-3 py-2 text-xs text-[#F7F4EE] focus:border-[#C5A880] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C5A880] font-medium mb-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Seating Time</span>
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-[#091713] border border-[#C5A880]/25 rounded px-3 py-2 text-xs text-[#F7F4EE] focus:border-[#C5A880] focus:outline-none"
                  >
                    <option value="12:30">12:30 (Lunch)</option>
                    <option value="13:30">13:30 (Lunch)</option>
                    <option value="17:00">17:00 (Sunset Bar)</option>
                    <option value="19:30">19:30 (Dinner)</option>
                    <option value="20:30">20:30 (Dinner)</option>
                    <option value="21:30">21:30 (Late Dinner)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C5A880] font-medium mb-1 flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>Guests</span>
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-[#091713] border border-[#C5A880]/25 rounded px-3 py-2 text-xs text-[#F7F4EE] focus:border-[#C5A880] focus:outline-none"
                  >
                    <option value="1 Guest">1 Guest</option>
                    <option value="2 Guests">2 Guests (Couple)</option>
                    <option value="4 Guests">4 Guests</option>
                    <option value="6 Guests">6 Guests</option>
                    <option value="8+ Guests">Private Pavilion (8+)</option>
                  </select>
                </div>
              </div>

              {/* Guest Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C5A880] font-medium mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Radhika Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#091713] border border-[#C5A880]/25 rounded px-3 py-2 text-xs text-[#F7F4EE] focus:border-[#C5A880] focus:outline-none placeholder:text-white/30"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C5A880] font-medium mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#091713] border border-[#C5A880]/25 rounded px-3 py-2 text-xs text-[#F7F4EE] focus:border-[#C5A880] focus:outline-none placeholder:text-white/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#C5A880] font-medium mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#091713] border border-[#C5A880]/25 rounded px-3 py-2 text-xs text-[#F7F4EE] focus:border-[#C5A880] focus:outline-none placeholder:text-white/30"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#C5A880] font-medium mb-1">
                  Special Notes & Dietary Preferences (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Anniversary celebration, vegetarian, Jain, anniversary seating by water"
                  value={dietary}
                  onChange={(e) => setDietary(e.target.value)}
                  className="w-full bg-[#091713] border border-[#C5A880]/25 rounded px-3 py-2 text-xs text-[#F7F4EE] focus:border-[#C5A880] focus:outline-none placeholder:text-white/30"
                />
              </div>

              <div className="pt-3 border-t border-[#C5A880]/20 flex items-center justify-between">
                <span className="text-[11px] text-[#F7F4EE]/60 italic">
                  *Attire: Smart Resort Elegant
                </span>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#0E231C] bg-[#C5A880] hover:bg-[#D4B886] rounded-sm transition-all"
                >
                  Request Table
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
