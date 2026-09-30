import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { EditorialIntro } from './components/EditorialIntro';
import { Accommodations } from './components/Accommodations';
import { Dining } from './components/Dining';
import { Experiences } from './components/Experiences';
import { Weddings } from './components/Weddings';
import { Gallery } from './components/Gallery';
import { Testimonials } from './components/Testimonials';
import { JourneyLocation } from './components/JourneyLocation';
import { Footer } from './components/Footer';
import { BookingDrawer } from './components/BookingDrawer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { Room } from './data/retreatData';

export default function App() {
  const [bookingDrawerOpen, setBookingDrawerOpen] = useState(false);
  const [initialBookingData, setInitialBookingData] = useState<{
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    roomCategory?: string;
    selectedRoom?: Room;
  }>({});

  const handleOpenBooking = (data?: {
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    roomCategory?: string;
    selectedRoom?: Room;
  }) => {
    if (data) {
      setInitialBookingData(data);
    }
    setBookingDrawerOpen(true);
  };

  const handleSelectRoomToBook = (room: Room) => {
    setInitialBookingData((prev) => ({
      ...prev,
      selectedRoom: room,
    }));
    setBookingDrawerOpen(true);
  };

  const handleScrollToWeddings = () => {
    const el = document.getElementById('wedding-inquiry-form') || document.getElementById('weddings');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreResort = () => {
    const el = document.getElementById('about');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0E231C] text-[#F7F4EE] flex flex-col font-sans selection:bg-[#C5A880]/30 selection:text-[#FDFBF7]">
      {/* Universal 3-Zone Header */}
      <Header
        onOpenBooking={() => handleOpenBooking()}
        onOpenWeddingForm={handleScrollToWeddings}
      />

      <main className="flex-1">
        {/* Cinematic Hero */}
        <Hero
          onPlanStay={handleOpenBooking}
          onPlanWedding={handleScrollToWeddings}
          onExploreResort={handleExploreResort}
        />

        {/* Editorial Story "Arrive somewhere extraordinary" */}
        <EditorialIntro
          onExploreStay={() => {
            const el = document.getElementById('stay');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onExploreWeddings={handleScrollToWeddings}
        />

        {/* Accommodations (Grand Suites, Lake View Rooms, Private Villas) */}
        <Accommodations onSelectRoomToBook={handleSelectRoomToBook} />

        {/* Royal Dining (Aranya Kitchen, The Courtyard, Sunset Bar) */}
        <Dining />

        {/* Curated Experiences (Lake excursions, private dinners, heritage walks, wellness, sundowners) */}
        <Experiences />

        {/* Destination Weddings (Major conversion section) */}
        <Weddings />

        {/* Cinematic Masonry Gallery */}
        <Gallery />

        {/* Fictional Testimonials */}
        <Testimonials />

        {/* Journey & Arrival Location */}
        <JourneyLocation />
      </main>

      {/* Comprehensive Footer */}
      <Footer
        onPlanStay={() => handleOpenBooking()}
        onPlanWedding={handleScrollToWeddings}
      />

      {/* Booking Engine & Drawer */}
      <BookingDrawer
        isOpen={bookingDrawerOpen}
        onClose={() => setBookingDrawerOpen(false)}
        initialData={initialBookingData}
      />

      {/* Mobile Sticky Action Bar */}
      <MobileStickyBar
        onPlanStay={() => handleOpenBooking()}
        onPlanWedding={handleScrollToWeddings}
      />
    </div>
  );
}
