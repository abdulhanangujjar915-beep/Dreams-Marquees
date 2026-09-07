import React from 'react';
import { X, Calendar, MessageCircle, FileText, CheckCircle2, Trash2 } from 'lucide-react';
import { BookingDetails } from '../types';
import { COMPANY_DETAILS, MARQUEES_CATALOG } from '../data/marqueesData';

interface BookingsListModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: BookingDetails[];
  onDeleteBooking: (id: string) => void;
  onNewBooking: () => void;
}

export const BookingsListModal: React.FC<BookingsListModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onDeleteBooking,
  onNewBooking
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#1a1a1a]/80 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative bg-[#fdfcf8] max-w-3xl w-full max-h-[88vh] overflow-y-auto border border-[#1a1a1a] shadow-[12px_12px_0px_#c5a059] text-stone-900 my-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#1a1a1a] text-white p-5 sm:p-6 border-b border-stone-800 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-[#c5a059] font-bold uppercase tracking-[2px]">
              Customer Portal
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#c5a059]" />
              <span>Registered Reservations</span>
            </h2>
            <p className="text-xs text-stone-400 mt-0.5 font-light">
              Official booking records on file with Dreams Marquees Ltd (Slough).
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 border border-stone-700 hover:border-[#c5a059] text-stone-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-4">
          {bookings.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <Calendar className="w-12 h-12 text-stone-400 mx-auto" />
              <h3 className="font-serif text-xl font-normal text-stone-800">
                No active reservations found
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto font-light leading-relaxed">
                Use our interactive reservation system to select structures, choose furnishings, and lock your event dates.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onNewBooking();
                }}
                className="mt-2 px-6 py-3 bg-[#1a1a1a] hover:bg-[#c5a059] text-white hover:text-[#1a1a1a] font-bold text-xs uppercase tracking-[2px] transition-all cursor-pointer"
              >
                Create New Booking
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((b) => {
                const marquee = MARQUEES_CATALOG.find(m => m.id === b.selectedMarqueeId);
                return (
                  <div
                    key={b.id}
                    className="p-5 border border-[#1a1a1a]/15 bg-white shadow-[4px_4px_0px_#c5a059] space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1a1a1a]/10 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-[#1a1a1a] bg-stone-100 px-2.5 py-1 border border-[#1a1a1a]/20">
                          {b.id}
                        </span>
                        <span className="px-2 py-0.5 border border-emerald-300 bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          {b.status}
                        </span>
                      </div>
                      <div className="text-[11px] font-mono text-stone-500">
                        Placed: {new Date(b.createdAt).toLocaleDateString('en-GB')}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-light">
                      <div>
                        <span className="text-stone-400 text-[10px] uppercase tracking-wider block">Structure:</span>
                        <span className="font-serif font-bold text-[#1a1a1a]">{marquee?.name || b.selectedMarqueeId}</span>
                        <span className="text-stone-600 block">{b.selectedSize}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 text-[10px] uppercase tracking-wider block">Event:</span>
                        <span className="font-serif font-bold text-[#1a1a1a]">{b.eventType}</span>
                        <span className="text-stone-600 block">{b.eventDate} ({b.durationDays} Days Hire)</span>
                      </div>
                      <div>
                        <span className="text-stone-400 text-[10px] uppercase tracking-wider block">Venue:</span>
                        <span className="font-normal text-[#1a1a1a]">{b.venueAddress}</span>
                        <span className="text-stone-600 block">{b.venuePostcode} ({b.venueType})</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#1a1a1a]/10">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-stone-400">Total Quotation: </span>
                        <span className="font-serif font-bold text-[#c5a059] text-lg ml-1">
                          £{b.pricing.totalAmount}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={`https://wa.me/${COMPANY_DETAILS.mobileWhatsApp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Hello Dreams Marquees team! Inquiring about my booking reference: ${b.id} for ${b.eventType} on ${b.eventDate}.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-[#1a1a1a] hover:bg-[#c5a059] text-white hover:text-[#1a1a1a] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp Dispatch</span>
                        </a>

                        <button
                          onClick={() => onDeleteBooking(b.id)}
                          className="p-1.5 text-stone-400 hover:text-red-700 hover:bg-red-50 transition-colors border border-transparent hover:border-red-200"
                          title="Delete local record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
