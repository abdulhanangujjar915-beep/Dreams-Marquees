import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarqueeCatalog } from './components/MarqueeCatalog';
import { CorporateAndWeddings } from './components/CorporateAndWeddings';
import { SizePlanner } from './components/SizePlanner';
import { AccessoriesSection } from './components/AccessoriesSection';
import { LocationAndCoverage } from './components/LocationAndCoverage';
import { ReviewsAndFaq } from './components/ReviewsAndFaq';
import { Footer } from './components/Footer';
import { OnlineBookingModal } from './components/OnlineBookingModal';
import { BookingsListModal } from './components/BookingsListModal';
import { BookingDetails } from './types';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [selectedMarqueeId, setSelectedMarqueeId] = useState<string | undefined>(undefined);
  const [plannerPrefill, setPlannerPrefill] = useState<{
    guestCount?: number;
    recommendedSize?: string;
    includeDanceFloor?: boolean;
    includeBar?: boolean;
    includeStage?: boolean;
  } | null>(null);

  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState<boolean>(false);
  const [bookings, setBookings] = useState<BookingDetails[]>([]);

  // Load existing bookings from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('dreams_marquees_bookings');
      if (stored) {
        setBookings(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Error loading bookings', err);
    }
  }, []);

  const handleOpenBooking = (marqueeId?: string) => {
    setSelectedMarqueeId(marqueeId);
    setPlannerPrefill(null);
    setIsBookingOpen(true);
  };

  const handleOpenPlanner = () => {
    const el = document.getElementById('size-planner');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectSetupFromPlanner = (params: {
    marqueeId: string;
    guestCount: number;
    recommendedSize: string;
    includeDanceFloor: boolean;
    includeBar: boolean;
    includeStage: boolean;
  }) => {
    setSelectedMarqueeId(params.marqueeId);
    setPlannerPrefill({
      guestCount: params.guestCount,
      recommendedSize: params.recommendedSize,
      includeDanceFloor: params.includeDanceFloor,
      includeBar: params.includeBar,
      includeStage: params.includeStage,
    });
    setIsBookingOpen(true);
  };

  const handleBookingCreated = (newBooking: BookingDetails) => {
    setBookings(prev => [newBooking, ...prev]);
  };

  const handleDeleteBooking = (id: string) => {
    const updated = bookings.filter(b => b.id !== id);
    setBookings(updated);
    try {
      localStorage.setItem('dreams_marquees_bookings', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900 selection:bg-amber-200 selection:text-amber-950">
      {/* Sticky Navigation */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenPlanner={handleOpenPlanner}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
        bookingsCount={bookings.length}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onOpenPlanner={handleOpenPlanner}
        />

        {/* Marquees Collection Catalog */}
        <MarqueeCatalog
          onBookMarquee={(id) => handleOpenBooking(id)}
        />

        {/* Focused Weddings & Corporate Functions Showcase */}
        <CorporateAndWeddings
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* Interactive Size & Capacity Blueprint Planner */}
        <SizePlanner
          onSelectSetupForBooking={handleSelectSetupFromPlanner}
        />

        {/* Linings, Lighting, Dancefloors & Accessories */}
        <AccessoriesSection
          onBookWithAccessory={(accId) => {
            handleOpenBooking();
          }}
        />

        {/* Depot Location (Slough SL2 1LU) & Postcode Coverage Area */}
        <LocationAndCoverage />

        {/* Client Reviews & FAQs */}
        <ReviewsAndFaq />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenPlanner={handleOpenPlanner}
      />

      {/* Online Booking & Quotation Modal */}
      <OnlineBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedMarqueeId={selectedMarqueeId}
        prefillConfig={plannerPrefill}
        onBookingCreated={handleBookingCreated}
      />

      {/* My Bookings Modal */}
      <BookingsListModal
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
        bookings={bookings}
        onDeleteBooking={handleDeleteBooking}
        onNewBooking={() => {
          setIsMyBookingsOpen(false);
          handleOpenBooking();
        }}
      />
    </div>
  );
}
