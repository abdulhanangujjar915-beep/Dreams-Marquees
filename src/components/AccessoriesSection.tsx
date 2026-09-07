import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { ACCESSORIES_CATALOG } from '../data/marqueesData';

interface AccessoriesSectionProps {
  onBookWithAccessory: (accessoryId: string) => void;
}

export const AccessoriesSection: React.FC<AccessoriesSectionProps> = ({ onBookWithAccessory }) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const tabs = [
    { id: 'all', label: 'All Equipment' },
    { id: 'linings', label: 'Linings & Drapes' },
    { id: 'lighting', label: 'Chandeliers & Lighting' },
    { id: 'flooring', label: 'Dance Floors & Parquet' },
    { id: 'heating', label: 'Heating & Climate' },
    { id: 'furniture', label: 'Banqueting Furniture' },
    { id: 'facilities', label: 'Luxury Restrooms' },
  ];

  const filteredAccessories = activeTab === 'all'
    ? ACCESSORIES_CATALOG
    : ACCESSORIES_CATALOG.filter(a => a.category === activeTab);

  return (
    <section id="accessories" className="py-20 bg-[#fdfcf8] border-b border-[#1a1a1a]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 pb-1 border-b border-[#c5a059] text-[#c5a059] text-xs font-bold uppercase tracking-[2.5px] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Atmospheric Transformations</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1a1a1a] tracking-tight">
            Interiors, Lighting & Luxury Accoutrements
          </h2>
          <p className="mt-4 text-stone-600 text-base sm:text-lg font-light leading-relaxed">
            A marquee is an architectural canvas. From fiber-optic starlight dance floors to indirect thermostatic heating and gold Chiavari banqueting suites, we deliver complete turnkey luxury.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-[2px] transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#1a1a1a] text-[#c5a059] border border-[#1a1a1a] shadow-[4px_4px_0px_#c5a059]'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-[#1a1a1a]/15'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accessories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAccessories.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#1a1a1a]/15 shadow-none hover:shadow-[8px_8px_0px_#c5a059] transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-48 bg-stone-900 overflow-hidden border-b border-[#1a1a1a]/10">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                {item.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1 bg-[#1a1a1a] text-white text-[10px] font-bold uppercase tracking-[2px] border border-[#c5a059]/40">
                    {item.badge}
                  </span>
                )}
                <div className="absolute bottom-3 right-3 px-3 py-1 bg-[#1a1a1a] border border-[#c5a059]/40 text-white text-xs font-bold font-mono">
                  £{item.price} <span className="text-[10px] text-stone-400 font-sans font-normal">/{item.unit}</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-normal text-lg text-[#1a1a1a] mb-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed mb-5 font-light">
                    {item.description}
                  </p>
                </div>

                <button
                  onClick={() => onBookWithAccessory(item.id)}
                  className="w-full py-3 px-4 border border-[#1a1a1a] hover:bg-[#1a1a1a] text-[#1a1a1a] hover:text-[#c5a059] font-bold text-xs uppercase tracking-[2px] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Include in Online Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
