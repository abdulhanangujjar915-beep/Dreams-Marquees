import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Calendar, 
  Clock, 
  Menu, 
  X, 
  Sparkles, 
  MessageCircle, 
  FileText,
  ShieldCheck
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/marqueesData';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenPlanner: () => void;
  onOpenMyBookings: () => void;
  bookingsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenPlanner,
  onOpenMyBookings,
  bookingsCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#fdfcf8]/95 backdrop-blur-md border-b border-[#1a1a1a]/15 transition-all">
      {/* Top utility bar */}
      <div className="bg-[#1a1a1a] text-stone-300 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <a 
              href={COMPANY_DETAILS.googleMapsUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#c5a059] transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
              <span className="font-medium text-stone-200">{COMPANY_DETAILS.address}</span>
              <span className="hidden md:inline text-stone-400">({COMPANY_DETAILS.plusCode})</span>
            </a>
            <div className="hidden sm:flex items-center gap-1.5 text-stone-400">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span>{COMPANY_DETAILS.officeHours}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <a 
              href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 font-semibold text-white hover:text-[#c5a059] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>{COMPANY_DETAILS.phone}</span>
            </a>
            <a 
              href={`https://wa.me/${COMPANY_DETAILS.mobileWhatsApp.replace(/[^0-9]/g, '')}?text=Hello%20Dreams%20Marquees%20team%2C%20I%20would%20like%20to%20inquire%20about%20hiring%20a%20luxury%20marquee.`}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#c5a059] hover:text-[#e0ba72] font-semibold text-xs tracking-wider uppercase transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">WhatsApp</span>
            </a>
            {bookingsCount > 0 && (
              <button
                id="view-my-bookings-btn"
                onClick={onOpenMyBookings}
                className="inline-flex items-center gap-1 text-[#c5a059] hover:text-[#e0ba72] font-semibold text-xs tracking-wider uppercase transition-colors border-l border-stone-700 pl-3 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Bookings ({bookingsCount})</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-[#1a1a1a] flex items-center justify-center text-[#c5a059] shadow-sm border border-[#c5a059]/40 group-hover:border-[#c5a059] transition-all">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 20h20" />
                <path d="M12 4L3 11v9h18v-9L12 4z" />
                <path d="M12 4v16" />
                <path d="M7 11v9" />
                <path d="M17 11v9" />
                <path d="M12 2v2" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif tracking-tight text-xl sm:text-2xl font-bold text-[#1a1a1a]">
                  Dreams Marquees
                </span>
                <span className="text-[10px] font-bold tracking-[2px] text-[#c5a059] border border-[#c5a059]/40 px-1.5 py-0.5 uppercase">
                  Ltd
                </span>
              </div>
              <p className="text-[11px] text-stone-500 tracking-[1.5px] uppercase font-medium">
                Slough & Thames Valley • Est. 2012
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-[2px] text-[#1a1a1a]">
            <a href="#marquees" className="hover:text-[#c5a059] transition-colors">
              Collection
            </a>
            <a href="#weddings-corporate" className="hover:text-[#c5a059] transition-colors">
              Experience
            </a>
            <button 
              onClick={onOpenPlanner} 
              className="flex items-center gap-1 hover:text-[#c5a059] transition-colors cursor-pointer uppercase tracking-[2px]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Space Planner</span>
            </button>
            <a href="#accessories" className="hover:text-[#c5a059] transition-colors">
              Interiors
            </a>
            <a href="#location-delivery" className="hover:text-[#c5a059] transition-colors">
              Location
            </a>
            <a href="#faq" className="hover:text-[#c5a059] transition-colors">
              FAQ
            </a>
          </nav>

          {/* CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              id="header-size-calc-btn"
              onClick={onOpenPlanner}
              className="px-4 py-2.5 border border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white text-xs font-bold uppercase tracking-[2px] transition-all cursor-pointer"
            >
              Calculator
            </button>

            <button
              id="header-book-online-btn"
              onClick={onOpenBooking}
              className="flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#c5a059] text-white hover:text-[#1a1a1a] px-5 py-2.5 text-xs font-bold uppercase tracking-[2px] shadow-sm transition-all cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Online</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              id="mobile-book-header-btn"
              onClick={onOpenBooking}
              className="bg-[#1a1a1a] text-white px-3 py-2 text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Book
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-800 hover:text-black cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="flex flex-col space-y-2 text-base font-medium text-stone-800">
            <a 
              href="#marquees" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-stone-50 rounded-md"
            >
              Marquees Catalog
            </a>
            <a 
              href="#weddings-corporate" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-stone-50 rounded-md"
            >
              Weddings & Corporate Functions
            </a>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPlanner();
              }}
              className="flex items-center gap-2 p-2 hover:bg-stone-50 rounded-md text-left text-amber-800 font-semibold"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              Size & Capacity Calculator
            </button>
            <a 
              href="#accessories" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-stone-50 rounded-md"
            >
              Linings, Lighting & Accessories
            </a>
            <a 
              href="#location-delivery" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-stone-50 rounded-md"
            >
              Slough Location & Berkshire Coverage
            </a>
            <a 
              href="#faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-stone-50 rounded-md"
            >
              FAQs & Weather Durability
            </a>
            {bookingsCount > 0 && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMyBookings();
                }}
                className="flex items-center gap-2 p-2 bg-amber-50 text-amber-900 rounded-md font-semibold text-left"
              >
                <FileText className="w-4 h-4 text-amber-700" />
                View My Bookings ({bookingsCount})
              </button>
            )}
          </div>

          <div className="pt-4 border-t border-stone-200 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-lg shadow-md flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Marquee Online</span>
            </button>
            <a
              href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, '')}`}
              className="w-full py-2.5 border border-stone-300 text-stone-800 font-medium rounded-lg flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-700" />
              <span>Call Us: {COMPANY_DETAILS.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
