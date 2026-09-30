import React from 'react';
import { ArrowUpRight, Compass, Shield, Sparkles, HeartHandshake } from 'lucide-react';
import { motion, useReducedMotion, type Variants } from 'motion/react';

const CINEMATIC_EASE = [0.16, 1, 0.3, 1] as const;

interface EditorialIntroProps {
  onExploreStay: () => void;
  onExploreWeddings: () => void;
}

export const EditorialIntro: React.FC<EditorialIntroProps> = ({ onExploreStay, onExploreWeddings }) => {
  const shouldReduceMotion = useReducedMotion();

  const titleStagger: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.16,
      },
    },
  };

  const itemFade: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.85,
        ease: CINEMATIC_EASE,
      },
    },
  };

  const pillars = [
    {
      num: '01',
      title: 'Mewar Architecture Reimagined',
      description: 'Chiselled locally from warm Rajasthani sandstone, our colonnades and contemporary jharokhas honor centuries of royal Mewari masonry while opening outward to light, water, and unbroken mountain horizons.',
      icon: Compass,
    },
    {
      num: '02',
      title: 'Aravali Sanctuary & Lake Stillness',
      description: 'Perched on the tranquil banks of Lake Badi—away from urban bustle—the retreat is embraced by 45 acres of indigenous forest, flowering frangipani, and water mirrors that capture every shift in sunlight.',
      icon: Sparkles,
    },
    {
      num: '03',
      title: 'Anticipatory Royal Hospitality',
      description: 'Rooted in the timeless Indian ethos of Atithi Devo Bhava, service at Aranya is attentive yet unseen. Your palace butler crafts private moments with effortless discretion and profound warmth.',
      icon: HeartHandshake,
    },
    {
      num: '04',
      title: 'Seclusion for Unforgettable Celebrations',
      description: 'Whether gathering two hundred loved ones for a multi-day wedding celebration or slipping away for an anniversary, our gated grounds guarantee absolute privacy and bespoke attention.',
      icon: Shield,
    },
  ];

  return (
    <section id="about" className="py-24 lg:py-32 bg-[#091713] text-[#F7F4EE] relative overflow-hidden">
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-[#C5A880]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-48 w-96 h-96 bg-[#1F4538]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Editorial Top Lockup with Framer Motion Stagger */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          <motion.div
            variants={titleStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-6"
          >
            <motion.span
              variants={itemFade}
              className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium block mb-3"
            >
              The Aranya Philosophy
            </motion.span>
            <motion.h2
              variants={itemFade}
              className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#FDFBF7] tracking-tight leading-[1.12]"
            >
              Arrive somewhere <br />
              <span className="italic text-[#E4D6C1]">extraordinary.</span>
            </motion.h2>
          </motion.div>

          <div className="lg:col-span-6 space-y-6 text-[#F7F4EE]/80 text-base sm:text-lg font-light leading-relaxed">
            <p>
              Udaipur has always commanded a unique place in the imagination of travellers—a kingdom of water, stone, and poetic chivalry. At Aranya Grand Retreat, we set out to craft a contemporary counterpoint to traditional palace hotels: an intimate lakeside sanctuary where Rajasthan’s living soul meets effortless modern elegance.
            </p>
            <p className="text-sm sm:text-base text-[#D0BC9F]">
              Every archway is aligned with the morning sun; every private pool overlooks the ripple of Lake Badi; and every celebration is treated as an enduring work of art.
            </p>
            <div className="pt-2 flex items-center gap-6">
              <button
                onClick={onExploreStay}
                className="text-xs uppercase tracking-widest text-[#C5A880] hover:text-[#FDFBF7] transition-colors flex items-center gap-1.5 font-semibold group"
              >
                <span>View Accommodations</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <span className="text-[#C5A880]/30">|</span>
              <button
                onClick={onExploreWeddings}
                className="text-xs uppercase tracking-widest text-[#FDFBF7] hover:text-[#C5A880] transition-colors flex items-center gap-1.5 font-semibold group"
              >
                <span>Weddings at Aranya</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 4 Editorial Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-12 border-t border-[#C5A880]/20">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.num}
                className="p-6 rounded-sm bg-[#0E231C]/60 border border-[#C5A880]/15 hover:border-[#C5A880]/40 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-2xl text-[#C5A880] font-light">
                      {pillar.num}
                    </span>
                    <Icon className="w-5 h-5 text-[#C5A880]/60 group-hover:text-[#C5A880] transition-colors" />
                  </div>
                  <h3 className="font-serif text-xl text-[#FDFBF7] font-normal mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#F7F4EE]/70 font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
