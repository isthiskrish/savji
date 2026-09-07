import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, MapPin, Clock, ArrowRight, Flame, UserCheck, Star, Images } from 'lucide-react';

interface HeroProps {
  onOpenLeadModal: (dest?: string, source?: string) => void;
  themeMode?: 'dark' | 'light';
}

const HERO_BACKGROUNDS = [
  {
    id: 'tropical',
    label: 'Tropical Luxury',
    tagline: 'Overwater Villas & Turquoise Sunset',
    url: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=2400&q=90'
  },
  {
    id: 'european',
    label: 'European Elegance',
    tagline: 'Amalfi Coast & Cliffside Sanctuaries',
    url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=2400&q=90'
  },
  {
    id: 'exotic',
    label: 'Alpine Splendor',
    tagline: 'Swiss Alps & Glass Panoramas',
    url: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=2400&q=90'
  },
  {
    id: 'india',
    label: 'India Royale',
    tagline: 'Kashmir Houseboats & Udaipur Palaces',
    url: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=2400&q=90'
  }
];

export const HeroSection: React.FC<HeroProps> = ({ onOpenLeadModal, themeMode = 'light' }) => {
  const [activeBgIndex, setActiveBgIndex] = useState(0);

  const currentBg = HERO_BACKGROUNDS[activeBgIndex];
  const isLight = themeMode === 'light';

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pt-20 pb-12 transition-colors duration-500">
      
      {/* Dynamic Animated High-Res Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentBg.id}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: isLight ? 0.4 : 0.55, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src={currentBg.url}
            alt={currentBg.label}
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* Luxury Gradient Overlay Vignette */}
      <div
        className={`absolute inset-0 z-0 transition-colors duration-500 ${
          isLight
            ? 'bg-gradient-to-t from-amber-50 via-amber-50/75 to-slate-900/60'
            : 'bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/80'
        }`}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent opacity-70 pointer-events-none z-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center space-y-8">
        
        {/* FOMO Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-md text-xs sm:text-sm font-semibold tracking-wide uppercase shadow-xl ${
            isLight
              ? 'bg-amber-100/90 border border-amber-400/60 text-slate-900 shadow-amber-500/10'
              : 'bg-slate-900/90 border border-amber-500/40 text-amber-300 shadow-amber-500/10'
          }`}
        >
          <Flame className="w-4 h-4 text-amber-500 animate-bounce" />
          <span>Exclusive Nagpur VIP Travel Studio • Limited Monthly Departures</span>
        </motion.div>

        {/* Hero Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4 max-w-5xl mx-auto"
        >
          <h1
            className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-extrabold tracking-tight leading-[1.08] drop-shadow-2xl ${
              isLight ? 'text-slate-950' : 'text-white'
            }`}
          >
            The Secret to Luxury Travel at <span className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 bg-clip-text text-transparent underline decoration-amber-500/50 decoration-wavy decoration-2">Unbeatable Prices.</span>
          </h1>
          
          <p
            className={`text-xl sm:text-2xl md:text-3xl font-serif font-light max-w-3xl mx-auto leading-relaxed drop-shadow-md ${
              isLight ? 'text-slate-800' : 'text-slate-100'
            }`}
          >
            Bespoke itineraries crafted by experts, not algorithms.
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`text-sm sm:text-base max-w-2xl mx-auto font-sans leading-relaxed ${
            isLight ? 'text-slate-700' : 'text-slate-200'
          }`}
        >
          Why settle for crowded package tours? <strong className="text-amber-700">Amol Anandrao Bodulwar</strong> and senior travel curators unlock private resort villa rates, unlisted flight seats, and personalized luxury itineraries tailored directly for you.
        </motion.p>

        {/* Hero Call To Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <button
            onClick={() => onOpenLeadModal('Hero VIP Consultation', 'Hero Primary Button')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all duration-300 shadow-xl shadow-amber-500/25 text-base flex items-center justify-center gap-3 group"
          >
            <span>Request a Callback</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="#destinations"
            className={`w-full sm:w-auto px-8 py-4 rounded-xl font-semibold backdrop-blur-md transition text-base flex items-center justify-center gap-2 border ${
              isLight
                ? 'bg-amber-100/90 text-slate-900 border-amber-300 hover:bg-amber-200/90 hover:border-amber-400'
                : 'bg-slate-900/80 text-slate-100 border-slate-700 hover:border-amber-500/50 hover:bg-slate-800'
            }`}
          >
            <Compass className="w-5 h-5 text-amber-600" />
            <span>Explore Secret Itineraries</span>
          </a>
        </motion.div>

        {/* Interactive Background Mood Selector */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="pt-4 max-w-3xl mx-auto"
        >
          <div
            className={`p-2 backdrop-blur-md border rounded-2xl flex flex-wrap items-center justify-center gap-2 shadow-2xl ${
              isLight
                ? 'bg-white/90 border-amber-300/80'
                : 'bg-slate-900/80 border-amber-500/30'
            }`}
          >
            <div
              className={`text-[11px] font-mono uppercase tracking-wider px-3 py-1 flex items-center gap-1.5 w-full sm:w-auto justify-center ${
                isLight ? 'text-amber-800 font-bold' : 'text-amber-300'
              }`}
            >
              <Images className="w-3.5 h-3.5 text-amber-500" />
              <span>Luxury Mood Preview:</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {HERO_BACKGROUNDS.map((bg, idx) => (
                <button
                  key={bg.id}
                  onClick={() => setActiveBgIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    activeBgIndex === idx
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                      : isLight
                      ? 'bg-amber-100 text-slate-800 hover:bg-amber-200'
                      : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <span>{bg.label}</span>
                </button>
              ))}
            </div>
          </div>
          <p
            className={`text-[11px] font-serif italic mt-2 ${
              isLight ? 'text-amber-900/80 font-semibold' : 'text-amber-200/80'
            }`}
          >
            Current view: {currentBg.tagline}
          </p>
        </motion.div>

        {/* Trust Badges Bar */}
        <div
          className={`pt-8 border-t grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-xs sm:text-sm ${
            isLight ? 'border-amber-200/80 text-slate-700' : 'border-slate-800/80 text-slate-300'
          }`}
        >
          <div
            className={`flex items-center justify-center gap-2 p-3 backdrop-blur-md rounded-xl border ${
              isLight
                ? 'bg-white/80 border-amber-200 text-slate-800'
                : 'bg-slate-900/60 border-slate-800 text-slate-200'
            }`}
          >
            <UserCheck className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="font-medium">Director Managed</span>
          </div>

          <div
            className={`flex items-center justify-center gap-2 p-3 backdrop-blur-md rounded-xl border ${
              isLight
                ? 'bg-white/80 border-amber-200 text-slate-800'
                : 'bg-slate-900/60 border-slate-800 text-slate-200'
            }`}
          >
            <Star className="w-4 h-4 text-amber-500 shrink-0 fill-amber-500" />
            <span className="font-medium">Top Rated in Nagpur</span>
          </div>

          <div
            className={`flex items-center justify-center gap-2 p-3 backdrop-blur-md rounded-xl border ${
              isLight
                ? 'bg-white/80 border-amber-200 text-slate-800'
                : 'bg-slate-900/60 border-slate-800 text-slate-200'
            }`}
          >
            <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="font-medium">Ayodhya Nagar Office</span>
          </div>

          <div
            className={`flex items-center justify-center gap-2 p-3 backdrop-blur-md rounded-xl border ${
              isLight
                ? 'bg-white/80 border-amber-200 text-slate-800'
                : 'bg-slate-900/60 border-slate-800 text-slate-200'
            }`}
          >
            <Clock className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="font-medium">Open Daily 'til 7 PM</span>
          </div>
        </div>

      </div>
    </section>
  );
};
