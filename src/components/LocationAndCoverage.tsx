import React, { useState } from 'react';
import { MapPin, Navigation, CheckCircle2, Clock, Truck, ShieldCheck, Phone, Search } from 'lucide-react';
import { COMPANY_DETAILS, SERVICE_AREAS } from '../data/marqueesData';

export const LocationAndCoverage: React.FC = () => {
  const [searchPostcode, setSearchPostcode] = useState('');
  const [searchResult, setSearchResult] = useState<{
    zone: string;
    distance: string;
    deliveryTier: string;
    freeSurvey: boolean;
  } | null>(null);

  const handleCheckPostcode = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = searchPostcode.toUpperCase().trim();
    if (!clean) return;

    if (clean.startsWith('SL1') || clean.startsWith('SL2') || clean.startsWith('SL3')) {
      setSearchResult({
        zone: 'Slough Core Zone (0 - 3 miles)',
        distance: 'Local Slough HQ Area',
        deliveryTier: 'FREE Delivery & Complete Rigging Included',
        freeSurvey: true
      });
    } else if (clean.startsWith('SL4') || clean.startsWith('SL5') || clean.startsWith('SL6') || clean.startsWith('SL9') || clean.startsWith('UB')) {
      setSearchResult({
        zone: 'Berkshire & Thames Valley Tier 1 (Windsor, Maidenhead, Ascot, Uxbridge)',
        distance: '4 - 10 miles',
        deliveryTier: 'Priority Dispatch (£75 flat setup delivery)',
        freeSurvey: true
      });
    } else if (clean.startsWith('RG') || clean.startsWith('HP') || clean.startsWith('TW') || clean.startsWith('W')) {
      setSearchResult({
        zone: 'Greater London & Thames Valley Tier 2 (Reading, High Wycombe, Heathrow, West London)',
        distance: '10 - 25 miles',
        deliveryTier: 'Standard Regional Dispatch (£140 delivery fee)',
        freeSurvey: true
      });
    } else {
      setSearchResult({
        zone: 'Extended UK Region',
        distance: '25+ miles',
        deliveryTier: 'Custom Logistics Quote Available',
        freeSurvey: false
      });
    }
  };

  return (
    <section id="location-delivery" className="py-20 bg-[#fdfcf8] border-b border-[#1a1a1a]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 pb-1 border-b border-[#c5a059] text-[#c5a059] text-xs font-bold uppercase tracking-[2.5px] mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Slough Depot & Berkshire Logistics</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1a1a1a] tracking-tight">
            Slough Headquarters & Delivery Radius
          </h2>
          <p className="mt-4 text-stone-600 text-base sm:text-lg font-light leading-relaxed">
            Centrally anchored at 213 Northern Rd in Slough (SL2 1LU) with immediate access to M4, M40, and M25 motorways for swift event deployments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Slough Depot Card */}
          <div className="lg:col-span-5 bg-white border border-[#1a1a1a]/15 shadow-[8px_8px_0px_#c5a059] p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-[#1a1a1a] flex items-center justify-center text-[#c5a059] border border-[#c5a059]/40">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-normal text-[#1a1a1a]">
                  Dreams Marquees Ltd
                </h3>
                <p className="text-[10px] uppercase tracking-[1.5px] text-[#c5a059] font-bold">
                  Registered Depot & Assembly Yard
                </p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-stone-700 border-y border-[#1a1a1a]/10 py-4 font-light">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#c5a059] mt-1 shrink-0" />
                <div>
                  <span className="font-normal text-[#1a1a1a] block">{COMPANY_DETAILS.address}</span>
                  <span className="text-xs text-stone-500 block font-mono">Google Plus Code: {COMPANY_DETAILS.plusCode}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span className="text-xs">{COMPANY_DETAILS.officeHours}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span className="text-xs font-semibold">{COMPANY_DETAILS.phone} / {COMPANY_DETAILS.mobileWhatsApp}</span>
              </div>
            </div>

            {/* Directions & Navigation Links */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={COMPANY_DETAILS.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 bg-[#1a1a1a] hover:bg-[#c5a059] text-white hover:text-[#1a1a1a] font-bold text-xs uppercase tracking-[2px] flex items-center justify-center gap-2 shadow-xs transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps</span>
              </a>

              <a
                href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, '')}`}
                className="py-3 px-4 border border-[#1a1a1a] hover:bg-[#1a1a1a] text-[#1a1a1a] hover:text-white font-bold text-xs uppercase tracking-[2px] flex items-center justify-center gap-2 transition-all"
              >
                <span>Call Depot</span>
              </a>
            </div>

            {/* Interactive Postcode Delivery Checker */}
            <div className="bg-stone-50 p-4 border border-[#1a1a1a]/15">
              <h4 className="text-[10px] font-bold uppercase tracking-[2px] text-[#c5a059] mb-1 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5" />
                Check Your Event Postcode
              </h4>
              <p className="text-[11px] text-stone-600 mb-2.5 font-light">
                Enter your event venue postcode to verify delivery tier and free Slough survey.
              </p>
              
              <form onSubmit={handleCheckPostcode} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. SL2 1LU or SL4"
                  value={searchPostcode}
                  onChange={(e) => setSearchPostcode(e.target.value)}
                  className="flex-1 p-2 bg-white border border-[#1a1a1a]/20 text-xs font-bold uppercase outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1a1a1a] hover:bg-[#c5a059] text-white hover:text-[#1a1a1a] text-xs font-bold uppercase tracking-wider cursor-pointer transition-all"
                >
                  Verify
                </button>
              </form>

              {searchResult && (
                <div className="mt-3 p-3 bg-white border border-[#c5a059] text-xs space-y-1">
                  <div className="font-bold text-[#1a1a1a]">{searchResult.zone}</div>
                  <div className="text-[#c5a059] font-bold">{searchResult.deliveryTier}</div>
                  <div className="text-emerald-700 flex items-center gap-1 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Free Pre-Event Site Survey Qualified</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Service Areas Grid */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white border border-[#1a1a1a]/15 shadow-[8px_8px_0px_#c5a059] p-6 sm:p-8">
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-[#1a1a1a]/10">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-[#c5a059]" />
                  <h3 className="font-serif text-xl font-normal text-[#1a1a1a]">
                    Regional Towns & Dispatch Tiers
                  </h3>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#c5a059] border border-[#c5a059]/40 px-2 py-0.5">
                  Slough Fleet
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICE_AREAS.map((area, idx) => (
                  <div
                    key={idx}
                    className={`p-3 border flex items-center justify-between text-xs transition-colors ${
                      area.highlight
                        ? 'border-[#c5a059] bg-[#c5a059]/5 text-[#1a1a1a]'
                        : 'border-[#1a1a1a]/10 bg-stone-50 text-stone-700'
                    }`}
                  >
                    <div>
                      <span className="font-bold text-[#1a1a1a] block">{area.name}</span>
                      <span className="text-[10px] font-mono text-stone-500">{area.postcode}</span>
                    </div>
                    <span className="font-mono text-[11px] font-semibold text-[#c5a059] bg-white px-2 py-0.5 border border-[#1a1a1a]/10">
                      {area.distance}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-[#1a1a1a]/10 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-2 font-light">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Fleet equipped with certified ballast anchors and laser leveling gear.</span>
                </div>
                <span className="font-semibold text-[#1a1a1a]">Covering all of Berkshire and South East England</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
