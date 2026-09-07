import React, { useState, useMemo } from 'react';
import { 
  Ruler, 
  Users, 
  Sparkles, 
  Music, 
  Wine, 
  Utensils, 
  ArrowRight,
  Info,
  Maximize2
} from 'lucide-react';
import { MARQUEES_CATALOG } from '../data/marqueesData';

interface SizePlannerProps {
  onSelectSetupForBooking: (params: {
    marqueeId: string;
    guestCount: number;
    recommendedSize: string;
    includeDanceFloor: boolean;
    includeBar: boolean;
    includeStage: boolean;
  }) => void;
}

export const SizePlanner: React.FC<SizePlannerProps> = ({ onSelectSetupForBooking }) => {
  const [guests, setGuests] = useState<number>(120);
  const [layoutStyle, setLayoutStyle] = useState<'seated_round' | 'seated_trestle' | 'standing_cocktail'>('seated_round');
  const [includeDanceFloor, setIncludeDanceFloor] = useState<boolean>(true);
  const [includeBar, setIncludeBar] = useState<boolean>(true);
  const [includeStage, setIncludeStage] = useState<boolean>(true);
  const [includeBuffet, setIncludeBuffet] = useState<boolean>(true);

  // Mathematical space calculation
  const calculations = useMemo(() => {
    let baseAreaPerGuest = 1.4; // square meters for seated rounds
    if (layoutStyle === 'seated_trestle') baseAreaPerGuest = 1.1;
    if (layoutStyle === 'standing_cocktail') baseAreaPerGuest = 0.75;

    let diningArea = guests * baseAreaPerGuest;
    let danceFloorArea = includeDanceFloor ? Math.max(25, Math.round(guests * 0.28)) : 0;
    let barArea = includeBar ? 18 : 0;
    let stageArea = includeStage ? 20 : 0;
    let buffetArea = includeBuffet ? 18 : 0;
    let circulationMargin = 1.15; // 15% aisle and fire corridor allowance

    const totalAreaM2 = Math.round((diningArea + danceFloorArea + barArea + stageArea + buffetArea) * circulationMargin);
    const totalAreaSqFt = Math.round(totalAreaM2 * 10.764);

    // Recommend ideal marquee dimensions
    let recommendedDimensions = '9m x 15m (135 m²)';
    let recommendedMarqueeId = 'grand-clearspan-wedding';

    if (totalAreaM2 <= 60) {
      recommendedDimensions = '6m x 10m (60 m²)';
      recommendedMarqueeId = 'crown-oriental-pagoda-suite';
    } else if (totalAreaM2 <= 110) {
      recommendedDimensions = '9m x 12m (108 m²)';
      recommendedMarqueeId = 'grand-clearspan-wedding';
    } else if (totalAreaM2 <= 165) {
      recommendedDimensions = '9m x 18m (162 m²)';
      recommendedMarqueeId = 'grand-clearspan-wedding';
    } else if (totalAreaM2 <= 260) {
      recommendedDimensions = '12m x 21m (252 m²)';
      recommendedMarqueeId = 'grand-clearspan-wedding';
    } else if (totalAreaM2 <= 380) {
      recommendedDimensions = '15m x 24m (360 m²)';
      recommendedMarqueeId = 'regency-glass-pavilion';
    } else {
      recommendedDimensions = '15m x 30m+ (450+ m²)';
      recommendedMarqueeId = 'grand-clearspan-wedding';
    }

    const matchedMarquee = MARQUEES_CATALOG.find(m => m.id === recommendedMarqueeId) || MARQUEES_CATALOG[0];
    const roundTablesCount = Math.ceil(guests / 10);

    return {
      diningArea: Math.round(diningArea),
      danceFloorArea,
      barArea,
      stageArea,
      buffetArea,
      totalAreaM2,
      totalAreaSqFt,
      recommendedDimensions,
      matchedMarquee,
      roundTablesCount,
    };
  }, [guests, layoutStyle, includeDanceFloor, includeBar, includeStage, includeBuffet]);

  return (
    <section id="size-planner" className="py-20 bg-[#1a1a1a] text-stone-100 border-b border-stone-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 pb-1 border-b border-[#c5a059] text-[#c5a059] text-xs font-bold uppercase tracking-[2.5px] mb-3">
            <Ruler className="w-3.5 h-3.5" />
            <span>Architectural Drafting Calculator</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight">
            Marquee Space & Capacity Blueprint
          </h2>
          <p className="mt-4 text-stone-400 text-base sm:text-lg font-light">
            Dial in your guest count, dance floor, bar, and staging requirements for an exact mathematical footprint.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-6 bg-stone-900 border border-stone-800 shadow-[8px_8px_0px_#c5a059] p-6 sm:p-8 space-y-7">
            {/* Guest Slider */}
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-stone-800 pb-2">
                <label htmlFor="guest-slider" className="text-xs uppercase tracking-[2px] font-bold text-stone-300 flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#c5a059]" />
                  Expected Guest Count
                </label>
                <span className="text-2xl font-serif font-bold text-[#c5a059]">
                  {guests} <span className="text-xs font-sans text-stone-400 font-normal">Guests</span>
                </span>
              </div>
              <input
                id="guest-slider"
                type="range"
                min="20"
                max="450"
                step="5"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full h-2 bg-stone-800 appearance-none cursor-pointer accent-[#c5a059]"
              />
              <div className="flex justify-between text-[10px] uppercase tracking-wider text-stone-500 mt-2 font-mono">
                <span>Intimate (20)</span>
                <span>Medium (150)</span>
                <span>Grand Gala (450+)</span>
              </div>
            </div>

            {/* Layout Style */}
            <div>
              <label className="text-xs uppercase tracking-[2px] font-bold text-stone-300 block mb-3">
                Seating & Layout Configuration
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setLayoutStyle('seated_round')}
                  className={`p-3.5 border text-left transition-all cursor-pointer ${
                    layoutStyle === 'seated_round'
                      ? 'border-[#c5a059] bg-[#c5a059]/10 text-white shadow-[3px_3px_0px_#c5a059]'
                      : 'border-stone-800 bg-stone-950 text-stone-400 hover:border-stone-700'
                  }`}
                >
                  <div className="text-xs font-bold uppercase tracking-wider text-white mb-1">Round Banquets</div>
                  <div className="text-[11px] text-stone-400 font-light">10 guests/table. Classic luxury wedding arrangement.</div>
                </button>

                <button
                  type="button"
                  onClick={() => setLayoutStyle('seated_trestle')}
                  className={`p-3.5 border text-left transition-all cursor-pointer ${
                    layoutStyle === 'seated_trestle'
                      ? 'border-[#c5a059] bg-[#c5a059]/10 text-white shadow-[3px_3px_0px_#c5a059]'
                      : 'border-stone-800 bg-stone-950 text-stone-400 hover:border-stone-700'
                  }`}
                >
                  <div className="text-xs font-bold uppercase tracking-wider text-white mb-1">Long Trestles</div>
                  <div className="text-[11px] text-stone-400 font-light">Feast-style rows with optimum linear space efficiency.</div>
                </button>

                <button
                  type="button"
                  onClick={() => setLayoutStyle('standing_cocktail')}
                  className={`p-3.5 border text-left transition-all cursor-pointer ${
                    layoutStyle === 'standing_cocktail'
                      ? 'border-[#c5a059] bg-[#c5a059]/10 text-white shadow-[3px_3px_0px_#c5a059]'
                      : 'border-stone-800 bg-stone-950 text-stone-400 hover:border-stone-700'
                  }`}
                >
                  <div className="text-xs font-bold uppercase tracking-wider text-white mb-1">Cocktail & Bar</div>
                  <div className="text-[11px] text-stone-400 font-light">Poseur standing tables with lounge areas.</div>
                </button>
              </div>
            </div>

            {/* Inclusions Checkboxes */}
            <div>
              <label className="text-xs uppercase tracking-[2px] font-bold text-stone-300 block mb-3">
                Key Event Inclusions & Zones
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-center gap-3 p-3 bg-stone-950 border border-stone-800 hover:border-stone-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeDanceFloor}
                    onChange={(e) => setIncludeDanceFloor(e.target.checked)}
                    className="w-4 h-4 text-[#c5a059] bg-stone-800 border-stone-700 accent-[#c5a059]"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Music className="w-3.5 h-3.5 text-[#c5a059]" />
                      Dance Floor
                    </span>
                    <span className="text-stone-400 text-[11px] block">+ ~{calculations.danceFloorArea} m² parquet space</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-stone-950 border border-stone-800 hover:border-stone-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeBar}
                    onChange={(e) => setIncludeBar(e.target.checked)}
                    className="w-4 h-4 text-[#c5a059] bg-stone-800 border-stone-700 accent-[#c5a059]"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Wine className="w-3.5 h-3.5 text-[#c5a059]" />
                      Cocktail Bar
                    </span>
                    <span className="text-stone-400 text-[11px] block">+ 18 m² beverage counter</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-stone-950 border border-stone-800 hover:border-stone-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeStage}
                    onChange={(e) => setIncludeStage(e.target.checked)}
                    className="w-4 h-4 text-[#c5a059] bg-stone-800 border-stone-700 accent-[#c5a059]"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                      Band / DJ Dais
                    </span>
                    <span className="text-stone-400 text-[11px] block">+ 20 m² staging zone</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-stone-950 border border-stone-800 hover:border-stone-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeBuffet}
                    onChange={(e) => setIncludeBuffet(e.target.checked)}
                    className="w-4 h-4 text-[#c5a059] bg-stone-800 border-stone-700 accent-[#c5a059]"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Utensils className="w-3.5 h-3.5 text-[#c5a059]" />
                      Catering Line
                    </span>
                    <span className="text-stone-400 text-[11px] block">+ 18 m² service aisle</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Blueprint & Recommendation Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-stone-900 p-6 sm:p-8 border border-stone-800 shadow-[8px_8px_0px_#c5a059] relative">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-4 border-b border-stone-800">
                <div>
                  <span className="text-[10px] text-[#c5a059] font-bold uppercase tracking-[2px] block">
                    Calculated Architectural Fit
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                    {calculations.recommendedDimensions}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Total Area</span>
                  <span className="font-serif text-xl font-bold text-[#c5a059]">
                    {calculations.totalAreaM2} m² <span className="text-xs font-sans text-stone-400 font-normal">({calculations.totalAreaSqFt} sq ft)</span>
                  </span>
                </div>
              </div>

              {/* Matched Model Card */}
              <div className="flex items-center gap-4 bg-stone-950 p-4 border border-stone-800 mb-6">
                <img
                  src={calculations.matchedMarquee.imageUrl}
                  alt={calculations.matchedMarquee.name}
                  className="w-20 h-20 object-cover border border-stone-700"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="text-[9px] uppercase font-bold text-[#c5a059] tracking-[2px]">
                    Recommended Structure
                  </span>
                  <h4 className="font-serif text-white text-base font-normal">
                    {calculations.matchedMarquee.name}
                  </h4>
                  <p className="text-xs text-stone-400 mt-0.5 line-clamp-1 font-light">
                    {calculations.matchedMarquee.headline}
                  </p>
                  <span className="text-xs font-mono font-bold text-[#c5a059] mt-1 inline-block">
                    Base rate £{calculations.matchedMarquee.basePricePerDay} / day
                  </span>
                </div>
              </div>

              {/* 2D Schematic Floorplan Blueprint Visualizer */}
              <div className="bg-stone-950 p-4 border border-stone-800 mb-6">
                <div className="flex items-center justify-between text-xs text-stone-400 mb-3">
                  <span className="font-bold text-stone-200 uppercase tracking-[1.5px] text-[10px] flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5 text-[#c5a059]" />
                    2D Floorplan Schematic Blueprint
                  </span>
                  <span className="font-mono text-[10px] text-stone-500">Scale: 1:50</span>
                </div>

                <div className="w-full h-48 bg-stone-900 border border-dashed border-stone-700 relative overflow-hidden flex flex-col justify-between p-3">
                  {/* Top: Stage & Head Table */}
                  <div className="flex justify-between items-center">
                    {includeStage ? (
                      <div className="bg-[#c5a059]/20 border border-[#c5a059] px-2.5 py-1 text-[10px] text-[#c5a059] font-bold uppercase tracking-wider">
                        Stage & Audio
                      </div>
                    ) : <div />}
                    <div className="text-[10px] text-stone-500 font-mono">
                      Ridge: {calculations.recommendedDimensions.split(' ')[0]}
                    </div>
                    {includeBar ? (
                      <div className="bg-stone-800 border border-stone-600 px-2.5 py-1 text-[10px] text-stone-200 font-bold uppercase tracking-wider">
                        Cocktail Bar
                      </div>
                    ) : <div />}
                  </div>

                  {/* Middle: Round Tables & Dance Floor */}
                  <div className="flex items-center justify-around py-2">
                    <div className="grid grid-cols-3 gap-1.5">
                      {Array.from({ length: Math.min(6, calculations.roundTablesCount) }).map((_, i) => (
                        <div key={i} className="w-7 h-7 rounded-full border border-[#c5a059]/40 bg-stone-800 flex items-center justify-center text-[9px] text-[#c5a059] font-mono">
                          T{i + 1}
                        </div>
                      ))}
                    </div>

                    {includeDanceFloor && (
                      <div className="w-18 h-18 bg-[#c5a059]/15 border-2 border-dashed border-[#c5a059] flex flex-col items-center justify-center text-center p-1">
                        <Music className="w-3.5 h-3.5 text-[#c5a059]" />
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#c5a059] mt-0.5">Dance</span>
                      </div>
                    )}

                    <div className="grid grid-cols-3 gap-1.5">
                      {Array.from({ length: Math.min(6, Math.max(0, calculations.roundTablesCount - 6)) }).map((_, i) => (
                        <div key={i} className="w-7 h-7 rounded-full border border-[#c5a059]/40 bg-stone-800 flex items-center justify-center text-[9px] text-[#c5a059] font-mono">
                          T{i + 7}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom: Entrance & Buffet */}
                  <div className="flex justify-between items-center border-t border-stone-800 pt-2 text-[10px]">
                    {includeBuffet ? (
                      <div className="bg-stone-800 border border-stone-700 px-2 py-0.5 text-stone-300 font-medium">
                        Buffet Aisle
                      </div>
                    ) : <div />}
                    <div className="border border-stone-700 px-4 py-0.5 text-stone-300 uppercase tracking-widest text-[9px] font-bold bg-stone-950">
                      Walkway Entrance
                    </div>
                    <div className="text-stone-500 font-mono text-[9px]">Emergency Exit</div>
                  </div>
                </div>

                <div className="text-[11px] text-stone-400 mt-2 flex items-center gap-1.5 font-light">
                  <Info className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                  <span>Includes {calculations.roundTablesCount} banqueting tables, peripheral circulation & UK fire corridors.</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                id="apply-planner-to-booking-btn"
                onClick={() => onSelectSetupForBooking({
                  marqueeId: calculations.matchedMarquee.id,
                  guestCount: guests,
                  recommendedSize: calculations.recommendedDimensions,
                  includeDanceFloor,
                  includeBar,
                  includeStage
                })}
                className="w-full py-4 bg-[#c5a059] hover:bg-[#b38d47] text-[#1a1a1a] font-bold text-xs uppercase tracking-[2px] flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
              >
                <span>Book This Recommended Setup Online</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
