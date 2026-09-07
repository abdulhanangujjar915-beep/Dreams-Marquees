import React, { useState } from 'react';
import { Calendar, Shield, MapPin, Sparkles, Wind, CheckCircle2, ArrowRight } from 'lucide-react';
import heroImg from '../assets/images/hero_luxury_marquee_1788778625292.jpg';
import { COMPANY_DETAILS } from '../data/marqueesData';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenPlanner: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenPlanner }) => {
  const [quickEventType, setQuickEventType] = useState('Wedding Reception');
  const [quickCapacity, setQuickCapacity] = useState('150 - 250 Guests');
  const [quickDate, setQuickDate] = useState('Next Available Weekend');

  return (
    <section className="relative bg-[#fdfcf8] text-[#1a1a1a] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#1a1a1a]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Top Kicker & Coordinates */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-8 border-b border-[#1a1a1a]/15 text-[11px] uppercase tracking-[2px]">
          <div className="flex items-center gap-2 font-bold text-[#c5a059]">
            <span className="w-2 h-2 bg-[#c5a059] inline-block" />
            <span>Luxury Outdoor Architecture & Pavilion Hire</span>
          </div>
          <div className="text-stone-500 font-mono flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Slough SL2 1LU • Plus Code: {COMPANY_DETAILS.plusCode}</span>
          </div>
        </div>

        {/* Main Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          
          {/* Left Column: Monumental Editorial Typography & Booking Card */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[0.92] text-[#1a1a1a] tracking-tight mb-6">
                Ethereal Spaces, <br />
                <span className="italic font-normal text-[#1a1a1a]">Grounded</span> in Quality.
              </h1>

              <p className="text-stone-600 text-base sm:text-lg max-w-xl leading-relaxed mb-8 font-light">
                Premier marquee architecture for bespoke weddings and executive corporate galas in Slough, Windsor, and across Berkshire. Engineered for 70 mph British weather, tailored for the editorial eye.
              </p>
            </div>

            {/* Editorial Booking Card */}
            <div className="bg-white border border-[#1a1a1a]/15 p-6 sm:p-8 shadow-[8px_8px_0px_#c5a059] transition-all">
              <div className="flex items-center justify-between pb-3 mb-5 border-b border-[#1a1a1a]/10">
                <span className="text-[11px] font-bold uppercase tracking-[2px] text-[#c5a059]">
                  Fast Reservation & Quote Request
                </span>
                <span className="text-[10px] uppercase tracking-[1.5px] font-mono text-stone-500">
                  Slough Depot Priority
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div className="border-b border-[#1a1a1a]/15 pb-2">
                  <label className="text-[10px] font-bold text-[#c5a059] uppercase tracking-[2px] block mb-1">
                    Event Type
                  </label>
                  <select
                    value={quickEventType}
                    onChange={(e) => setQuickEventType(e.target.value)}
                    className="w-full bg-transparent font-serif text-base text-[#1a1a1a] font-medium outline-none cursor-pointer"
                  >
                    <option value="Wedding Reception">Wedding Reception</option>
                    <option value="Corporate Gala">Corporate Gala & Awards</option>
                    <option value="Private Garden Party">Private Garden Party</option>
                    <option value="Asian Wedding & Mehndi">Asian Wedding & Mehndi</option>
                    <option value="Product Launch">Brand / Product Launch</option>
                  </select>
                </div>

                <div className="border-b border-[#1a1a1a]/15 pb-2">
                  <label className="text-[10px] font-bold text-[#c5a059] uppercase tracking-[2px] block mb-1">
                    Guest Capacity
                  </label>
                  <select
                    value={quickCapacity}
                    onChange={(e) => setQuickCapacity(e.target.value)}
                    className="w-full bg-transparent font-serif text-base text-[#1a1a1a] font-medium outline-none cursor-pointer"
                  >
                    <option value="50 - 100 Guests">50 – 100 Guests</option>
                    <option value="150 - 250 Guests">150 – 250 Guests</option>
                    <option value="300 - 450+ Guests">300 – 450+ Guests</option>
                    <option value="VIP Intimate (< 50)">VIP Intimate (&lt; 50)</option>
                  </select>
                </div>
              </div>

              <div className="border-b border-[#1a1a1a]/15 pb-2 mb-6">
                <label className="text-[10px] font-bold text-[#c5a059] uppercase tracking-[2px] block mb-1">
                  Delivery Region / Postcode
                </label>
                <div className="flex items-center justify-between">
                  <span className="font-serif text-base text-[#1a1a1a]">
                    Slough & Berkshire (SL1, SL2, SL4, UB, RG)
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                    Free Delivery in SL2
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  id="hero-instant-booking-btn"
                  onClick={onOpenBooking}
                  className="flex-1 bg-[#1a1a1a] hover:bg-[#c5a059] text-white hover:text-[#1a1a1a] py-4 px-6 text-xs font-bold uppercase tracking-[2px] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Secure Your Marquee Date</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="hero-open-planner-btn"
                  onClick={onOpenPlanner}
                  className="border border-[#1a1a1a] hover:bg-[#1a1a1a] text-[#1a1a1a] hover:text-white py-4 px-5 text-xs font-bold uppercase tracking-[2px] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Space Planner</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Visual Pane */}
          <div className="lg:col-span-5 relative flex flex-col min-h-[440px] lg:min-h-[580px] bg-stone-900 border border-[#1a1a1a]/15 overflow-hidden group">
            {/* Visual Image */}
            <img
              src={heroImg}
              alt="Dreams Marquees Grand Imperial Clear-Span Pavilion"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />

            {/* Subtle editorial photo gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/90 via-[#1a1a1a]/30 to-transparent" />

            {/* Editorial Top Right Tag */}
            <div className="absolute top-5 right-5 bg-[#1a1a1a] text-white border border-[#c5a059]/40 px-4 py-2 text-[10px] tracking-[2px] uppercase font-bold shadow-md">
              Collection Series 01
            </div>

            {/* Bottom Architectural Caption */}
            <div className="relative mt-auto p-6 sm:p-8 text-white">
              <div className="text-[10px] uppercase tracking-[2px] text-[#c5a059] font-bold mb-1">
                Featured Flagship Structure
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl italic font-normal tracking-tight text-white mb-1">
                The Grand Imperial Clear-Span
              </h3>
              <div className="text-[11px] uppercase tracking-[1.5px] text-stone-300 flex items-center gap-2">
                <MapPin className="w-3 h-3 text-[#c5a059]" />
                <span>213 Northern Rd, Slough SL2 1LU • Berkshire Reach</span>
              </div>
            </div>
          </div>

        </div>

        {/* Editorial Standards & Specifications Footer Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 mt-12 border-t border-[#1a1a1a]/15 text-[#1a1a1a]">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[1.5px] text-[#1a1a1a]">
              <Wind className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>70 MPH Wind Rated</span>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed font-light">
              Fully certified to British Standard BS EN 13782 for extreme weather safety.
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[1.5px] text-[#1a1a1a]">
              <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Silk Draped Interiors</span>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed font-light">
              Pleated ivory roof linings, starlight LED skies, and Austrian swags.
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[1.5px] text-[#1a1a1a]">
              <Shield className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>100% Watertight</span>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed font-light">
              Heavy 850g/m² flame-retardant PVC with exterior indirect heating.
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[1.5px] text-[#1a1a1a]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Free Slough Survey</span>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed font-light">
              Engineers conduct laser ground leveling and site assessments.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
