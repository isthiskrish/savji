import React, { useState } from 'react';
import { DESTINATIONS, Destination } from '../data/travelData';
import { Lock, Sparkles, Compass, ArrowUpRight, Eye, ShieldAlert } from 'lucide-react';

interface DestinationsProps {
  onOpenLeadModal: (destTitle: string, source: string) => void;
  themeMode?: 'dark' | 'light';
}

export const DestinationsSection: React.FC<DestinationsProps> = ({ onOpenLeadModal, themeMode = 'light' }) => {
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);
  const isLight = themeMode === 'light';

  return (
    <section
      id="destinations"
      className={`py-20 relative transition-colors duration-500 ${
        isLight ? 'bg-amber-50/60 text-slate-900' : 'bg-slate-950 text-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 border ${
                isLight
                  ? 'bg-amber-500/15 border-amber-400/40 text-amber-800'
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-amber-500" />
              Curated Private Collections
            </div>
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-serif font-bold leading-tight ${
                isLight ? 'text-slate-950' : 'text-white'
              }`}
            >
              Secret Routes & Luxury Destinations
            </h2>
            <p
              className={`text-base md:text-lg font-serif mt-2 ${
                isLight ? 'text-slate-700' : 'text-slate-300'
              }`}
            >
              Every trip is crafted manually with unlisted villa upgrades, private transfers, and VIP spots not found on booking apps.
            </p>
          </div>

          <div
            className={`flex items-center gap-2 text-xs p-3.5 rounded-xl max-w-sm border ${
              isLight
                ? 'bg-white/90 border-amber-300/80 text-amber-900 shadow-sm'
                : 'bg-amber-500/10 border-amber-500/20 text-amber-300/90'
            }`}
          >
            <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0" />
            <span>No generic online quotes. Click any destination to request our confidential detailed day-by-day itinerary.</span>
          </div>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DESTINATIONS.map((dest) => (
            <div
              key={dest.id}
              className={`group relative rounded-2xl border transition-all duration-300 overflow-hidden shadow-xl flex flex-col justify-between ${
                isLight
                  ? 'bg-white border-amber-200/80 hover:border-amber-400 hover:shadow-2xl'
                  : 'bg-slate-900 border-slate-800 hover:border-amber-500/50'
              }`}
            >
              {/* Image Container with Hover Zoom */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={dest.imageUrl}
                  alt={dest.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                
                {/* Vignette Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Tag Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-500/40 text-amber-300 text-xs font-medium">
                  {dest.tag}
                </div>

                {/* Secret Spots Indicator */}
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-200 text-[11px] font-mono flex items-center gap-1">
                  <Lock className="w-3 h-3 text-amber-400" />
                  <span>{dest.secretSpotsCount} Hidden Spots</span>
                </div>

                {/* Subtitle location */}
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-amber-400 text-xs uppercase tracking-widest font-semibold font-mono">
                    {dest.subtitle}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-white leading-snug mt-0.5 line-clamp-2">
                    {dest.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <p
                    className={`text-sm leading-relaxed italic font-serif ${
                      isLight ? 'text-slate-700' : 'text-slate-300'
                    }`}
                  >
                    "{dest.tagline}"
                  </p>

                  <div
                    className={`mt-4 pt-4 border-t space-y-2 ${
                      isLight ? 'border-amber-100' : 'border-slate-800'
                    }`}
                  >
                    <div
                      className={`text-xs uppercase font-semibold tracking-wider ${
                        isLight ? 'text-amber-800' : 'text-amber-300/80'
                      }`}
                    >
                      Included Private Perks:
                    </div>
                    <ul className="space-y-1.5">
                      {dest.highlights.map((item, idx) => (
                        <li
                          key={idx}
                          className={`text-xs flex items-center gap-2 ${
                            isLight ? 'text-slate-700' : 'text-slate-300'
                          }`}
                        >
                          <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Buttons */}
                <div
                  className={`pt-4 flex items-center gap-3 border-t ${
                    isLight ? 'border-amber-100' : 'border-slate-800/80'
                  }`}
                >
                  <button
                    onClick={() => onOpenLeadModal(dest.title, 'Unlock Itinerary Button')}
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-semibold text-xs uppercase tracking-wider transition shadow-md shadow-amber-500/10 flex items-center justify-center gap-1.5"
                  >
                    <span>Unlock This Itinerary</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setSelectedDest(dest)}
                    className={`p-3 rounded-xl border transition ${
                      isLight
                        ? 'bg-amber-100/70 hover:bg-amber-200 text-slate-800 border-amber-300/60'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700'
                    }`}
                    title="Quick Preview"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom World Trip Callout */}
        <div
          className={`mt-16 p-8 rounded-2xl border flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl ${
            isLight
              ? 'bg-gradient-to-r from-white via-amber-100/50 to-amber-200/40 border-amber-300/80 text-slate-900'
              : 'bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/30 border-amber-500/30 text-white'
          }`}
        >
          <div className="space-y-2 max-w-2xl">
            <h3
              className={`text-2xl font-serif font-bold ${
                isLight ? 'text-slate-950' : 'text-white'
              }`}
            >
              Looking for a Destination Not Listed Above?
            </h3>
            <p className={isLight ? 'text-slate-700 text-sm leading-relaxed' : 'text-slate-300 text-sm leading-relaxed'}>
              We customize trips anywhere across Asia, Europe, Africa, Australia, and the Americas. Tell Director Amol Bodulwar your dream destination and budget preferences for a bespoke consultation.
            </p>
          </div>

          <button
            onClick={() => onOpenLeadModal('Custom Bespoke Itinerary', 'Custom Destination Banner')}
            className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition whitespace-nowrap shadow-lg shadow-amber-500/20"
          >
            Inquire for Custom Destination
          </button>
        </div>

      </div>

      {/* Quick Preview Modal */}
      {selectedDest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-amber-500/40 rounded-2xl overflow-hidden shadow-2xl text-slate-100">
            <div className="relative h-56">
              <img src={selectedDest.imageUrl} alt={selectedDest.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              <button
                onClick={() => setSelectedDest(null)}
                className="absolute top-4 right-4 bg-slate-950/80 p-2 rounded-full text-slate-300 hover:text-amber-400"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-amber-400 text-xs font-mono">{selectedDest.subtitle} • {selectedDest.duration}</span>
                <h3 className="text-2xl font-serif font-bold text-white">{selectedDest.title}</h3>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-slate-300 text-sm italic font-serif">"{selectedDest.tagline}"</p>

              <div>
                <h4 className="text-xs font-semibold text-amber-300 uppercase tracking-wider mb-2">Key Secret Inclusions:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedDest.highlights.map((h, i) => (
                    <div key={i} className="text-xs text-slate-300 p-2 bg-slate-800/80 rounded border border-slate-700/60 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-800">
                <span className="text-xs text-slate-400">Consultation handled by Amol Bodulwar & senior team</span>
                <button
                  onClick={() => {
                    const dest = selectedDest.title;
                    setSelectedDest(null);
                    onOpenLeadModal(dest, 'Preview Modal Inquire');
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs rounded-lg uppercase tracking-wider"
                >
                  Inquire Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
