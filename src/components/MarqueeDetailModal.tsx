import React, { useState } from 'react';
import { X, Users, Wind, Shield, Check, Calendar, ArrowRight, Ruler, Sparkles } from 'lucide-react';
import { MarqueeItem } from '../types';

interface MarqueeDetailModalProps {
  marquee: MarqueeItem | null;
  onClose: () => void;
  onBookThis: (marqueeId: string) => void;
}

export const MarqueeDetailModal: React.FC<MarqueeDetailModalProps> = ({
  marquee,
  onClose,
  onBookThis,
}) => {
  if (!marquee) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 text-stone-900 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-marquee-modal"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-900/70 hover:bg-stone-900 text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery Image Display */}
        <div className="relative h-72 sm:h-96 w-full bg-stone-900 overflow-hidden">
          <img
            src={marquee.galleryImages[activeImageIndex] || marquee.imageUrl}
            alt={`${marquee.name} preview`}
            className="w-full h-full object-cover transition-all duration-300"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div>
              <span className="inline-block px-2.5 py-1 rounded bg-amber-500 text-stone-950 text-xs font-bold uppercase tracking-wider mb-2">
                {marquee.category} Marquee
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
                {marquee.name}
              </h2>
            </div>
            <div className="text-right text-white">
              <span className="text-xs text-stone-300 block">Hire from</span>
              <span className="text-2xl font-serif font-bold text-amber-400">
                £{marquee.basePricePerDay}
              </span>
              <span className="text-xs text-stone-300"> / day</span>
            </div>
          </div>
        </div>

        {/* Image thumbnail selector if multiple images */}
        {marquee.galleryImages.length > 1 && (
          <div className="flex gap-2 p-3 bg-stone-100 border-b border-stone-200 overflow-x-auto">
            {marquee.galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative h-14 w-20 rounded-md overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  activeImageIndex === idx ? 'border-amber-600 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        )}

        <div className="p-6 sm:p-8 space-y-8">
          {/* Headline & Description */}
          <div>
            <h3 className="text-lg font-semibold text-stone-800 mb-2">
              {marquee.headline}
            </h3>
            <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
              {marquee.description}
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-stone-50 border border-stone-200 text-center">
            <div className="p-2">
              <Users className="w-5 h-5 mx-auto text-amber-600 mb-1" />
              <div className="text-xs text-stone-500 uppercase font-semibold">Seated Dining</div>
              <div className="text-lg font-bold text-stone-900">Up to {marquee.capacitySeated}</div>
            </div>
            <div className="p-2">
              <Sparkles className="w-5 h-5 mx-auto text-amber-600 mb-1" />
              <div className="text-xs text-stone-500 uppercase font-semibold">Standing Reception</div>
              <div className="text-lg font-bold text-stone-900">Up to {marquee.capacityStanding}</div>
            </div>
            <div className="p-2">
              <Wind className="w-5 h-5 mx-auto text-amber-600 mb-1" />
              <div className="text-xs text-stone-500 uppercase font-semibold">Wind Resistance</div>
              <div className="text-lg font-bold text-stone-900">{marquee.specifications.windResistance}</div>
            </div>
            <div className="p-2">
              <Ruler className="w-5 h-5 mx-auto text-amber-600 mb-1" />
              <div className="text-xs text-stone-500 uppercase font-semibold">Ridge Height</div>
              <div className="text-lg font-bold text-stone-900">{marquee.specifications.ridgeHeight}</div>
            </div>
          </div>

          {/* Available Sizes & Modules */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-stone-900 mb-3 flex items-center gap-2">
              <Ruler className="w-4 h-4 text-amber-600" />
              Available Dimensions & Popular Bay Sizes
            </h4>
            <div className="flex flex-wrap gap-2">
              {marquee.availableSizes.map((size, i) => (
                <span key={i} className="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-950 border border-amber-200 text-xs font-semibold">
                  {size}
                </span>
              ))}
            </div>
          </div>

          {/* Key Inclusions & Features */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-stone-900 mb-3">
              Included Craftsmanship & Safety Features
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {marquee.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-stone-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Engineering Specifications */}
          <div className="border-t border-stone-200 pt-6">
            <h4 className="text-sm font-bold uppercase tracking-wider text-stone-900 mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-stone-700" />
              Structural & Safety Certification
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500 font-medium">Framework Profile:</span>
                <span className="font-semibold text-stone-800 text-right">{marquee.specifications.frameType}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500 font-medium">Canopy & Fabric:</span>
                <span className="font-semibold text-stone-800 text-right">{marquee.specifications.fabric}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500 font-medium">Fire Certification:</span>
                <span className="font-semibold text-stone-800 text-right">{marquee.specifications.fireRating}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500 font-medium">Eave Height:</span>
                <span className="font-semibold text-stone-800">{marquee.specifications.eaveHeight}</span>
              </div>
            </div>
          </div>

          {/* Modal Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-stone-200">
            <div className="text-sm text-stone-500">
              * Delivery, erection, anchoring & takedown handled by Dreams Marquees certified team.
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="px-5 py-3 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-50 font-medium text-sm transition-colors w-full sm:w-auto cursor-pointer"
              >
                Back to Catalog
              </button>
              <button
                id="book-this-marquee-modal-btn"
                onClick={() => {
                  onClose();
                  onBookThis(marquee.id);
                }}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-amber-700 hover:bg-amber-800 text-white font-bold text-sm shadow-md transition-all w-full sm:w-auto cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book This Marquee Online</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
