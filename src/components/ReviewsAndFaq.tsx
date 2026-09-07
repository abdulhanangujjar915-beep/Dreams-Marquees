import React, { useState } from 'react';
import { Star, ChevronDown, ChevronUp } from 'lucide-react';
import { TESTIMONIALS } from '../data/marqueesData';

export const ReviewsAndFaq: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How durable are Dreams Marquees against extreme British rain and strong wind?',
      a: 'All our structures are commercial-grade, engineered and certified to British Standard BS EN 13782 to withstand storm gusts up to 70 mph (110 km/h). Our heavy-duty 850g/m² PVC covers are 100% waterproof, flame-retardant (BS 7837), and UV-stabilized. We also supply heavy-duty guttering systems and anchored tie-down ratchet straps.'
    },
    {
      q: 'Can a marquee be installed on concrete, tarmac, or a patio instead of grass?',
      a: 'Yes, absolutely. While grass allows us to drive 1-metre steel ground stakes, on hard standing (tarmac, concrete car parks, block paving, stone patios), we use certified heavy concrete/water ballast weights (up to 1,000kg per leg) and rubber friction pads. No drilling into your ground is required.'
    },
    {
      q: 'Do you offer heating for winter or evening outdoor events?',
      a: 'Yes. We supply thermostatically controlled indirect diesel space heaters (such as Arcotherm EC55/EC85 units). The heater sits discreetly outside the tent and pumps dry, 100% fume-free warm air into the marquee via insulated ducting, keeping your guests toasty warm even in freezing winter conditions.'
    },
    {
      q: 'How far in advance should we book our wedding or corporate marquee?',
      a: 'Peak wedding season (May to September) books up fast, so we recommend reserving 3 to 9 months in advance. However, with our extensive Slough depot fleet, we can also accommodate short-notice corporate emergencies or last-minute garden parties with just 48 hours notice subject to stock.'
    },
    {
      q: 'How long does marquee assembly and dismantling take?',
      a: 'A standard clear-span marquee for 100-150 guests typically takes 4 to 6 hours for our certified rigging team to erect, drape, carpet, and light. For weekend weddings, we typically set up on Wednesday or Thursday and take down on Monday or Tuesday, giving you ample time for decorating and florist setup.'
    }
  ];

  return (
    <section id="faq" className="py-20 bg-[#fdfcf8] border-b border-[#1a1a1a]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Testimonials */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 pb-1 border-b border-[#c5a059] text-[#c5a059] text-xs font-bold uppercase tracking-[2.5px] mb-3">
              <Star className="w-3.5 h-3.5 fill-[#c5a059] text-[#c5a059]" />
              <span>Patron Endorsements</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1a1a1a] tracking-tight">
              Trusted Across Berkshire & The Thames Valley
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="p-7 bg-white border border-[#1a1a1a]/15 shadow-[8px_8px_0px_#c5a059] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#c5a059] mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#c5a059] text-[#c5a059]" />
                    ))}
                  </div>
                  <p className="font-serif text-stone-800 text-base leading-relaxed mb-6 italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="border-t border-[#1a1a1a]/10 pt-4">
                  <span className="font-bold text-xs uppercase tracking-wider text-[#1a1a1a] block">{t.clientName}</span>
                  <span className="text-[11px] text-[#c5a059] font-semibold uppercase tracking-wider block mt-0.5">{t.eventType}</span>
                  <span className="text-[11px] text-stone-500 font-mono block mt-0.5">{t.location} • {t.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto pt-8 border-t border-[#1a1a1a]/15">
          <div className="text-center mb-10">
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1a1a1a]">
              Frequently Asked Enquiries
            </h3>
            <p className="text-stone-600 text-sm mt-1 font-light">
              Essential details regarding marquee rigging, engineering compliance, and hiring logistics.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-[#1a1a1a]/20 bg-white transition-all shadow-none hover:border-[#1a1a1a]"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-base sm:text-lg text-[#1a1a1a] cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#c5a059] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-stone-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-stone-600 leading-relaxed border-t border-[#1a1a1a]/10 font-light">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
