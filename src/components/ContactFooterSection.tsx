import React, { useState, useEffect } from 'react';
import { Sparkles, MapPin, Clock, Phone, Navigation, Building2, UserCheck, ShieldAlert } from 'lucide-react';

interface ContactSectionProps {
  onOpenLeadModal: (dest?: string, source?: string) => void;
  themeMode?: 'dark' | 'light';
}

export const ContactFooterSection: React.FC<ContactSectionProps> = ({ onOpenLeadModal, themeMode = 'light' }) => {
  const isLight = themeMode === 'light';

  const [settings, setSettings] = useState({
    agencyName: 'Ananddam Holidays',
    agencyHindiName: 'आनंददाम हॉलीडेज',
    director: 'Amol Anandrao Bodulwar',
    address: 'New Subhedar Layout, Ayodhya nagar, Nagpur, Maharashtra 440024',
    operatingHours: 'Open daily, Closes at 7:00 PM',
    phone: '',
    email: 'inquiries@ananddamholidays.com'
  });

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data) setSettings(prev => ({ ...prev, ...data }));
      })
      .catch(err => console.error('Error fetching settings:', err));
  }, []);

  return (
    <footer
      id="location"
      className={`relative transition-colors duration-500 border-t ${
        isLight
          ? 'bg-amber-100/60 text-slate-900 border-amber-300/60'
          : 'bg-slate-950 text-slate-200 border-amber-500/20'
      }`}
    >
      
      {/* Top Gold Lighting line */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-80" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Office details & Director Callout */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 border ${
                  isLight
                    ? 'bg-amber-500/15 border-amber-400/40 text-amber-900'
                    : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 text-amber-500" />
                Nagpur Flagship Travel Studio
              </div>
              <h2
                className={`text-3xl md:text-4xl font-serif font-bold leading-tight ${
                  isLight ? 'text-slate-950' : 'text-white'
                }`}
              >
                Visit Us at Ayodhya Nagar, Nagpur
              </h2>
              <p
                className={`font-serif text-lg mt-1 ${
                  isLight ? 'text-amber-900 font-bold' : 'text-amber-200/80'
                }`}
              >
                {settings.agencyHindiName}
              </p>
              <p className={isLight ? 'text-slate-700 mt-3 text-sm leading-relaxed max-w-xl' : 'text-slate-300 mt-3 text-sm leading-relaxed max-w-xl'}>
                Experience old-school personalized itinerary consultation. Sit down directly with founder{' '}
                <strong className={isLight ? 'text-slate-950' : 'text-white'}>{settings.director}</strong> and our senior curators to craft bespoke journeys without corporate markups.
              </p>
            </div>

            {/* Business Cards Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div
                className={`p-4 rounded-xl border transition ${
                  isLight
                    ? 'bg-white border-amber-200 hover:border-amber-400 shadow-sm'
                    : 'bg-slate-900/90 border-slate-800 hover:border-amber-500/30'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/15 text-amber-600 shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className={isLight ? 'text-xs uppercase tracking-wider text-amber-900 font-bold' : 'text-xs uppercase tracking-wider text-amber-300/80 font-medium'}>
                      Nagpur Address
                    </h4>
                    <p className={isLight ? 'text-slate-800 text-sm font-medium mt-1' : 'text-slate-200 text-sm font-medium mt-1'}>
                      {settings.address}
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`p-4 rounded-xl border transition ${
                  isLight
                    ? 'bg-white border-amber-200 hover:border-amber-400 shadow-sm'
                    : 'bg-slate-900/90 border-slate-800 hover:border-amber-500/30'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/15 text-amber-600 shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className={isLight ? 'text-xs uppercase tracking-wider text-amber-900 font-bold' : 'text-xs uppercase tracking-wider text-amber-300/80 font-medium'}>
                      Studio Timing
                    </h4>
                    <p className={isLight ? 'text-slate-800 text-sm font-medium mt-1' : 'text-slate-200 text-sm font-medium mt-1'}>
                      {settings.operatingHours}
                    </p>
                    <span className="inline-block mt-1 text-[11px] text-amber-800 font-bold bg-amber-500/15 px-2 py-0.5 rounded">
                      Closes daily at 7:00 PM Sharp
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Phone / Contact Badge */}
            <div
              className={`p-5 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                isLight
                  ? 'bg-gradient-to-r from-amber-100 via-amber-50 to-white border-amber-300'
                  : 'bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border-amber-500/40'
              }`}
            >
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-amber-600" />
                  Founder & Director: {settings.director}
                </div>
                {settings.phone ? (
                  <div className={`text-xl font-mono font-bold mt-1 flex items-center gap-2 ${isLight ? 'text-slate-950' : 'text-white'}`}>
                    <Phone className="w-5 h-5 text-amber-500" />
                    <span>{settings.phone}</span>
                  </div>
                ) : (
                  <p className={isLight ? 'text-slate-700 text-xs mt-1' : 'text-slate-300 text-xs mt-1'}>
                    Direct callback dispatch active for Nagpur & region inquiries.
                  </p>
                )}
              </div>

              <button
                onClick={() => onOpenLeadModal('General Consultation', 'Footer Direct Callback')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider transition shadow-md shadow-amber-500/20 whitespace-nowrap"
              >
                Schedule Walk-In Callback
              </button>
            </div>

            <div
              className={`p-3 rounded-lg border text-xs flex items-center gap-2 ${
                isLight
                  ? 'bg-amber-100/50 border-amber-200 text-slate-700'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Strictly zero online payment requests. All itinerary quotes and travel vouchers are finalized in person or via direct phone confirmation.</span>
            </div>
          </div>

          {/* Right Column: Google Maps Embed Placeholder & Foot Traffic Drive */}
          <div className="lg:col-span-6 space-y-4">
            <div
              className={`relative rounded-2xl overflow-hidden border shadow-2xl group ${
                isLight ? 'bg-white border-amber-300' : 'bg-slate-900 border-amber-500/30'
              }`}
            >
              
              {/* Map Canvas / Embed */}
              <div className="w-full h-[360px] relative bg-slate-800">
                <iframe
                  title="Ananddam Holidays Office Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.503692801826!2d79.1091!3d21.1278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0a52f2bc5ed%3A0x6a218080f339b33a!2sAyodhya%20Nagar%2C%20Nagpur%2C%20Maharashtra%20440024!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full opacity-95 transition group-hover:opacity-100"
                ></iframe>

                {/* Overlaid Location Pin Card */}
                <div
                  className={`absolute top-4 left-4 right-4 sm:right-auto max-w-sm p-3 backdrop-blur-md border rounded-xl shadow-xl ${
                    isLight
                      ? 'bg-white/95 border-amber-300 text-slate-900'
                      : 'bg-slate-950/90 border-amber-500/40 text-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2 text-amber-600 font-bold text-xs">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Ananddam Holidays Studio
                  </div>
                  <p className="text-xs font-medium mt-1">
                    New Subhedar Layout, Ayodhya Nagar, Nagpur
                  </p>
                  <p className="text-[11px] text-amber-700 mt-0.5 font-sans font-semibold">
                    Open Daily • Closes 7:00 PM
                  </p>
                </div>
              </div>

              {/* Map Footer Toolbar */}
              <div
                className={`p-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs ${
                  isLight ? 'bg-amber-50/90 border-amber-200 text-slate-800' : 'bg-slate-900 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Located in Ayodhya Nagar, Nagpur • Parking available</span>
                </div>
                <a
                  href="https://maps.google.com/?q=New+Subhedar+Layout,+Ayodhya+nagar,+Nagpur,+Maharashtra+440024"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 transition font-bold text-xs whitespace-nowrap"
                >
                  Get Driving Directions
                </a>
              </div>
            </div>

            <div
              className={`p-4 rounded-xl border flex items-center justify-between text-xs ${
                isLight
                  ? 'bg-amber-100/60 border-amber-300/80 text-slate-800'
                  : 'bg-amber-500/5 border-amber-500/20 text-slate-300'
              }`}
            >
              <span className="font-serif italic font-medium">"The secret to luxury travel is an offline expert who knows the unlisted routes."</span>
              <span className="text-amber-700 font-bold ml-2 shrink-0">— Amol Bodulwar</span>
            </div>
          </div>

        </div>

        {/* Bottom Sub-Footer */}
        <div
          className={`mt-16 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-xs ${
            isLight ? 'border-amber-200 text-slate-600' : 'border-slate-900 text-slate-500'
          }`}
        >
          <div>
            © {new Date().getFullYear()} Ananddam Holidays (आनंददाम हॉलीडेज). All rights reserved. Directed by Amol Anandrao Bodulwar.
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => onOpenLeadModal('General Consultation', 'Footer Link')} className="hover:text-amber-600 transition">
              VIP Callback Request
            </button>
            <a href="#destinations" className="hover:text-amber-600 transition">
              Curated Destinations
            </a>
            <a href="#reviews" className="hover:text-amber-600 transition">
              Nagpur Reviews
            </a>
            <a href="/admin" className="text-amber-700 font-bold hover:underline underline-offset-4">
              Agent Portal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
