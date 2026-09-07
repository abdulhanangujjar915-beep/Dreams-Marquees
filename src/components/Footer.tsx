import React from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, ArrowUp } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/marqueesData';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenPlanner: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenPlanner }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1a1a1a] text-stone-300 border-t border-stone-800">
      {/* Top CTA Banner */}
      <div className="border-b border-stone-800 py-12 px-4 sm:px-6 lg:px-8 bg-stone-900/70">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <span className="text-[#c5a059] text-xs font-bold uppercase tracking-[2.5px] block mb-2">
              Ready to Host an Extraordinary Celebration?
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white">
              Reserve Your Luxury Marquee in Slough & Berkshire
            </h3>
            <p className="text-stone-400 text-sm mt-2 font-light max-w-xl">
              Get an instant itemized calculation and book your complimentary site survey directly online.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="px-6 py-3.5 bg-[#c5a059] hover:bg-[#b38d47] text-[#1a1a1a] font-bold text-xs uppercase tracking-[2px] shadow-sm transition-all cursor-pointer"
            >
              Instant Online Booking
            </button>
            <button
              onClick={onOpenPlanner}
              className="px-5 py-3.5 border border-stone-700 hover:border-[#c5a059] text-stone-200 hover:text-[#c5a059] text-xs font-bold uppercase tracking-[2px] transition-all cursor-pointer"
            >
              Space Planner
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-stone-900 border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] font-serif font-bold text-lg">
                DM
              </div>
              <div>
                <span className="font-serif text-xl text-white tracking-wider block font-normal">
                  Dreams Marquees
                </span>
                <span className="text-[10px] text-[#c5a059] uppercase tracking-[2px] font-bold">
                  Ltd • Slough, UK
                </span>
              </div>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed font-light">
              Premier luxury marquee and event tent hire specialist based in Slough. Creating unforgettable settings for romantic weddings, VIP corporate galas, and prestigious celebrations across Berkshire and the Thames Valley.
            </p>
            <div className="flex items-center gap-2 text-xs text-stone-400 pt-1 font-light">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>BS EN 13782 Certified Structures</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-normal text-white uppercase tracking-[2px] border-b border-stone-800 pb-2">
              Marquee Fleet
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400 font-light">
              <li>
                <a href="#marquees" className="hover:text-[#c5a059] transition-colors">
                  Clear-Span Wedding Pavilions
                </a>
              </li>
              <li>
                <a href="#weddings-corporate" className="hover:text-[#c5a059] transition-colors">
                  Corporate Glass Pavilions
                </a>
              </li>
              <li>
                <a href="#marquees" className="hover:text-[#c5a059] transition-colors">
                  Traditional Sailcloth Tents
                </a>
              </li>
              <li>
                <a href="#marquees" className="hover:text-[#c5a059] transition-colors">
                  Crown Pagoda Chinese Hats
                </a>
              </li>
              <li>
                <a href="#marquees" className="hover:text-[#c5a059] transition-colors">
                  Nomad Bedouin Stretch Tents
                </a>
              </li>
              <li>
                <a href="#accessories" className="hover:text-[#c5a059] transition-colors">
                  Starlight LED Ceilings & Heaters
                </a>
              </li>
            </ul>
          </div>

          {/* Delivery Towns */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-normal text-white uppercase tracking-[2px] border-b border-stone-800 pb-2">
              Service Areas
            </h4>
            <ul className="space-y-2 text-xs text-stone-400 font-light">
              <li>Slough (SL1, SL2, SL3) - Free Delivery</li>
              <li>Windsor & Eton (SL4)</li>
              <li>Maidenhead & Bray (SL6)</li>
              <li>Ascot & Sunningdale (SL5)</li>
              <li>Gerrards Cross & Beaconsfield (SL9, HP9)</li>
              <li>Uxbridge & West London (UB8, UB9)</li>
              <li>Heathrow Airport Corridor</li>
              <li>Reading & Thames Valley (RG1, RG2)</li>
            </ul>
          </div>

          {/* Contact & Address */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-normal text-white uppercase tracking-[2px] border-b border-stone-800 pb-2">
              Slough Headquarters
            </h4>
            <div className="space-y-3 text-xs text-stone-400 font-light">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <span>{COMPANY_DETAILS.address}</span>
              </div>
              <div className="text-[11px] font-mono text-[#c5a059] pl-6">
                Google Plus Code: {COMPANY_DETAILS.plusCode}
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#c5a059] shrink-0" />
                <a href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                  {COMPANY_DETAILS.phone}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#c5a059] shrink-0" />
                <a href={`mailto:${COMPANY_DETAILS.email}`} className="hover:text-white transition-colors">
                  {COMPANY_DETAILS.email}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span>{COMPANY_DETAILS.officeHours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div>
            © {new Date().getFullYear()} Dreams Marquees Ltd. Registered in England & Wales. 213 Northern Rd, Slough SL2 1LU.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-[#c5a059] transition-colors cursor-pointer uppercase tracking-wider text-[11px]"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
