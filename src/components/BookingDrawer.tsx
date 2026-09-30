import React, { useState, useEffect } from 'react';
import { X, Calendar, Users, BedDouble, ShieldCheck, CheckCircle2, MessageSquare, CreditCard, Sparkles, Printer, Download, Clock } from 'lucide-react';
import { ROOMS, Room, RESORT_INFO } from '../data/retreatData';

interface BookingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    roomCategory?: string;
    selectedRoom?: Room;
  };
}

export const BookingDrawer: React.FC<BookingDrawerProps> = ({
  isOpen,
  onClose,
  initialData,
}) => {
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const dayAfterTomorrow = new Date(Date.now() + 172800000).toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(initialData?.checkIn || tomorrow);
  const [checkOut, setCheckOut] = useState(initialData?.checkOut || dayAfterTomorrow);
  const [guests, setGuests] = useState(initialData?.guests || 2);
  const [selectedRoomId, setSelectedRoomId] = useState<string>(
    initialData?.selectedRoom?.id || ROOMS[0].id
  );

  // Guest Contact Form
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Payment & Flow State
  const [paymentStep, setPaymentStep] = useState<'configure' | 'payment_sim' | 'confirmed'>('configure');
  const [paymentMethod, setPaymentMethod] = useState<'razorpay_demo' | 'upi_demo' | 'card_demo'>('razorpay_demo');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (initialData?.selectedRoom) {
      setSelectedRoomId(initialData.selectedRoom.id);
    }
    if (initialData?.checkIn) setCheckIn(initialData.checkIn);
    if (initialData?.checkOut) setCheckOut(initialData.checkOut);
    if (initialData?.guests) setGuests(initialData.guests);
  }, [initialData]);

  if (!isOpen) return null;

  const currentRoom = ROOMS.find((r) => r.id === selectedRoomId) || ROOMS[0];

  // Calculate nights
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const diffTime = Math.max(86400000, checkOutDate.getTime() - checkInDate.getTime());
  const nights = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)));

  const baseRate = currentRoom.demoRateInr * nights;
  const gstRate = Math.round(baseRate * 0.18); // 18% luxury GST in India
  const grandTotal = baseRate + gstRate;

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentStep('payment_sim');
  };

  const handleSimulatePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setConfirmationCode('ARN-RES-' + Math.floor(100000 + Math.random() * 900000));
      setPaymentStep('confirmed');
    }, 1200);
  };

  const handleReset = () => {
    setPaymentStep('configure');
    setConfirmationCode('');
    onClose();
  };

  const prefilledWhatsappUrl = `https://wa.me/${RESORT_INFO.whatsAppNumber}?text=${encodeURIComponent(
    'Hello Aranya Grand Retreat, I would like to enquire about a stay.'
  )}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-drawer-title"
      className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm flex justify-end animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#0E231C] border-l border-[#C5A880]/30 h-full flex flex-col justify-between shadow-2xl text-[#F7F4EE] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="sticky top-0 z-20 bg-[#091713]/95 backdrop-blur-md px-6 py-5 border-b border-[#C5A880]/20 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold block">
              Reservation Concierge
            </span>
            <h2 id="booking-drawer-title" className="font-serif text-2xl text-[#FDFBF7]">
              {paymentStep === 'confirmed' ? 'Reservation Confirmed' : 'Plan Your Stay'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#F7F4EE]/70 hover:text-white bg-[#0E231C] rounded-full border border-[#C5A880]/20"
            aria-label="Close reservation drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 flex-1">
          {paymentStep === 'confirmed' ? (
            /* Confirmation Voucher State */
            <div className="space-y-6 animate-fade-in py-2">
              <div className="text-center space-y-3 pb-6 border-b border-[#C5A880]/20">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#C5A880]/15 border border-[#C5A880] flex items-center justify-center text-[#C5A880]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-3xl text-[#FDFBF7]">
                  Your Sanctuary Awaits
                </h3>
                <p className="text-xs sm:text-sm text-[#F7F4EE]/80 max-w-md mx-auto font-light">
                  Thank you, <strong className="text-white">{guestName || 'Valued Guest'}</strong>. Your stay has been reserved under our simulated luxury demo system.
                </p>
                <div className="inline-block bg-[#142F26] border border-[#C5A880]/40 rounded px-4 py-2 text-xs font-mono text-[#C5A880] tracking-wider">
                  Confirmation Voucher: {confirmationCode}
                </div>
              </div>

              {/* Booking Summary Box */}
              <div className="bg-[#142F26]/70 border border-[#C5A880]/25 rounded-sm p-5 space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between pb-2 border-b border-[#C5A880]/15">
                  <span className="text-[#F7F4EE]/60">Suite / Residence:</span>
                  <span className="font-medium text-white text-right">{currentRoom.name}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#C5A880]/15">
                  <span className="text-[#F7F4EE]/60">Check-in:</span>
                  <span className="font-medium text-white">{checkIn} (14:00 onwards)</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#C5A880]/15">
                  <span className="text-[#F7F4EE]/60">Check-out:</span>
                  <span className="font-medium text-white">{checkOut} (until 12:00)</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#C5A880]/15">
                  <span className="text-[#F7F4EE]/60">Total Duration:</span>
                  <span className="font-medium text-white">{nights} Night{nights > 1 ? 's' : ''} · {guests} Guest{guests > 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between pt-1 text-sm font-serif">
                  <span className="text-[#C5A880]">Demo Amount Paid:</span>
                  <span className="text-white font-semibold">₹{grandTotal.toLocaleString('en-IN')} (Demo)</span>
                </div>
              </div>

              {/* Next Steps Card */}
              <div className="bg-[#091713] p-4 rounded border border-[#C5A880]/20 space-y-2 text-xs text-[#F7F4EE]/75">
                <div className="flex items-center gap-2 text-[#C5A880] font-semibold">
                  <Clock className="w-4 h-4" />
                  <span>Pre-Arrival Palace Curation</span>
                </div>
                <p>
                  Our Head Concierge will connect with you via WhatsApp 48 hours prior to your arrival to coordinate complimentary airport transfers, bespoke pillow selections, and private dining requests.
                </p>
              </div>

              {/* Actions */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <a
                  href={prefilledWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 text-xs uppercase tracking-wider font-semibold text-[#0E231C] bg-[#C5A880] hover:bg-[#D4B886] rounded-sm transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Speak to our Concierge</span>
                </a>
                <button
                  onClick={handleReset}
                  className="py-3 px-4 text-xs uppercase tracking-wider text-[#F7F4EE]/80 border border-[#C5A880]/30 hover:border-[#C5A880] rounded-sm"
                >
                  Done & Close
                </button>
              </div>
            </div>
          ) : paymentStep === 'payment_sim' ? (
            /* Razorpay / Indian Payment Gateway Sandbox Simulation */
            <div className="space-y-6 animate-fade-in">
              <div className="bg-[#142F26] p-4 rounded border border-[#C5A880]/30">
                <div className="flex items-center justify-between pb-3 border-b border-[#C5A880]/20">
                  <span className="text-xs text-[#C5A880] uppercase tracking-wider font-semibold">
                    Secure Payment Sandbox
                  </span>
                  <span className="text-[10px] bg-[#0E231C] text-[#C5A880] px-2 py-0.5 rounded border border-[#C5A880]/30">
                    Portfolio Demo Mode
                  </span>
                </div>
                <div className="pt-3 space-y-1.5 text-xs text-[#F7F4EE]/80">
                  <div className="flex justify-between">
                    <span>{currentRoom.name} ({nights} Night{nights > 1 ? 's' : ''}):</span>
                    <span>₹{baseRate.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-[#F7F4EE]/60">
                    <span>Luxury Hospitality GST (18%):</span>
                    <span>₹{gstRate.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#C5A880]/20 text-sm font-serif font-semibold text-[#FDFBF7]">
                    <span>Total Demo Payable:</span>
                    <span className="text-[#C5A880]">₹{grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#C5A880] font-semibold mb-2">
                  Select Demo Payment Method
                </label>
                <div className="space-y-2">
                  <label
                    className={`flex items-center justify-between p-3.5 rounded border cursor-pointer transition-all ${
                      paymentMethod === 'razorpay_demo'
                        ? 'border-[#C5A880] bg-[#142F26]'
                        : 'border-[#C5A880]/20 bg-[#091713]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="pay"
                        checked={paymentMethod === 'razorpay_demo'}
                        onChange={() => setPaymentMethod('razorpay_demo')}
                        className="accent-[#C5A880]"
                      />
                      <div>
                        <span className="text-xs font-semibold block text-white">Razorpay Secure Checkout</span>
                        <span className="text-[10px] text-[#F7F4EE]/60">UPI, NetBanking, All Major Indian & International Cards</span>
                      </div>
                    </div>
                    <CreditCard className="w-4 h-4 text-[#C5A880]" />
                  </label>

                  <label
                    className={`flex items-center justify-between p-3.5 rounded border cursor-pointer transition-all ${
                      paymentMethod === 'upi_demo'
                        ? 'border-[#C5A880] bg-[#142F26]'
                        : 'border-[#C5A880]/20 bg-[#091713]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="pay"
                        checked={paymentMethod === 'upi_demo'}
                        onChange={() => setPaymentMethod('upi_demo')}
                        className="accent-[#C5A880]"
                      />
                      <div>
                        <span className="text-xs font-semibold block text-white">Instant UPI (GPay / PhonePe / Paytm)</span>
                        <span className="text-[10px] text-[#F7F4EE]/60">Direct virtual payment address demo</span>
                      </div>
                    </div>
                    <Sparkles className="w-4 h-4 text-[#C5A880]" />
                  </label>
                </div>
              </div>

              {/* Security and compliance note */}
              <div className="flex items-start gap-2.5 p-3 rounded bg-[#091713] border border-[#C5A880]/15 text-[11px] text-[#F7F4EE]/70">
                <ShieldCheck className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>
                  All payments use end-to-end simulated security. No real credit card or bank funds are charged in this portfolio demo.
                </span>
              </div>

              {/* Action buttons */}
              <div className="pt-4 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentStep('configure')}
                  className="px-4 py-2.5 text-xs uppercase tracking-wider text-[#F7F4EE]/70 hover:text-white border border-[#C5A880]/25 rounded-sm"
                >
                  Back to Details
                </button>
                <button
                  type="button"
                  disabled={processing}
                  onClick={handleSimulatePayment}
                  className="flex-1 py-3 text-xs uppercase tracking-widest font-semibold text-[#0E231C] bg-[#C5A880] hover:bg-[#D4B886] rounded-sm transition-all shadow active:scale-95 flex items-center justify-center gap-2"
                >
                  {processing ? (
                    <span>Authorizing Sandbox Payment...</span>
                  ) : (
                    <span>Confirm & Authorize Demo Stay</span>
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* Configure Step */
            <form onSubmit={handleProceedToPayment} className="space-y-5">
              {/* Room Selection */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#C5A880] font-semibold mb-1.5 flex items-center gap-1.5">
                  <BedDouble className="w-3.5 h-3.5" />
                  <span>Selected Accommodation</span>
                </label>
                <select
                  value={selectedRoomId}
                  onChange={(e) => setSelectedRoomId(e.target.value)}
                  className="w-full bg-[#091713] border border-[#C5A880]/30 rounded px-3 py-2.5 text-xs sm:text-sm text-[#F7F4EE] focus:border-[#C5A880] focus:outline-none"
                >
                  {ROOMS.map((r) => (
                    <option key={r.id} value={r.id} className="bg-[#0E231C] text-white">
                      {r.name} ({r.category}) — ₹{r.demoRateInr.toLocaleString('en-IN')}/nt (Demo)
                    </option>
                  ))}
                </select>
              </div>

              {/* Dates & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#C5A880] font-medium mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Check-in</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-[#091713] border border-[#C5A880]/25 rounded px-3 py-2 text-xs text-[#F7F4EE] focus:border-[#C5A880] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#C5A880] font-medium mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Check-out</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={checkOut}
                    min={checkIn}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-[#091713] border border-[#C5A880]/25 rounded px-3 py-2 text-xs text-[#F7F4EE] focus:border-[#C5A880] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#C5A880] font-medium mb-1 flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>Guests</span>
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full bg-[#091713] border border-[#C5A880]/25 rounded px-3 py-2 text-xs text-[#F7F4EE] focus:border-[#C5A880] focus:outline-none"
                  >
                    <option value={1}>1 Adult</option>
                    <option value={2}>2 Adults</option>
                    <option value={3}>3 Adults</option>
                    <option value={4}>4 Guests (Suite)</option>
                    <option value={6}>6 Guests (Villa)</option>
                  </select>
                </div>
              </div>

              {/* Guest Details */}
              <div className="pt-2 border-t border-[#C5A880]/20 space-y-3">
                <span className="block text-xs uppercase tracking-wider text-[#C5A880] font-semibold">
                  Primary Guest Contact
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Full Name *"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full bg-[#091713] border border-[#C5A880]/25 rounded px-3 py-2 text-xs text-[#F7F4EE] focus:border-[#C5A880] focus:outline-none placeholder:text-white/30"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="Phone / WhatsApp *"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full bg-[#091713] border border-[#C5A880]/25 rounded px-3 py-2 text-xs text-[#F7F4EE] focus:border-[#C5A880] focus:outline-none placeholder:text-white/30"
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="email"
                    required
                    placeholder="Email Address for Voucher *"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full bg-[#091713] border border-[#C5A880]/25 rounded px-3 py-2 text-xs text-[#F7F4EE] focus:border-[#C5A880] focus:outline-none placeholder:text-white/30"
                  />
                </div>

                <div>
                  <textarea
                    rows={2}
                    placeholder="Special requests: Lake Badi view priority, complimentary solar boat time, dietary needs..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full bg-[#091713] border border-[#C5A880]/25 rounded px-3 py-2 text-xs text-[#F7F4EE] focus:border-[#C5A880] focus:outline-none placeholder:text-white/30 resize-none"
                  />
                </div>
              </div>

              {/* Price Calculation Summary */}
              <div className="p-4 rounded bg-[#142F26]/70 border border-[#C5A880]/25 space-y-2 text-xs">
                <div className="flex justify-between text-[#F7F4EE]/80">
                  <span>{currentRoom.name} ({nights} Night{nights > 1 ? 's' : ''}):</span>
                  <span>₹{baseRate.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#F7F4EE]/60">
                  <span>Luxury Hospitality Tax (18%):</span>
                  <span>₹{gstRate.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#C5A880]/20 text-sm font-serif">
                  <span className="text-white font-medium">Estimated Total (Demo):</span>
                  <span className="text-[#C5A880] font-semibold text-base">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
                <span className="text-[10px] text-[#C5A880]/70 block italic">
                  *Clearly marked demo portfolio calculation. Real bookings handled by resort reservation desk.
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  className="w-full py-3 text-xs uppercase tracking-widest font-semibold text-[#0E231C] bg-[#C5A880] hover:bg-[#D4B886] rounded-sm transition-all shadow active:scale-95 text-center"
                >
                  Proceed to Secure Checkout
                </button>
              </div>
            </form>
          )}

          {/* Concierge Direct Chat Link */}
          <div className="pt-6 border-t border-[#C5A880]/15 flex items-center justify-between text-xs text-[#C5A880]">
            <span className="text-[#F7F4EE]/60">Prefer personalized consultation?</span>
            <a
              href={prefilledWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-1 font-medium"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Speak to our Concierge</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
