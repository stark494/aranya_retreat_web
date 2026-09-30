import React, { useState } from 'react';
import { Clock, Compass, Sparkles, ArrowRight, Check, X, MessageSquare } from 'lucide-react';
import { EXPERIENCES, RetreatExperience, RESORT_INFO } from '../data/retreatData';
import { CinematicSectionHeader } from './MotionReveal';

export const Experiences: React.FC = () => {
  const [selectedExp, setSelectedExp] = useState<RetreatExperience | null>(null);
  const [inquirySuccess, setInquirySuccess] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestContact, setGuestContact] = useState('');

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySuccess(true);
  };

  const handleCloseModal = () => {
    setSelectedExp(null);
    setInquirySuccess(false);
    setGuestName('');
    setGuestContact('');
  };

  return (
    <section id="experiences" className="py-24 lg:py-32 bg-[#0E231C] text-[#F7F4EE] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header with Cinematic Staggered Fade-in */}
        <CinematicSectionHeader
          kicker="Curated Immersions"
          title="Experiences Crafted for Memory"
          subtitle="Beyond the retreat’s walls lie the living stories of Mewar—ancient Aravali trails, quiet solar boat navigations, twilight sound journeys, and secluded starlit pavilions."
          className="mb-16"
        />

        {/* 6 Curated Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EXPERIENCES.map((exp) => (
            <article
              key={exp.id}
              className="group bg-[#142F26]/60 border border-[#C5A880]/20 hover:border-[#C5A880]/50 rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-xl"
            >
              <div>
                {/* Media Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#091713]">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#142F26] via-transparent to-black/30" />
                  
                  {/* Category text badge */}
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] tracking-wider uppercase font-semibold text-[#FDFBF7] bg-[#0E231C]/85 px-2.5 py-1 backdrop-blur-sm border border-[#C5A880]/30 rounded-xs">
                      {exp.category}
                    </span>
                  </div>

                  {/* Duration Tag */}
                  <div className="absolute bottom-3 right-4">
                    <span className="text-xs text-white/90 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#C5A880]" />
                      <span>{exp.duration}</span>
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="font-serif text-2xl text-[#FDFBF7] group-hover:text-[#C5A880] transition-colors mb-2">
                    {exp.title}
                  </h3>
                  <div className="text-xs text-[#C5A880] mb-3 flex items-center gap-1.5 font-medium">
                    <Sparkles className="w-3 h-3" />
                    <span>{exp.timing}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#F7F4EE]/75 font-light leading-relaxed mb-6 line-clamp-3">
                    {exp.description}
                  </p>

                  {/* Inclusions */}
                  <div className="space-y-1.5 pt-2 border-t border-[#C5A880]/15">
                    {exp.curatedDetails.slice(0, 2).map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#F7F4EE]/80">
                        <Check className="w-3.5 h-3.5 text-[#C5A880] mt-0.5 shrink-0" />
                        <span className="truncate">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => setSelectedExp(exp)}
                  className="w-full py-2.5 px-4 text-xs uppercase tracking-wider font-semibold text-[#FDFBF7] hover:text-[#0E231C] border border-[#C5A880]/40 hover:bg-[#C5A880] rounded-sm transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <span>Explore Immersion</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Experience Detail & Inquiry Modal */}
      {selectedExp && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={handleCloseModal}
        >
          <div
            className="relative bg-[#0E231C] border border-[#C5A880]/30 rounded-md max-w-2xl w-full overflow-hidden shadow-2xl text-[#F7F4EE] my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-20 p-2 text-[#F7F4EE]/70 hover:text-white bg-[#091713]/60 hover:bg-[#091713] rounded-full transition-colors"
              aria-label="Close immersion modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-60 w-full overflow-hidden">
              <img
                src={selectedExp.image}
                alt={selectedExp.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E231C] via-[#0E231C]/50 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-[11px] uppercase tracking-widest text-[#C5A880] font-medium block">
                  {selectedExp.category}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#FDFBF7]">
                  {selectedExp.title}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-6 text-xs sm:text-sm text-[#C5A880] pb-3 border-b border-[#C5A880]/20">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>Duration: {selectedExp.duration}</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <Compass className="w-4 h-4" />
                  <span>{selectedExp.timing}</span>
                </span>
              </div>

              <div>
                <h4 className="font-serif text-lg text-[#FDFBF7] mb-2 font-normal">About the Experience</h4>
                <p className="text-sm text-[#F7F4EE]/85 font-light leading-relaxed">
                  {selectedExp.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-wider text-[#C5A880] font-semibold mb-2">
                  What is Included
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-[#F7F4EE]/80">
                  {selectedExp.curatedDetails.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#C5A880] mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Inquiry Form */}
              <div className="pt-4 border-t border-[#C5A880]/20">
                {inquirySuccess ? (
                  <div className="p-4 rounded bg-[#142F26] border border-[#C5A880]/30 text-center space-y-2">
                    <p className="font-serif text-lg text-[#FDFBF7]">
                      Inquiry Received
                    </p>
                    <p className="text-xs text-[#F7F4EE]/80">
                      Our Head Concierge will contact you to coordinate this private experience during your stay.
                    </p>
                    <button
                      onClick={handleCloseModal}
                      className="mt-2 px-4 py-1.5 text-xs uppercase tracking-wider text-[#0E231C] bg-[#C5A880] rounded"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-3">
                    <span className="block text-xs uppercase tracking-wider text-[#C5A880] font-medium">
                      Reserve this Experience with Concierge
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Your Full Name"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="bg-[#091713] border border-[#C5A880]/25 rounded px-3 py-2 text-xs text-[#F7F4EE] focus:border-[#C5A880] focus:outline-none placeholder:text-white/30"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Phone or Email"
                        value={guestContact}
                        onChange={(e) => setGuestContact(e.target.value)}
                        className="bg-[#091713] border border-[#C5A880]/25 rounded px-3 py-2 text-xs text-[#F7F4EE] focus:border-[#C5A880] focus:outline-none placeholder:text-white/30"
                      />
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <a
                        href={`https://wa.me/${RESORT_INFO.whatsAppNumber}?text=Hello%20Aranya%20Grand%20Retreat%2C%20I%20would%20like%20to%20enquire%20about%20the%20${encodeURIComponent(selectedExp.title)}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#C5A880] hover:underline flex items-center gap-1"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Instant WhatsApp Enquiry</span>
                      </a>
                      <button
                        type="submit"
                        className="px-5 py-2 text-xs uppercase tracking-wider font-semibold text-[#0E231C] bg-[#C5A880] hover:bg-[#D4B886] rounded-sm transition-all"
                      >
                        Request Experience
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
