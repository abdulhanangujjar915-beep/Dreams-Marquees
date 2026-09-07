import React, { useState, useMemo, useEffect } from 'react';
import { 
  X, 
  MapPin, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Printer, 
  MessageCircle, 
  Sparkles,
  Layers
} from 'lucide-react';
import { MARQUEES_CATALOG, ACCESSORIES_CATALOG, COMPANY_DETAILS } from '../data/marqueesData';
import { BookingDetails } from '../types';

interface OnlineBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedMarqueeId?: string;
  prefillConfig?: {
    guestCount?: number;
    recommendedSize?: string;
    includeDanceFloor?: boolean;
    includeBar?: boolean;
    includeStage?: boolean;
  } | null;
  onBookingCreated: (newBooking: BookingDetails) => void;
}

export const OnlineBookingModal: React.FC<OnlineBookingModalProps> = ({
  isOpen,
  onClose,
  preselectedMarqueeId,
  prefillConfig,
  onBookingCreated,
}) => {
  if (!isOpen) return null;

  // Multi-step wizard: 1 = Marquee & Date, 2 = Accessories & Styling, 3 = Venue & Contact, 4 = Confirmation
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form states
  const [selectedMarqueeId, setSelectedMarqueeId] = useState<string>(
    preselectedMarqueeId || MARQUEES_CATALOG[0].id
  );

  const activeMarquee = useMemo(() => {
    return MARQUEES_CATALOG.find(m => m.id === selectedMarqueeId) || MARQUEES_CATALOG[0];
  }, [selectedMarqueeId]);

  const [selectedSize, setSelectedSize] = useState<string>(
    prefillConfig?.recommendedSize || activeMarquee.availableSizes[0] || '12m x 21m'
  );

  // Keep size synced when marquee changes
  useEffect(() => {
    if (activeMarquee && !activeMarquee.availableSizes.includes(selectedSize)) {
      setSelectedSize(activeMarquee.availableSizes[0] || '');
    }
  }, [activeMarquee]);

  const [eventDate, setEventDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 21); // Default to 3 weeks ahead
    return d.toISOString().split('T')[0];
  });

  const [durationDays, setDurationDays] = useState<number>(2);
  const [eventType, setEventType] = useState<'Wedding' | 'Corporate Function' | 'Birthday / Anniversary' | 'Garden Party' | 'Festival / Community'>('Wedding');
  const [guestCount, setGuestCount] = useState<number>(prefillConfig?.guestCount || 120);
  const [venueType, setVenueType] = useState<'Grass Lawn' | 'Hard Standing / Concrete' | 'Patio / Decking' | 'Tarmac'>('Grass Lawn');

  // Selected accessories with quantities
  const [selectedAccessories, setSelectedAccessories] = useState<{ [id: string]: number }>({
    'starlight-lining': prefillConfig?.includeDanceFloor ? 1 : 0,
    'oak-parquet-dancefloor': prefillConfig?.includeDanceFloor ? 1 : 0,
    'pleated-ivory-swags': 1,
    'crystal-chandeliers': 2,
    'thermostatic-diesel-heater': 1,
    'chiavari-chairs-tables': 10,
  });

  // Customer contact info
  const [customerName, setCustomerName] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [venueAddress, setVenueAddress] = useState<string>('213 Northern Rd, Slough');
  const [venuePostcode, setVenuePostcode] = useState<string>('SL2 1LU');
  const [notes, setNotes] = useState<string>('');

  // Confirmation result
  const [confirmedBooking, setConfirmedBooking] = useState<BookingDetails | null>(null);

  // Price calculations
  const pricing = useMemo(() => {
    const tentBase = activeMarquee.basePricePerDay;
    // Multi-day discount: 1st day 100%, each additional day 45%
    const tentCost = Math.round(tentBase + (durationDays - 1) * (tentBase * 0.45));

    let accessoriesCost = 0;
    (Object.entries(selectedAccessories) as [string, number][]).forEach(([accId, qty]) => {
      if (qty > 0) {
        const item = ACCESSORIES_CATALOG.find(a => a.id === accId);
        if (item) {
          accessoriesCost += item.price * qty;
        }
      }
    });

    // Delivery & Setup based on Postcode
    let deliveryAndSetup = 0;
    const cleanPostcode = venuePostcode.toUpperCase().trim();
    if (cleanPostcode.startsWith('SL1') || cleanPostcode.startsWith('SL2') || cleanPostcode.startsWith('SL3')) {
      deliveryAndSetup = 0; // Free in local Slough area!
    } else if (cleanPostcode.startsWith('SL4') || cleanPostcode.startsWith('SL6') || cleanPostcode.startsWith('SL9') || cleanPostcode.startsWith('UB')) {
      deliveryAndSetup = 75; // Windsor, Maidenhead, Uxbridge
    } else if (cleanPostcode.startsWith('RG') || cleanPostcode.startsWith('HP') || cleanPostcode.startsWith('TW')) {
      deliveryAndSetup = 140; // Reading, High Wycombe, Heathrow
    } else {
      deliveryAndSetup = 190; // Greater London & Regional
    }

    const subtotal = tentCost + accessoriesCost + deliveryAndSetup;
    const vat = Math.round(subtotal * 0.20);
    const totalAmount = subtotal + vat;
    const depositRequired = Math.round(totalAmount * 0.25);

    return {
      tentCost,
      accessoriesCost,
      deliveryAndSetup,
      vat,
      totalAmount,
      depositRequired
    };
  }, [activeMarquee, durationDays, selectedAccessories, venuePostcode]);

  const handleToggleAccessory = (accId: string, defaultQty: number = 1) => {
    setSelectedAccessories(prev => ({
      ...prev,
      [accId]: prev[accId] > 0 ? 0 : defaultQty
    }));
  };

  const handleUpdateQty = (accId: string, delta: number) => {
    setSelectedAccessories(prev => {
      const current = prev[accId] || 0;
      const updated = Math.max(0, current + delta);
      return { ...prev, [accId]: updated };
    });
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName || !customerPhone) {
      alert('Please provide your full name and phone number to generate your booking reservation.');
      return;
    }

    const bookingId = `DM-${Math.floor(100000 + Math.random() * 900000)}`;

    const accessoriesList = (Object.entries(selectedAccessories) as [string, number][])
      .filter(([_, qty]) => qty > 0)
      .map(([accessoryId, quantity]) => ({ accessoryId, quantity }));

    const newBooking: BookingDetails = {
      id: bookingId,
      createdAt: new Date().toISOString(),
      status: 'Confirmed',
      customerName,
      customerEmail: customerEmail || 'customer@example.com',
      customerPhone,
      eventType,
      eventDate,
      durationDays,
      guestCount,
      selectedMarqueeId,
      selectedSize,
      venueType,
      venueAddress,
      venuePostcode,
      notes,
      selectedAccessories: accessoriesList,
      pricing
    };

    // Save to local storage
    try {
      const existingStr = localStorage.getItem('dreams_marquees_bookings');
      const existing = existingStr ? JSON.parse(existingStr) : [];
      localStorage.setItem('dreams_marquees_bookings', JSON.stringify([newBooking, ...existing]));
    } catch (err) {
      console.error('Failed to save booking', err);
    }

    setConfirmedBooking(newBooking);
    onBookingCreated(newBooking);
    setCurrentStep(4);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#1a1a1a]/80 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative bg-[#fdfcf8] max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-[#1a1a1a] shadow-[14px_14px_0px_#c5a059] text-stone-900 my-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-20 bg-[#1a1a1a] text-white p-4 sm:p-6 border-b border-stone-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-normal text-lg sm:text-xl text-stone-100">
                Dreams Marquees Ltd
              </span>
              <span className="text-[10px] bg-[#c5a059] text-[#1a1a1a] font-bold px-2 py-0.5 uppercase tracking-wider">
                Online Reservation & Quote
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-0.5 font-light">
              Slough SL2 1LU • Official Reservation & Availability Portal
            </p>
          </div>

          <button
            id="close-booking-wizard-btn"
            onClick={onClose}
            className="p-2 border border-stone-700 hover:border-[#c5a059] text-stone-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Steps indicator */}
        {currentStep < 4 && (
          <div className="bg-stone-100 border-b border-[#1a1a1a]/15 px-6 py-3.5">
            <div className="max-w-2xl mx-auto flex items-center justify-between text-xs font-bold uppercase tracking-[1.5px] text-stone-500">
              <div className={`flex items-center gap-2 ${currentStep >= 1 ? 'text-[#1a1a1a]' : ''}`}>
                <span className={`w-5 h-5 text-[11px] font-mono flex items-center justify-center ${currentStep >= 1 ? 'bg-[#1a1a1a] text-[#c5a059]' : 'bg-stone-300 text-stone-700'}`}>
                  1
                </span>
                <span className="hidden sm:inline">Tent & Dates</span>
              </div>
              <div className="h-px w-10 bg-[#1a1a1a]/20" />
              <div className={`flex items-center gap-2 ${currentStep >= 2 ? 'text-[#1a1a1a]' : ''}`}>
                <span className={`w-5 h-5 text-[11px] font-mono flex items-center justify-center ${currentStep >= 2 ? 'bg-[#1a1a1a] text-[#c5a059]' : 'bg-stone-300 text-stone-700'}`}>
                  2
                </span>
                <span className="hidden sm:inline">Interiors & Add-ons</span>
              </div>
              <div className="h-px w-10 bg-[#1a1a1a]/20" />
              <div className={`flex items-center gap-2 ${currentStep >= 3 ? 'text-[#1a1a1a]' : ''}`}>
                <span className={`w-5 h-5 text-[11px] font-mono flex items-center justify-center ${currentStep >= 3 ? 'bg-[#1a1a1a] text-[#c5a059]' : 'bg-stone-300 text-stone-700'}`}>
                  3
                </span>
                <span className="hidden sm:inline">Venue & Dispatch</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Tent, Size & Dates */}
        {currentStep === 1 && (
          <div className="p-6 sm:p-8 space-y-7">
            <div className="border-b border-[#1a1a1a]/10 pb-4">
              <span className="text-[10px] uppercase font-bold tracking-[2px] text-[#c5a059]">Stage One</span>
              <h3 className="font-serif text-2xl font-normal text-[#1a1a1a]">
                Select Structure & Event Schedule
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 font-light mt-0.5">
                Choose from our architectural clear-span, traditional pole, or pagoda pavilions.
              </p>
            </div>

            {/* Marquee Selection Cards */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[2px] text-stone-700 mb-3">
                Architectural Structure
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {MARQUEES_CATALOG.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => setSelectedMarqueeId(m.id)}
                    className={`p-3.5 border transition-all cursor-pointer flex flex-col justify-between ${
                      selectedMarqueeId === m.id
                        ? 'border-[#c5a059] bg-[#c5a059]/10 shadow-[4px_4px_0px_#c5a059]'
                        : 'border-[#1a1a1a]/15 bg-white hover:border-[#1a1a1a]/40'
                    }`}
                  >
                    <div>
                      <div className="relative h-24 overflow-hidden mb-2 bg-stone-900 border border-[#1a1a1a]/10">
                        <img src={m.imageUrl} alt={m.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        <span className="absolute top-1 right-1 px-2 py-0.5 bg-[#1a1a1a] text-[#c5a059] text-[9px] font-bold font-mono">
                          From £{m.basePricePerDay}/day
                        </span>
                      </div>
                      <h4 className="font-serif text-sm font-normal text-[#1a1a1a] leading-tight">
                        {m.name}
                      </h4>
                      <p className="text-[11px] text-stone-500 mt-1 line-clamp-2 font-light">
                        {m.headline}
                      </p>
                    </div>
                    <div className="text-[10px] uppercase font-mono text-[#c5a059] mt-3 pt-2 border-t border-[#1a1a1a]/10 flex items-center justify-between">
                      <span>Max {m.capacitySeated} seated</span>
                      <span className="text-stone-400">Wind: {m.specifications.windResistance}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Sizes for Selected Marquee */}
            <div className="bg-white p-5 border border-[#1a1a1a]/15 shadow-none">
              <label className="block text-[11px] font-bold uppercase tracking-[2px] text-stone-700 mb-2">
                Available Dimensions ({activeMarquee.name})
              </label>
              <div className="flex flex-wrap gap-2">
                {activeMarquee.availableSizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={`px-3.5 py-2 text-xs font-mono font-semibold transition-all cursor-pointer ${
                      selectedSize === sz
                        ? 'bg-[#1a1a1a] text-[#c5a059] border border-[#1a1a1a]'
                        : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-[#1a1a1a]/15'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Event Dates & Duration */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[2px] text-stone-700 mb-1.5">
                  Event Start Date
                </label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#1a1a1a]/20 text-xs font-mono font-bold outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[2px] text-stone-700 mb-1.5">
                  Rental Duration (Days)
                </label>
                <select
                  value={durationDays}
                  onChange={(e) => setDurationDays(Number(e.target.value))}
                  className="w-full p-2.5 bg-white border border-[#1a1a1a]/20 text-xs font-mono font-bold outline-none"
                >
                  <option value={1}>1 Day (Standard)</option>
                  <option value={2}>2 Days (Weekend / Multi-Day)</option>
                  <option value={3}>3 Days (Extended Nuptial)</option>
                  <option value={5}>5 Days (Festival / Corporate)</option>
                  <option value={7}>7 Days (Full Week Hire)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[2px] text-stone-700 mb-1.5">
                  Event Typology
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value as any)}
                  className="w-full p-2.5 bg-white border border-[#1a1a1a]/20 text-xs font-bold outline-none"
                >
                  <option value="Wedding">Luxury Wedding</option>
                  <option value="Corporate Function">Corporate Gala / Launch</option>
                  <option value="Birthday / Anniversary">Anniversary / Private Party</option>
                  <option value="Garden Party">Garden Celebration</option>
                  <option value="Festival / Community">Festival / Exhibition</option>
                </select>
              </div>
            </div>

            {/* Navigation Button */}
            <div className="flex justify-end pt-4 border-t border-[#1a1a1a]/10">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-8 py-3.5 bg-[#1a1a1a] hover:bg-[#c5a059] text-white hover:text-[#1a1a1a] font-bold text-xs uppercase tracking-[2px] flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <span>Continue to Interiors & Accoutrements</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Accessories & Styling */}
        {currentStep === 2 && (
          <div className="p-6 sm:p-8 space-y-7">
            <div className="border-b border-[#1a1a1a]/10 pb-4">
              <span className="text-[10px] uppercase font-bold tracking-[2px] text-[#c5a059]">Stage Two</span>
              <h3 className="font-serif text-2xl font-normal text-[#1a1a1a]">
                Linings, Lighting, Heating & Flooring
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 font-light mt-0.5">
                Customize every atmospheric detail with our commercial catalog.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ACCESSORIES_CATALOG.map((acc) => {
                const qty = selectedAccessories[acc.id] || 0;
                const isSelected = qty > 0;
                return (
                  <div
                    key={acc.id}
                    className={`p-4 border transition-all flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'border-[#c5a059] bg-[#c5a059]/10 shadow-[3px_3px_0px_#c5a059]'
                        : 'border-[#1a1a1a]/15 bg-white'
                    }`}
                  >
                    <div className="flex gap-3">
                      <img
                        src={acc.imageUrl}
                        alt={acc.name}
                        className="w-16 h-16 object-cover border border-[#1a1a1a]/20 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif text-sm font-normal text-[#1a1a1a]">
                            {acc.name}
                          </h4>
                          {acc.badge && (
                            <span className="text-[9px] bg-[#1a1a1a] text-[#c5a059] font-bold px-1.5 py-0.5 uppercase tracking-wider">
                              {acc.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-stone-500 line-clamp-2 mt-0.5 font-light">
                          {acc.description}
                        </p>
                        <span className="text-xs font-mono font-bold text-[#c5a059] mt-1 inline-block">
                          £{acc.price} / {acc.unit}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleToggleAccessory(acc.id, acc.category === 'furniture' ? 5 : 1)}
                        className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#1a1a1a] text-[#c5a059]'
                            : 'border border-[#1a1a1a] text-stone-800 hover:bg-[#1a1a1a] hover:text-white'
                        }`}
                      >
                        {isSelected ? 'Included' : 'Add'}
                      </button>

                      {isSelected && (
                        <div className="flex items-center gap-1.5 bg-white border border-[#1a1a1a]/20 p-0.5">
                          <button
                            type="button"
                            onClick={() => handleUpdateQty(acc.id, -1)}
                            className="w-5 h-5 flex items-center justify-center text-xs font-bold text-stone-700 hover:bg-stone-200 cursor-pointer"
                          >
                            -
                          </button>
                          <span className="text-xs font-mono font-bold px-1">{qty}</span>
                          <button
                            type="button"
                            onClick={() => handleUpdateQty(acc.id, 1)}
                            className="w-5 h-5 flex items-center justify-center text-xs font-bold text-stone-700 hover:bg-stone-200 cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-[#1a1a1a]/10">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-600 hover:text-[#1a1a1a] cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Structure</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-8 py-3.5 bg-[#1a1a1a] hover:bg-[#c5a059] text-white hover:text-[#1a1a1a] font-bold text-xs uppercase tracking-[2px] flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <span>Continue to Venue & Contact</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Venue & Contact Details */}
        {currentStep === 3 && (
          <form onSubmit={handleSubmitBooking} className="p-6 sm:p-8 space-y-7">
            <div className="border-b border-[#1a1a1a]/10 pb-4">
              <span className="text-[10px] uppercase font-bold tracking-[2px] text-[#c5a059]">Stage Three</span>
              <h3 className="font-serif text-2xl font-normal text-[#1a1a1a]">
                Venue Location & Contact Particulars
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 font-light mt-0.5">
                Our Slough rigging team requires site access details to calculate exact logistics.
              </p>
            </div>

            {/* Ground / Venue Type */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[2px] text-stone-700 mb-2">
                Ground Foundation Surface
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {(['Grass Lawn', 'Hard Standing / Concrete', 'Patio / Decking', 'Tarmac'] as const).map((vt) => (
                  <button
                    key={vt}
                    type="button"
                    onClick={() => setVenueType(vt)}
                    className={`p-3 text-left border transition-all cursor-pointer ${
                      venueType === vt
                        ? 'border-[#c5a059] bg-[#c5a059]/10 text-[#1a1a1a] shadow-[3px_3px_0px_#c5a059]'
                        : 'border-[#1a1a1a]/15 bg-white text-stone-600 hover:border-[#1a1a1a]/30'
                    }`}
                  >
                    <div className="text-xs font-bold uppercase tracking-wider">{vt}</div>
                    <div className="text-[10px] text-stone-500 mt-0.5 font-light">
                      {vt === 'Grass Lawn' ? 'Staked anchoring' : 'Ballast weight plates'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Venue Address & Postcode */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold uppercase tracking-[2px] text-stone-700 mb-1.5">
                  Venue Full Address
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Stoke Park Estate, Park Road"
                  value={venueAddress}
                  onChange={(e) => setVenueAddress(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#1a1a1a]/20 text-xs font-normal outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[2px] text-stone-700 mb-1.5">
                  Venue Postcode
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SL2 1LU"
                  value={venuePostcode}
                  onChange={(e) => setVenuePostcode(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#1a1a1a]/20 text-xs font-mono font-bold uppercase outline-none"
                />
                <span className="text-[10px] text-[#c5a059] font-mono mt-1 block">
                  {pricing.deliveryAndSetup === 0 ? '✓ Free Slough Logistics' : `£${pricing.deliveryAndSetup} Regional Dispatch`}
                </span>
              </div>
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[2px] text-stone-700 mb-1.5">
                  Client Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jonathan Wright"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#1a1a1a]/20 text-xs font-normal outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[2px] text-stone-700 mb-1.5">
                  Telephone / Mobile *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 07700 900123"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#1a1a1a]/20 text-xs font-normal outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[2px] text-stone-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="e.g. j.wright@domain.co.uk"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#1a1a1a]/20 text-xs font-normal outline-none"
                />
              </div>
            </div>

            {/* Special Instructions */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[2px] text-stone-700 mb-1.5">
                Special Access or Rigging Instructions (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Mention narrow garden gate access, sloped lawns, overhead tree branches, or power socket distances..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2.5 bg-white border border-[#1a1a1a]/20 text-xs font-normal outline-none font-light"
              />
            </div>

            {/* Itemized Calculation Summary */}
            <div className="bg-[#1a1a1a] text-white p-6 border border-[#1a1a1a] shadow-[6px_6px_0px_#c5a059]">
              <div className="text-[10px] text-[#c5a059] font-bold uppercase tracking-[2px] mb-2">
                Itemized Quotation Breakdown
              </div>
              <div className="space-y-1.5 text-xs text-stone-300 font-light border-b border-stone-800 pb-3">
                <div className="flex justify-between">
                  <span>{activeMarquee.name} ({selectedSize}, {durationDays} days):</span>
                  <span className="font-mono text-white font-semibold">£{pricing.tentCost}</span>
                </div>
                <div className="flex justify-between">
                  <span>Accessories, Drapes & Heating:</span>
                  <span className="font-mono text-white font-semibold">£{pricing.accessoriesCost}</span>
                </div>
                <div className="flex justify-between">
                  <span>Slough Rigging & Dispatch ({venuePostcode}):</span>
                  <span className="font-mono text-[#c5a059] font-semibold">{pricing.deliveryAndSetup === 0 ? 'FREE SLOUGH SETUP' : `£${pricing.deliveryAndSetup}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>UK VAT (20%):</span>
                  <span className="font-mono text-white">£{pricing.vat}</span>
                </div>
              </div>
              <div className="pt-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 block">Total Investment</span>
                  <span className="font-serif text-2xl text-[#c5a059] font-normal">£{pricing.totalAmount}</span>
                </div>
                <div className="text-right text-[11px] text-stone-400 font-light">
                  <span>Deposit upon site survey confirmation:</span>
                  <span className="block font-mono text-white font-bold">£{pricing.depositRequired} (25%)</span>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-[#1a1a1a]/10">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-600 hover:text-[#1a1a1a] cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Interiors</span>
              </button>

              <button
                id="submit-instant-reservation-btn"
                type="submit"
                className="px-8 py-3.5 bg-[#c5a059] hover:bg-[#b38d47] text-[#1a1a1a] font-bold text-xs uppercase tracking-[2px] flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm & Lock My Online Reservation</span>
              </button>
            </div>
          </form>
        )}

        {/* Step 4: Final Booking Confirmation & Receipt */}
        {currentStep === 4 && confirmedBooking && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center max-w-lg mx-auto space-y-3">
              <div className="w-14 h-14 bg-[#1a1a1a] border border-[#c5a059] text-[#c5a059] flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="text-[10px] text-[#c5a059] font-bold uppercase tracking-[2px] block">
                Official Commissioning Record
              </span>
              <h3 className="font-serif text-3xl font-normal text-[#1a1a1a]">
                Reservation Confirmed
              </h3>
              <p className="text-xs text-stone-600 font-light">
                Thank you, <span className="font-bold text-[#1a1a1a]">{confirmedBooking.customerName}</span>. Your reservation has been registered in the Dreams Marquees dispatch schedule.
              </p>
              <div className="inline-block px-4 py-2 bg-[#1a1a1a] text-[#c5a059] font-mono font-bold text-sm border border-[#c5a059]/40 shadow-xs">
                Ref: {confirmedBooking.id}
              </div>
            </div>

            {/* Receipt Summary Details */}
            <div className="bg-white p-6 border border-[#1a1a1a]/15 shadow-[8px_8px_0px_#c5a059] max-w-2xl mx-auto space-y-4 text-xs sm:text-sm font-light">
              <div className="flex justify-between border-b border-[#1a1a1a]/10 pb-3 font-semibold text-[#1a1a1a]">
                <span>Event Date: {confirmedBooking.eventDate} ({confirmedBooking.durationDays} Days Hire)</span>
                <span className="text-[#c5a059] uppercase tracking-wider text-xs">{confirmedBooking.eventType}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-stone-700">
                <div>
                  <span className="text-stone-400 text-[10px] uppercase tracking-wider block">Structure:</span>
                  <span className="font-serif font-bold text-[#1a1a1a] text-sm">{activeMarquee.name}</span>
                  <span className="block text-xs text-stone-600 font-mono">Dimensions: {confirmedBooking.selectedSize}</span>
                </div>
                <div>
                  <span className="text-stone-400 text-[10px] uppercase tracking-wider block">Venue:</span>
                  <span className="font-bold text-[#1a1a1a] text-sm">{confirmedBooking.venueAddress}</span>
                  <span className="block text-xs text-stone-600">{confirmedBooking.venuePostcode} ({confirmedBooking.venueType})</span>
                </div>
              </div>

              {confirmedBooking.selectedAccessories.length > 0 && (
                <div className="border-t border-[#1a1a1a]/10 pt-3">
                  <span className="text-stone-400 text-[10px] uppercase tracking-wider block mb-2">Atmospheric Inclusions:</span>
                  <div className="flex flex-wrap gap-2">
                    {confirmedBooking.selectedAccessories.map((acc, i) => {
                      const item = ACCESSORIES_CATALOG.find(a => a.id === acc.accessoryId);
                      return (
                        <span key={i} className="px-2.5 py-1 bg-stone-50 border border-[#1a1a1a]/15 text-xs text-stone-800 font-mono">
                          {item?.name || acc.accessoryId} (x{acc.quantity})
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="border-t border-[#1a1a1a]/10 pt-3 flex justify-between items-center text-[#1a1a1a]">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 block">Quotation Total:</span>
                  <span className="text-2xl font-serif font-bold text-[#c5a059]">
                    £{confirmedBooking.pricing.totalAmount}
                  </span>
                </div>
                <div className="text-right text-xs text-stone-500 font-light">
                  <span>Depot Survey Hub:</span>
                  <span className="block font-semibold text-[#1a1a1a]">213 Northern Rd, Slough SL2 1LU</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/${COMPANY_DETAILS.mobileWhatsApp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `Hello Dreams Marquees team! I have placed an online booking.\n\n` +
                  `Booking Reference: ${confirmedBooking.id}\n` +
                  `Name: ${confirmedBooking.customerName}\n` +
                  `Event: ${confirmedBooking.eventType} on ${confirmedBooking.eventDate}\n` +
                  `Marquee: ${activeMarquee.name} (${confirmedBooking.selectedSize})\n` +
                  `Venue: ${confirmedBooking.venueAddress}, ${confirmedBooking.venuePostcode}\n` +
                  `Estimated Total: £${confirmedBooking.pricing.totalAmount}\n\n` +
                  `Please confirm our site survey slot.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 bg-[#1a1a1a] hover:bg-[#c5a059] text-white hover:text-[#1a1a1a] font-bold text-xs uppercase tracking-[2px] flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => window.print()}
                className="px-6 py-3.5 border border-[#1a1a1a] hover:bg-stone-100 text-[#1a1a1a] font-bold text-xs uppercase tracking-[2px] flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>Print Invoice</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3.5 bg-stone-200 hover:bg-stone-300 text-stone-900 font-bold text-xs uppercase tracking-[2px] cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
