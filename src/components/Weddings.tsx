import React, { useState } from 'react';
import { Sparkles, Calendar, Users, Phone, Mail, Heart, CheckCircle2, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import { WEDDING_VENUES, WeddingVenue, RESORT_INFO } from '../data/retreatData';

export const Weddings: React.FC = () => {
  const [selectedVenue, setSelectedVenue] = useState<WeddingVenue>(WEDDING_VENUES[0]);
  
  // Wedding Inquiry Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [weddingDate, setWeddingDate] = useState('');
  const [guestCount, setGuestCount] = useState('150 – 250 Guests');
  const [eventType, setEventType] = useState('Full Destination Wedding (2-3 Days)');
  const [contactMethod, setContactMethod] = useState<'WhatsApp' | 'Phone Call' | 'Email'>('WhatsApp');
  const [message, setMessage] = useState('');
  
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [inquiryId, setInquiryId] = useState('');

  const weddingPillars = [
    {
      title: 'Ceremonies',
      desc: 'Floating lake mandaps and sacred Vedic pheras at dusk with panoramic water reflections.',
      icon: Sparkles,
    },
    {
      title: 'Reception',
      desc: 'Grand gala evenings in the illuminated Glasshouse or starlit amphitheatre under Mewari skies.',
      icon: Heart,
    },
    {
      title: 'Catering',
      desc: 'Royal Rajasthani royal feasts, coastal live counters, and bespoke multi-course menus by master chefs.',
      icon: ShieldCheck,
    },
    {
      title: 'Décor',
      desc: 'Heirloom brass lanterns, cascading Mogra and tuberose, and sustainable handwoven textiles.',
      icon: Sparkles,
    },
    {
      title: 'Accommodation',
      desc: 'Full resort buyout options with luxury lake-facing suites and private pool villas for your guests.',
      icon: Users,
    },
    {
      title: 'Photography',
      desc: 'Cinematic heritage architectural backdrops, private jetty portraits, and golden hour lighting.',
      icon: Calendar,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setInquiryId('WED-' + Math.floor(100000 + Math.random() * 900000));
      setSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setPhone('');
    setEmail('');
    setWeddingDate('');
    setMessage('');
  };

  return (
    <section id="weddings" className="py-24 lg:py-32 bg-[#091713] text-[#F7F4EE] relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-48 w-96 h-96 bg-[#1F4538]/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium block mb-2">
            Destination Celebrations in Udaipur
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#FDFBF7] tracking-tight mb-4">
            Your celebration, <span className="italic text-[#E4D6C1]">beautifully yours.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#F7F4EE]/80 font-light leading-relaxed">
            From intimate sunset pheras extending over Lake Badi to three-day palace takeovers under Rajasthan’s starlit skies, Aranya crafts destination weddings of timeless emotional resonance.
          </p>
        </div>

        {/* 6 Wedding Pillars (Ceremonies, Reception, Catering, Décor, Accommodation, Photography) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-20">
          {weddingPillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="bg-[#0E231C]/80 border border-[#C5A880]/20 p-4 rounded-sm flex flex-col justify-between hover:border-[#C5A880]/50 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] text-[#C5A880] font-mono">0{idx + 1}</span>
                    <Icon className="w-3.5 h-3.5 text-[#C5A880]" />
                  </div>
                  <h3 className="font-serif text-lg text-[#FDFBF7] mb-1">{p.title}</h3>
                  <p className="text-[11px] text-[#F7F4EE]/70 font-light leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Curated Venues Showcase */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#C5A880] font-medium block">
                Exclusive Event Settings
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#FDFBF7]">
                Ceremony & Celebration Venues
              </h3>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-xs text-[#F7F4EE]/60">Select venue to preview</span>
            </div>
          </div>

          {/* Venue Tabs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-6">
            {WEDDING_VENUES.map((venue) => (
              <button
                key={venue.id}
                onClick={() => setSelectedVenue(venue)}
                className={`p-3 text-left rounded-sm border transition-all ${
                  selectedVenue.id === venue.id
                    ? 'bg-[#153329] border-[#C5A880] text-white shadow-md'
                    : 'bg-[#0E231C]/60 border-[#C5A880]/20 text-[#F7F4EE]/70 hover:border-[#C5A880]/40'
                }`}
              >
                <span className="font-serif text-base block text-[#FDFBF7] truncate">{venue.name}</span>
                <span className="text-[11px] text-[#C5A880] block mt-0.5">{venue.capacity}</span>
              </button>
            ))}
          </div>

          {/* Active Venue Feature */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#0E231C] border border-[#C5A880]/25 rounded-sm overflow-hidden p-6 sm:p-8 items-center shadow-xl">
            <div className="lg:col-span-7 relative aspect-[16/10] rounded-sm overflow-hidden bg-[#091713]">
              <img
                src={selectedVenue.image}
                alt={selectedVenue.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                <span className="bg-black/60 px-2.5 py-1 rounded backdrop-blur-sm border border-white/10">
                  {selectedVenue.setting}
                </span>
                <span className="bg-[#C5A880] text-[#0E231C] font-semibold px-2.5 py-1 rounded">
                  {selectedVenue.capacity}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold">
                Ideal Setting For
              </span>
              <h4 className="font-serif text-2xl sm:text-3xl text-[#FDFBF7]">
                {selectedVenue.idealFor}
              </h4>
              <p className="text-sm text-[#F7F4EE]/80 font-light leading-relaxed">
                {selectedVenue.description}
              </p>
              <div className="p-3.5 bg-[#142F26] border border-[#C5A880]/20 rounded text-xs space-y-1">
                <div className="flex justify-between text-[#F7F4EE]/70">
                  <span>Audio & Procession Permitted:</span>
                  <span className="text-white font-medium">Baraat & Live Sound</span>
                </div>
                <div className="flex justify-between text-[#F7F4EE]/70">
                  <span>Mandap Pyre Approval:</span>
                  <span className="text-white font-medium">Full Vedic Sacred Fire Approved</span>
                </div>
                <div className="flex justify-between text-[#F7F4EE]/70">
                  <span>Buyout Privacy:</span>
                  <span className="text-white font-medium">100% Gated & Exclusive</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wedding Planning Conversion Form */}
        <div id="wedding-inquiry-form" className="max-w-4xl mx-auto bg-[#0E231C] border border-[#C5A880]/30 rounded-md p-6 sm:p-10 shadow-2xl relative">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium block mb-1">
              Direct Celebrations Concierge
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#FDFBF7]">
              Plan Your Wedding
            </h3>
            <p className="text-xs sm:text-sm text-[#F7F4EE]/70 font-light mt-1">
              Share your vision with our celebration directors for dates, buyout availability, and bespoke proposals.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-12 space-y-5 animate-fade-in">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#C5A880]/15 border border-[#C5A880] flex items-center justify-center text-[#C5A880]">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-serif text-3xl text-[#FDFBF7]">
                Thank you. Our celebrations team will be in touch shortly.
              </h4>
              <p className="text-sm text-[#F7F4EE]/80 max-w-lg mx-auto font-light leading-relaxed">
                We have received your celebration enquiry for <span className="text-[#C5A880]">{weddingDate || 'your upcoming celebration'}</span>. Our Senior Wedding Specialist will contact you via your preferred method ({contactMethod}) within 12 business hours.
              </p>
              <div className="bg-[#142F26] border border-[#C5A880]/30 rounded p-3 max-w-xs mx-auto text-xs text-[#C5A880] font-mono">
                Celebration ID: {inquiryId}
              </div>
              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <a
                  href={`https://wa.me/${RESORT_INFO.whatsAppNumber}?text=Hello%20Aranya%20Grand%20Retreat%2C%20I%20have%20submitted%20wedding%20inquiry%20${inquiryId}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#0E231C] bg-[#C5A880] hover:bg-[#D4B886] rounded-sm transition-all flex items-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Connect Instantly on WhatsApp</span>
                </a>
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 text-xs uppercase tracking-wider text-[#F7F4EE]/80 hover:text-white border border-[#C5A880]/30 rounded-sm"
                >
                  Submit Another Enquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Row 1: Name, Phone, Email */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C5A880] font-medium mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Radhika & Arjun"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#091713] border border-[#C5A880]/25 rounded px-3 py-2.5 text-xs sm:text-sm text-[#F7F4EE] focus:border-[#C5A880] focus:outline-none placeholder:text-white/30"
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
                    className="w-full bg-[#091713] border border-[#C5A880]/25 rounded px-3 py-2.5 text-xs sm:text-sm text-[#F7F4EE] focus:border-[#C5A880] focus:outline-none placeholder:text-white/30"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C5A880] font-medium mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="couple@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#091713] border border-[#C5A880]/25 rounded px-3 py-2.5 text-xs sm:text-sm text-[#F7F4EE] focus:border-[#C5A880] focus:outline-none placeholder:text-white/30"
                  />
                </div>
              </div>

              {/* Row 2: Wedding Date, Guest Count, Event Type */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C5A880] font-medium mb-1">
                    Tentative Wedding Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={weddingDate}
                    onChange={(e) => setWeddingDate(e.target.value)}
                    className="w-full bg-[#091713] border border-[#C5A880]/25 rounded px-3 py-2.5 text-xs sm:text-sm text-[#F7F4EE] focus:border-[#C5A880] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C5A880] font-medium mb-1">
                    Estimated Guest Count *
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full bg-[#091713] border border-[#C5A880]/25 rounded px-3 py-2.5 text-xs sm:text-sm text-[#F7F4EE] focus:border-[#C5A880] focus:outline-none"
                  >
                    <option value="50 – 100 Guests (Intimate)">50 – 100 Guests (Intimate)</option>
                    <option value="100 – 200 Guests">100 – 200 Guests</option>
                    <option value="200 – 350 Guests (Lake Mandap)">200 – 350 Guests (Lake Mandap)</option>
                    <option value="350 – 500+ Guests (Full Resort Buyout)">350 – 500+ Guests (Full Buyout)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C5A880] font-medium mb-1">
                    Event Type *
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full bg-[#091713] border border-[#C5A880]/25 rounded px-3 py-2.5 text-xs sm:text-sm text-[#F7F4EE] focus:border-[#C5A880] focus:outline-none"
                  >
                    <option value="Full Destination Wedding (2-3 Days)">Full Destination Wedding (2-3 Days)</option>
                    <option value="Intimate Wedding & Pheras (1-2 Days)">Intimate Wedding & Pheras (1-2 Days)</option>
                    <option value="Pre-Wedding / Sangeet Celebration">Pre-Wedding / Sangeet Celebration</option>
                    <option value="Vow Renewal / Golden Anniversary">Vow Renewal / Anniversary</option>
                    <option value="Corporate Executive Retreat">Corporate Executive Retreat</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Preferred Contact Method */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#C5A880] font-medium mb-1.5">
                  Preferred Contact Method
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['WhatsApp', 'Phone Call', 'Email'] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setContactMethod(method)}
                      className={`py-2 px-3 text-xs rounded border transition-all ${
                        contactMethod === method
                          ? 'border-[#C5A880] bg-[#142F26] text-white font-medium'
                          : 'border-[#C5A880]/20 text-[#F7F4EE]/70 hover:border-[#C5A880]/40'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 4: Message */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#C5A880] font-medium mb-1">
                  Your Vision & Special Requests (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your dream mandap, preferred cuisine style, musical preferences, or room requirements..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#091713] border border-[#C5A880]/25 rounded px-3 py-2 text-xs sm:text-sm text-[#F7F4EE] focus:border-[#C5A880] focus:outline-none placeholder:text-white/30 resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-[#C5A880]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-[#F7F4EE]/60 flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Direct wedding desk: <strong className="text-white">{RESORT_INFO.weddingEmail}</strong></span>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-8 py-3.5 text-xs uppercase tracking-widest font-semibold text-[#0E231C] bg-[#C5A880] hover:bg-[#D4B886] rounded-sm transition-all duration-200 shadow-lg active:scale-98 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <span>Submitting Enquiry...</span>
                  ) : (
                    <>
                      <span>Plan Your Wedding</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
