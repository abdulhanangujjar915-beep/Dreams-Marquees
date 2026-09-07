import React, { useState } from 'react';
import { Users, Wind, ArrowRight, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { MARQUEES_CATALOG } from '../data/marqueesData';
import { MarqueeItem } from '../types';
import { MarqueeDetailModal } from './MarqueeDetailModal';

interface MarqueeCatalogProps {
  onBookMarquee: (marqueeId: string) => void;
}

export const MarqueeCatalog: React.FC<MarqueeCatalogProps> = ({ onBookMarquee }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeMarqueeModal, setActiveMarqueeModal] = useState<MarqueeItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Luxury Marquees' },
    { id: 'wedding', label: 'Weddings & Receptions' },
    { id: 'corporate', label: 'Corporate & Galas' },
    { id: 'pagoda', label: 'Pagoda High-Peaks' },
    { id: 'stretch', label: 'Bedouin Stretch Tents' }
  ];

  const filteredMarquees = selectedCategory === 'all'
    ? MARQUEES_CATALOG
    : MARQUEES_CATALOG.filter(m => m.category === selectedCategory);

  return (
    <section id="marquees" className="py-20 bg-[#fdfcf8] border-b border-[#1a1a1a]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 pb-1 border-b border-[#c5a059] text-[#c5a059] text-xs font-bold uppercase tracking-[2.5px] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>The Fleet Portfolio</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1a1a1a] tracking-tight">
            Our Luxury Marquees Collection
          </h2>
          <p className="mt-4 text-stone-600 text-base sm:text-lg font-light leading-relaxed">
            From modern clear-span ballrooms to traditional timber pole marquees, each structure is engineered for maximum aesthetic grandeur, weather resilience, and comfort.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`filter-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2 text-xs font-bold uppercase tracking-[2px] transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#1a1a1a] text-[#c5a059] border border-[#1a1a1a] shadow-[4px_4px_0px_#c5a059]'
                    : 'bg-white text-[#1a1a1a] hover:bg-stone-100 border border-[#1a1a1a]/15'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Marquees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMarquees.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#1a1a1a]/15 shadow-none hover:shadow-[8px_8px_0px_#c5a059] transition-all duration-300 flex flex-col group"
            >
              {/* Image Preview with Hover Zoom */}
              <div className="relative h-64 overflow-hidden bg-stone-900 border-b border-[#1a1a1a]/10">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-80" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="px-3 py-1 bg-[#1a1a1a] text-white text-[10px] font-bold uppercase tracking-[2px] border border-[#c5a059]/40">
                    {item.category}
                  </span>
                  <span className="px-2.5 py-1 bg-[#1a1a1a]/90 text-stone-200 text-[10px] uppercase tracking-wider font-semibold flex items-center gap-1">
                    <Wind className="w-3 h-3 text-[#c5a059]" />
                    {item.specifications.windResistance}
                  </span>
                </div>

                {/* Price pill */}
                <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-[#1a1a1a] border border-[#c5a059]/40 text-white">
                  <span className="text-[9px] text-[#c5a059] block uppercase tracking-[1.5px] font-bold">Rates From</span>
                  <div className="font-serif font-bold text-white text-base leading-none">
                    £{item.basePricePerDay} <span className="text-[10px] text-stone-400 font-sans font-normal">/ day</span>
                  </div>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-normal text-[#1a1a1a] mb-2 group-hover:text-[#c5a059] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed font-light">
                    {item.headline}
                  </p>

                  {/* Key Capacity Chips */}
                  <div className="grid grid-cols-2 gap-2 py-3 border-y border-[#1a1a1a]/10 mb-4 bg-stone-50 px-3">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#c5a059] shrink-0" />
                      <div>
                        <span className="text-[9px] text-stone-500 uppercase tracking-wider block font-bold">Seated Dining</span>
                        <span className="text-xs font-serif font-bold text-[#1a1a1a]">Up to {item.capacitySeated}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#c5a059] shrink-0" />
                      <div>
                        <span className="text-[9px] text-stone-500 uppercase tracking-wider block font-bold">Standing</span>
                        <span className="text-xs font-serif font-bold text-[#1a1a1a]">Up to {item.capacityStanding}</span>
                      </div>
                    </div>
                  </div>

                  {/* Highlight Bullets */}
                  <ul className="space-y-1.5 mb-6 text-xs text-stone-600">
                    {item.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Actions */}
                <div className="space-y-2 pt-2">
                  <button
                    id={`book-marquee-${item.id}`}
                    onClick={() => onBookMarquee(item.id)}
                    className="w-full py-3 px-4 bg-[#1a1a1a] hover:bg-[#c5a059] text-white hover:text-[#1a1a1a] font-bold text-xs uppercase tracking-[2px] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>Instant Online Booking</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    id={`view-specs-${item.id}`}
                    onClick={() => setActiveMarqueeModal(item)}
                    className="w-full py-2.5 px-4 border border-[#1a1a1a]/20 hover:bg-[#1a1a1a]/5 text-[#1a1a1a] font-semibold text-xs uppercase tracking-[1.5px] transition-colors cursor-pointer"
                  >
                    Specifications & Dimensions
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {activeMarqueeModal && (
        <MarqueeDetailModal
          marquee={activeMarqueeModal}
          onClose={() => setActiveMarqueeModal(null)}
          onBookThis={(id) => {
            setActiveMarqueeModal(null);
            onBookMarquee(id);
          }}
        />
      )}
    </section>
  );
};
