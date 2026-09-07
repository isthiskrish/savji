import React, { useState } from 'react';
import { Sparkles, PhoneCall, CheckCircle2, ShieldCheck, MapPin, X, ArrowRight } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDestination?: string;
  sourceText?: string;
}

export const CallbackModal: React.FC<ModalProps> = ({ isOpen, onClose, defaultDestination = '', sourceText = '' }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [destination, setDestination] = useState(defaultDestination || 'Maldives Overwater Villa Escapes');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !phone.trim() || !destination.trim()) {
      setErrorMsg('Please fill in your name, contact phone, and preferred destination.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          destination: sourceText ? `${destination} (${sourceText})` : destination,
          notes
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Submission failed');
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please try again or visit our Ayodhya Nagar office.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setPhone('');
    setEmail('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl overflow-hidden bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl text-slate-100">
        
        {/* Top Gold Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-600 via-amber-300 to-amber-600" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-amber-400 p-2 rounded-full hover:bg-slate-800 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 md:p-8">
          {!submitted ? (
            <>
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  VIP Priority Callback • Ananddam Holidays
                </div>
                <h3 className="text-2xl md:text-3xl font-serif text-white font-semibold">
                  Unlock Exclusive Itineraries
                </h3>
                <p className="text-slate-300 text-sm mt-1">
                  Amol Anandrao Bodulwar & senior travel architects tailor itineraries for discerning travelers. No generic templates or algorithms.
                </p>
              </div>

              {errorMsg && (
                <div className="mb-4 p-3 rounded-lg bg-red-900/40 border border-red-500/50 text-red-200 text-sm">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-amber-200/90 mb-1">
                    Full Name <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-amber-200/90 mb-1">
                      Phone Number <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-amber-200/90 mb-1">
                      Email Address <span className="text-slate-400">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="rajesh@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-amber-200/90 mb-1">
                    Destination of Interest <span className="text-amber-400">*</span>
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm"
                  >
                    <option value="Maldives Overwater Villa Escapes">Maldives - Private Atolls & Overwater Villas</option>
                    <option value="Swiss Alps Panoramas & Chalets">Switzerland & Alps - Scenic Rail & Secret Villages</option>
                    <option value="Bali Cliffside Retreats & Secret Waterfalls">Bali - Cliffside Villas & Secret Waterfalls</option>
                    <option value="Dubai VIP Skyline & Desert Royale">Dubai - VIP Yacht Charters & Secret Desert Camps</option>
                    <option value="Santorini Caldera Suites">Santorini & Greece - Caldera Suites & Catamarans</option>
                    <option value="Kashmir Snow Meadows & Dal Lake">Kashmir - Gulmarg Meadows & Heritage Houseboats</option>
                    <option value="Custom Bespoke Itinerary">Other Custom World Destination (Tell us in notes)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-amber-200/90 mb-1">
                    Travel Dates / Specific Preferences
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Planning family vacation in October for 4 people..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-lg font-semibold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Connecting with Travel Desk...</span>
                    ) : (
                      <>
                        <PhoneCall className="w-4 h-4" />
                        <span>Request Immediate Callback</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    100% Private & Direct Advice
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    Ayodhya Nagar, Nagpur
                  </span>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-amber-500/10 border border-amber-400/40 text-amber-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif text-white font-semibold">
                Callback Request Received!
              </h3>
              <p className="text-slate-300 text-sm max-w-md mx-auto">
                Thank you, <strong className="text-amber-300">{name}</strong>. Our senior itinerary planner from <strong className="text-amber-300">Ananddam Holidays</strong> will call you shortly to discuss your custom trip for <strong className="text-white">{destination}</strong>.
              </p>
              <div className="p-4 bg-slate-800/60 rounded-xl border border-amber-500/20 text-xs text-slate-300 text-left max-w-md mx-auto space-y-1">
                <p className="font-semibold text-amber-300">Prefer walking in?</p>
                <p>Visit us directly at: <strong>New Subhedar Layout, Ayodhya nagar, Nagpur</strong></p>
                <p>Hours: <strong>Open daily until 7:00 PM</strong></p>
              </div>
              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-300 font-medium rounded-lg text-sm border border-amber-500/30 transition"
                >
                  Close & Continue Browsing
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
