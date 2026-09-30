import React, { useState } from 'react';
import { MapPin, Navigation, Plane, Train, Compass, Car, Phone, Mail, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { RESORT_INFO } from '../data/retreatData';

export const JourneyLocation: React.FC = () => {
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [arrivalDate, setArrivalDate] = useState('');
  const [arrivalMode, setArrivalMode] = useState('Maharana Pratap Airport (UDR) - Flight');
  const [flightNumber, setFlightNumber] = useState('');
  const [guestName, setGuestName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [transferSuccess, setTransferSuccess] = useState(false);

  const nearbyAttractions = [
    {
      name: 'Lake Badi & Bahubali Hills',
      distance: '1.2 km (4 mins)',
      description: 'An idyllic freshwater lake engineered in 1699 by Maharana Raj Singh I, flanked by dramatic ridge-line lookouts.',
    },
    {
      name: 'Sajjangarh (Monsoon Palace)',
      distance: '7 km (15 mins)',
      description: 'Perched high in the clouds atop Bansdara mountain, offering legendary panoramic twilight vistas across the Udaipur basin.',
    },
    {
      name: 'City Palace & Lake Pichola',
      distance: '9 km (18 mins)',
      description: 'The monumental 400-year-old architectural crown of Mewar with royal courtyards, marble balconies, and crystal galleries.',
    },
    {
      name: 'Shilpgram Rural Arts Complex',
      distance: '4.5 km (10 mins)',
      description: 'An open-air living ethnographic museum celebrating traditional Rajasthani tribal crafts, pottery, and folk performances.',
    },
  ];

  const handleTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTransferSuccess(true);
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-[#0E231C] text-[#F7F4EE] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium block mb-2">
            Arrival & Sanctuary
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#FDFBF7] tracking-tight mb-4">
            The Journey to Badi Lake
          </h2>
          <p className="text-sm sm:text-base text-[#F7F4EE]/75 font-light leading-relaxed">
            Secluded in the serene foothills of the Aravalis, Aranya Grand Retreat offers absolute privacy while remaining within effortless reach of Udaipur's royal monuments and transit hubs.
          </p>
        </div>

        {/* Address and Directions Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 items-start">
          {/* Left Column: Coordinates, Address & Chauffeur Services */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#142F26]/80 border border-[#C5A880]/20 p-6 sm:p-8 rounded-sm shadow-md">
              <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold block mb-2">
                Resort Address
              </span>
              <p className="font-serif text-xl sm:text-2xl text-[#FDFBF7] mb-4">
                {RESORT_INFO.address}
              </p>
              
              <div className="pt-4 border-t border-[#C5A880]/15 space-y-3 text-xs sm:text-sm text-[#F7F4EE]/80">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                  <a href={`tel:${RESORT_INFO.phoneRaw}`} className="hover:text-[#C5A880] transition-colors">
                    {RESORT_INFO.phone} (Reservations & Concierge)
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
                  <a href={`mailto:${RESORT_INFO.email}`} className="hover:text-[#C5A880] transition-colors">
                    {RESORT_INFO.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Compass className="w-4 h-4 text-[#C5A880] shrink-0" />
                  <span>GPS: 24.6167° N, 73.6333° E (Near Lake Badi Embankment)</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#C5A880]/15">
                <button
                  onClick={() => setTransferModalOpen(true)}
                  className="w-full py-3 px-4 text-xs uppercase tracking-widest font-semibold text-[#0E231C] bg-[#C5A880] hover:bg-[#D4B886] rounded-sm transition-all flex items-center justify-center gap-2 shadow"
                >
                  <Car className="w-4 h-4" />
                  <span>Plan Your Journey</span>
                </button>
              </div>
            </div>

            {/* Travel Distances Card */}
            <div className="bg-[#091713]/80 border border-[#C5A880]/20 p-6 rounded-sm">
              <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold block mb-4">
                Transit Distances
              </span>
              <div className="space-y-3">
                {RESORT_INFO.distances.map((dist, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs sm:text-sm py-1.5 border-b border-[#C5A880]/10 last:border-0">
                    <span className="text-[#F7F4EE]/80">{dist.place}</span>
                    <span className="text-[#C5A880] font-medium font-mono">{dist.distance} · {dist.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Nearby Curated Attractions */}
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold block mb-4">
              Nearby Curated Attractions
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {nearbyAttractions.map((attr, idx) => (
                <div
                  key={idx}
                  className="bg-[#142F26]/50 border border-[#C5A880]/15 p-5 rounded-sm hover:border-[#C5A880]/40 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-serif text-lg text-[#FDFBF7] font-medium">
                      {attr.name}
                    </h4>
                    <span className="text-[11px] text-[#C5A880] font-mono">
                      {attr.distance}
                    </span>
                  </div>
                  <p className="text-xs text-[#F7F4EE]/70 font-light leading-relaxed">
                    {attr.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Map Presentation Card */}
            <div className="mt-6 p-6 rounded-sm bg-[#142F26]/70 border border-[#C5A880]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Navigation className="w-6 h-6 text-[#C5A880] shrink-0" />
                <div>
                  <h4 className="font-serif text-lg text-[#FDFBF7]">Interactive Driving Navigation</h4>
                  <p className="text-xs text-[#F7F4EE]/70">Direct highway connectivity from Udaipur Airport and NH 27.</p>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=Lake+Badi+Udaipur+Rajasthan"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs uppercase tracking-wider text-[#C5A880] hover:text-[#0E231C] border border-[#C5A880] hover:bg-[#C5A880] rounded-sm transition-all whitespace-nowrap"
              >
                Open Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Plan Your Journey / Chauffeur Transfer Modal */}
      {transferModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={() => setTransferModalOpen(false)}
        >
          <div
            className="relative bg-[#0E231C] border border-[#C5A880]/30 rounded-md max-w-xl w-full p-6 sm:p-8 shadow-2xl text-[#F7F4EE] my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#C5A880]/20 mb-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold block">
                  Private Travel Concierge
                </span>
                <h3 className="font-serif text-2xl text-[#FDFBF7]">
                  Plan Your Journey
                </h3>
              </div>
              <button
                onClick={() => setTransferModalOpen(false)}
                className="text-[#F7F4EE]/70 hover:text-white text-xs uppercase tracking-wider"
              >
                Close
              </button>
            </div>

            {transferSuccess ? (
              <div className="text-center py-6 space-y-3 animate-fade-in">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#C5A880]/15 border border-[#C5A880] flex items-center justify-center text-[#C5A880]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-serif text-2xl text-[#FDFBF7]">
                  Transfer Request Logged
                </h4>
                <p className="text-xs sm:text-sm text-[#F7F4EE]/80 font-light">
                  Thank you, <strong className="text-white">{guestName}</strong>. Our transport concierge will schedule your luxury private vehicle for arrival on <span className="text-[#C5A880]">{arrivalDate}</span>.
                </p>
                <button
                  onClick={() => {
                    setTransferSuccess(false);
                    setTransferModalOpen(false);
                  }}
                  className="mt-4 px-6 py-2 text-xs uppercase tracking-wider font-semibold text-[#0E231C] bg-[#C5A880] rounded"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleTransferSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C5A880] font-medium mb-1">
                    Arrival Point / Hub *
                  </label>
                  <select
                    value={arrivalMode}
                    onChange={(e) => setArrivalMode(e.target.value)}
                    className="w-full bg-[#091713] border border-[#C5A880]/25 rounded px-3 py-2 text-xs text-[#F7F4EE] focus:border-[#C5A880] focus:outline-none"
                  >
                    <option value="Maharana Pratap Airport (UDR) - Flight">Maharana Pratap Airport (UDR) - Flight</option>
                    <option value="Udaipur City Railway Station">Udaipur City Railway Station</option>
                    <option value="Self-Drive / Private Chauffeur from Jaipur/Ahmedabad/Delhi">Self-Drive / Highway Access</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#C5A880] font-medium mb-1">
                      Expected Arrival Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={arrivalDate}
                      onChange={(e) => setArrivalDate(e.target.value)}
                      className="w-full bg-[#091713] border border-[#C5A880]/25 rounded px-3 py-2 text-xs text-[#F7F4EE] focus:border-[#C5A880] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#C5A880] font-medium mb-1">
                      Flight / Train Number
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 6E-205 / AI-472"
                      value={flightNumber}
                      onChange={(e) => setFlightNumber(e.target.value)}
                      className="w-full bg-[#091713] border border-[#C5A880]/25 rounded px-3 py-2 text-xs text-[#F7F4EE] focus:border-[#C5A880] focus:outline-none placeholder:text-white/30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#C5A880] font-medium mb-1">
                      Guest Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full bg-[#091713] border border-[#C5A880]/25 rounded px-3 py-2 text-xs text-[#F7F4EE] focus:border-[#C5A880] focus:outline-none placeholder:text-white/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#C5A880] font-medium mb-1">
                      Contact Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      className="w-full bg-[#091713] border border-[#C5A880]/25 rounded px-3 py-2 text-xs text-[#F7F4EE] focus:border-[#C5A880] focus:outline-none placeholder:text-white/30"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-[#C5A880]/20 flex items-center justify-between">
                  <span className="text-[11px] text-[#F7F4EE]/60 italic">
                    Chauffeur meets with personalized brass placard.
                  </span>
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#0E231C] bg-[#C5A880] hover:bg-[#D4B886] rounded-sm transition-all"
                  >
                    Arrange Chauffeur
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
