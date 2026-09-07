import React from 'react';
import { Star, Quote, CheckCircle2, Award, HeartHandshake } from 'lucide-react';

interface ReviewsProps {
  onOpenLeadModal: (dest?: string, source?: string) => void;
  themeMode?: 'dark' | 'light';
}

export const ReviewsSection: React.FC<ReviewsProps> = ({ onOpenLeadModal, themeMode = 'light' }) => {
  const isLight = themeMode === 'light';

  const reviews = [
    {
      id: 1,
      quote: "I thought luxury travel was out of my budget until I visited Ananddam Holidays. Amol and his team completely transformed our family vacation!",
      author: "Rajesh T.",
      role: "Verified Family Traveler • Nagpur",
      rating: 5,
      destinationHighlight: "Maldives Private Villa Escape"
    },
    {
      id: 2,
      quote: "The absolute best tour operators in Nagpur. They handled every single detail. Five stars!",
      author: "Priya M.",
      role: "Honeymooner • Ayodhya Nagar",
      rating: 5,
      destinationHighlight: "Switzerland & Northern Alps"
    },
    {
      id: 3,
      quote: "A hidden gem in Ayodhya Nagar. The personalized itinerary they built gave us access to spots we’d never have found online.",
      author: "Vikram S.",
      role: "Luxury Explorer • New Subhedar Layout",
      rating: 5,
      destinationHighlight: "Kashmir Houseboat & Ski Retreat"
    }
  ];

  return (
    <section
      id="reviews"
      className={`py-20 relative overflow-hidden transition-colors duration-500 ${
        isLight ? 'bg-amber-100/40 text-slate-900' : 'bg-slate-900 text-slate-100'
      }`}
    >
      
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${
              isLight
                ? 'bg-amber-500/15 border-amber-400/40 text-amber-900'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-500" />
            Nagpur's Most Trusted Travel Studio
          </div>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-serif font-bold leading-tight ${
              isLight ? 'text-slate-950' : 'text-white'
            }`}
          >
            Loved by Discerning Families & Travelers
          </h2>
          <p className={isLight ? 'text-slate-700 text-base md:text-lg font-serif' : 'text-slate-300 text-base md:text-lg font-serif'}>
            Real feedback from Nagpur locals who trusted Amol Anandrao Bodulwar and Ananddam Holidays with their cherished moments.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className={`relative p-8 rounded-2xl border transition-all duration-300 shadow-xl flex flex-col justify-between group ${
                isLight
                  ? 'bg-white border-amber-200/90 hover:border-amber-400 hover:shadow-2xl'
                  : 'bg-gradient-to-b from-slate-800/90 to-slate-900/90 border-slate-700/80 hover:border-amber-500/40'
              }`}
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-amber-500/15 group-hover:text-amber-500/25 transition" />

              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4 text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs text-amber-600 font-bold ml-2">5.0 VIP Rating</span>
                </div>

                {/* Review Text */}
                <p
                  className={`text-base leading-relaxed font-serif italic mb-6 ${
                    isLight ? 'text-slate-800' : 'text-slate-200'
                  }`}
                >
                  "{rev.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div
                className={`pt-4 border-t flex items-center justify-between ${
                  isLight ? 'border-amber-100' : 'border-slate-800'
                }`}
              >
                <div>
                  <h4
                    className={`font-semibold text-base flex items-center gap-1.5 ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {rev.author}
                    <CheckCircle2 className="w-4 h-4 text-amber-500" />
                  </h4>
                  <p className={isLight ? 'text-slate-600 text-xs mt-0.5' : 'text-slate-400 text-xs mt-0.5'}>
                    {rev.role}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`text-[11px] font-mono px-2 py-1 rounded border font-semibold ${
                      isLight
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : 'text-amber-300/90 bg-amber-500/10 border-amber-500/20'
                    }`}
                  >
                    {rev.destinationHighlight}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social Proof Stats Banner */}
        <div
          className={`mt-16 p-8 rounded-2xl border grid grid-cols-1 md:grid-cols-3 gap-6 text-center shadow-xl ${
            isLight
              ? 'bg-white border-amber-300/80 text-slate-900'
              : 'bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-amber-500/30 text-white'
          }`}
        >
          <div className="p-4 space-y-1">
            <div className="text-3xl md:text-4xl font-serif font-bold text-amber-500">98.4%</div>
            <div className={`text-xs uppercase tracking-wider font-medium ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              Direct Repeat & Referral Rate
            </div>
            <p className={isLight ? 'text-xs text-slate-600' : 'text-xs text-slate-400'}>
              Families coming back year after year in Nagpur
            </p>
          </div>

          <div
            className={`p-4 space-y-1 border-y md:border-y-0 md:border-x ${
              isLight ? 'border-amber-200' : 'border-slate-800'
            }`}
          >
            <div className="text-3xl md:text-4xl font-serif font-bold text-amber-500">100% Custom</div>
            <div className={`text-xs uppercase tracking-wider font-medium ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              No Cookicutter Group Packages
            </div>
            <p className={isLight ? 'text-xs text-slate-600' : 'text-xs text-slate-400'}>
              Every route tailored specifically for your group
            </p>
          </div>

          <div className="p-4 space-y-1">
            <div className="text-3xl md:text-4xl font-serif font-bold text-amber-500">1-on-1 Access</div>
            <div className={`text-xs uppercase tracking-wider font-medium ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              Director Consultations
            </div>
            <p className={isLight ? 'text-xs text-slate-600' : 'text-xs text-slate-400'}>
              Meet Amol Bodulwar in person in Ayodhya Nagar
            </p>
          </div>
        </div>

        {/* CTA Strip */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onOpenLeadModal('Bespoke Consultation', 'Reviews Section')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition shadow-lg shadow-amber-500/20"
          >
            <HeartHandshake className="w-5 h-5 text-slate-950" />
            <span>Join Hundreds of Delighted Nagpur Travelers — Request Callback</span>
          </button>
        </div>

      </div>
    </section>
  );
};
