import React from 'react';
import { Sparkles, Briefcase, Heart, Shield, Check, Wind, Flame, Thermometer } from 'lucide-react';
import weddingInteriorImg from '../assets/images/wedding_interior_1788778642079.jpg';
import corporateImg from '../assets/images/corporate_marquee_1788778658479.jpg';

interface CorporateAndWeddingsProps {
  onOpenBooking: () => void;
}

export const CorporateAndWeddings: React.FC<CorporateAndWeddingsProps> = ({ onOpenBooking }) => {
  return (
    <section id="weddings-corporate" className="py-20 bg-[#fdfcf8] border-b border-[#1a1a1a]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 pb-1 border-b border-[#c5a059] text-[#c5a059] text-xs font-bold uppercase tracking-[2.5px] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Editorial Environments</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1a1a1a] tracking-tight">
            Curated for Weddings & Corporate Galas
          </h2>
          <p className="mt-4 text-stone-600 text-base sm:text-lg font-light leading-relaxed">
            Whether an opulent English country wedding or an executive brand pavilion, our structures deliver unmatched aesthetic prestige backed by commercial architectural engineering.
          </p>
        </div>

        {/* 1. Luxury Weddings Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-[#c5a059] font-bold text-[10px] uppercase tracking-[2px] border-b border-[#c5a059] pb-0.5">
              <Heart className="w-3.5 h-3.5 fill-[#c5a059] text-[#c5a059]" />
              <span>Bespoke Nuptial Architecture</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#1a1a1a] leading-tight">
              Breathtaking Ambiance for Your Most Cherished Day
            </h3>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-light">
              We transform any estate lawn, private estate garden, or historic manor grounds into a fairytale ballroom. Every wedding marquee features gathered ivory silk pleated swags, floating starlight ceiling canopies, crystal drop chandeliers, and customizable bridal stages.
            </p>

            <ul className="space-y-3 text-sm text-stone-700">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <span><strong className="text-[#1a1a1a]">Starlight LED Canopies:</strong> Twinkling fiber-optic night skies suspended over the dance floor.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <span><strong className="text-[#1a1a1a]">Laser-Leveled Subflooring:</strong> Complete barrier against damp grass, heels sinking, and cold ground.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <span><strong className="text-[#1a1a1a]">Asian & Multicultural Banqueting:</strong> Vast multi-span spaces tailored for 100 to 500+ guests with specialized staging for Mandaps & catering kitchens.</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3.5 bg-[#1a1a1a] hover:bg-[#c5a059] text-white hover:text-[#1a1a1a] font-bold text-xs uppercase tracking-[2px] shadow-sm transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>Plan Your Wedding Marquee</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="border border-[#1a1a1a]/20 shadow-[10px_10px_0px_#c5a059] overflow-hidden bg-white">
              <img
                src={weddingInteriorImg}
                alt="Dreams Marquees Wedding Interior with Chandeliers"
                className="w-full h-[420px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Editorial Caption Tag */}
            <div className="absolute bottom-4 left-4 bg-[#1a1a1a] text-white p-3 border border-[#c5a059]/40 max-w-xs shadow-md">
              <div className="text-[10px] text-[#c5a059] uppercase tracking-[1.5px] font-bold">
                Bridal Atmosphere
              </div>
              <p className="text-[11px] text-stone-300 font-light mt-0.5">
                100% Watertight with climate-controlled thermostatic indirect heating.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Corporate Functions Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8">
          <div className="lg:col-span-6 order-2 lg:order-1 relative">
            <div className="border border-[#1a1a1a]/20 shadow-[10px_10px_0px_#c5a059] overflow-hidden bg-white">
              <img
                src={corporateImg}
                alt="Corporate Marquee Pavilion with Glass Facades"
                className="w-full h-[420px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Editorial Caption Tag */}
            <div className="absolute bottom-4 left-4 bg-[#1a1a1a] text-white p-3 border border-[#c5a059]/40 max-w-xs shadow-md">
              <div className="text-[10px] text-[#c5a059] uppercase tracking-[1.5px] font-bold">
                Commercial Standards
              </div>
              <p className="text-[11px] text-stone-300 font-light mt-0.5">
                Acoustic ceiling drapes, lockable glass doors, and heavy AV rig support.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 text-[#c5a059] font-bold text-[10px] uppercase tracking-[2px] border-b border-[#c5a059] pb-0.5">
              <Briefcase className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Executive Architecture</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#1a1a1a] leading-tight">
              Architectural Glass Pavilions for Corporate Excellence
            </h3>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-light">
              We serve Fortune 500 enterprises, tech parks across the Slough Trading Estate, Thames Valley business hubs, and Heathrow event coordinators. Our commercial marquees deliver crisp brand visibility, acoustic sound dampening, and executive hospitality finishes.
            </p>

            <ul className="space-y-3 text-sm text-stone-700">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <span><strong className="text-[#1a1a1a]">Tempered Safety Glass Walling:</strong> Solid panoramic walls providing thermal insulation and modern architectural aesthetics.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <span><strong className="text-[#1a1a1a]">Integrated Cable & AV Ducting:</strong> Concealed channels for projectors, LED video walls, sound systems, and 3-phase power.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <span><strong className="text-[#1a1a1a]">CDM 2015 & Health & Safety Compliant:</strong> Full RAMS, structural engineer calculations, fire certificates, and £10M Public Liability insurance.</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3.5 bg-[#1a1a1a] hover:bg-[#c5a059] text-white hover:text-[#1a1a1a] font-bold text-xs uppercase tracking-[2px] shadow-sm transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>Request Corporate Proposal</span>
              </button>
            </div>
          </div>
        </div>

        {/* Durability & Engineering Assurance Banner */}
        <div className="bg-[#1a1a1a] text-white p-8 sm:p-12 border border-[#1a1a1a] shadow-[12px_12px_0px_#c5a059]">
          <div className="max-w-3xl mb-10 pb-6 border-b border-stone-800">
            <span className="text-[#c5a059] font-bold text-xs uppercase tracking-[2.5px] block mb-2">
              Architectural Structural Integrity
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white">
              Engineered for the British Climate & Rigorous Safety
            </h3>
            <p className="text-stone-400 text-sm sm:text-base mt-2 font-light">
              Dreams Marquees structures are manufactured from commercial extruded 6061/T6 aircraft-grade aluminum profiles and heavy 850g/m² waterproof tensile PVC membranes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 bg-stone-900 border border-stone-800">
              <Wind className="w-6 h-6 text-[#c5a059] mb-3" />
              <h4 className="font-serif font-bold text-white text-base">70 MPH Wind Rated</h4>
              <p className="text-xs text-stone-400 mt-1 font-light leading-relaxed">
                Engineered to British Standard BS EN 13782 to endure storm rainfall and heavy gusts.
              </p>
            </div>

            <div className="p-5 bg-stone-900 border border-stone-800">
              <Flame className="w-6 h-6 text-[#c5a059] mb-3" />
              <h4 className="font-serif font-bold text-white text-base">BS 7837 Flame Retardant</h4>
              <p className="text-xs text-stone-400 mt-1 font-light leading-relaxed">
                Full UK fire-safety compliance certification on all roof canvases and wall drapes.
              </p>
            </div>

            <div className="p-5 bg-stone-900 border border-stone-800">
              <Thermometer className="w-6 h-6 text-[#c5a059] mb-3" />
              <h4 className="font-serif font-bold text-white text-base">Thermostatic Heating</h4>
              <p className="text-xs text-stone-400 mt-1 font-light leading-relaxed">
                External indirect space heaters duct fresh warm dry air inside silently.
              </p>
            </div>

            <div className="p-5 bg-stone-900 border border-stone-800">
              <Shield className="w-6 h-6 text-[#c5a059] mb-3" />
              <h4 className="font-serif font-bold text-white text-base">£10M Public Liability</h4>
              <p className="text-xs text-stone-400 mt-1 font-light leading-relaxed">
                Complete venue insurance coverage and certified professional rigging crews.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
