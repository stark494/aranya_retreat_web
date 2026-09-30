import React from 'react';
import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/retreatData';
import { CinematicSectionHeader } from './MotionReveal';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 lg:py-32 bg-[#091713] text-[#F7F4EE] relative border-t border-[#C5A880]/15">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header with Cinematic Staggered Fade-in */}
        <CinematicSectionHeader
          align="center"
          kicker="Guest Chronicles"
          title="Words of Reverence"
          subtitle="(Curated Fictional Guest Reflections for Portfolio Demonstration)"
          className="mb-16"
        />

        {/* 3 Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-[#0E231C] border border-[#C5A880]/20 p-8 rounded-sm flex flex-col justify-between hover:border-[#C5A880]/40 transition-all duration-300 relative shadow-lg"
            >
              <div>
                <Quote className="w-8 h-8 text-[#C5A880]/30 mb-6" />
                <p className="font-serif text-base sm:text-lg text-[#F7F4EE]/90 leading-relaxed font-light italic mb-8">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-[#C5A880]/15">
                <span className="font-serif text-lg text-[#FDFBF7] block font-normal">
                  {t.author}
                </span>
                <span className="text-xs text-[#C5A880] block mt-0.5 font-medium">
                  {t.role} · {t.city}
                </span>
                <span className="text-[11px] text-[#F7F4EE]/50 block mt-1">
                  {t.occasion} · {t.stayDate}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
