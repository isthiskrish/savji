import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DestinationsSection } from './components/DestinationsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactFooterSection } from './components/ContactFooterSection';
import { CallbackModal } from './components/CallbackModal';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthProvider } from './contexts/AuthContext';
import { Sparkles, Phone, Compass, MapPin } from 'lucide-react';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState('');
  const [sourceTag, setSourceTag] = useState('');
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');

  // Basic client route check
  const isAdminRoute = window.location.pathname === '/admin';

  const handleOpenLeadModal = (dest = '', source = '') => {
    setSelectedDestination(dest);
    setSourceTag(source);
    setModalOpen(true);
  };

  const toggleTheme = () => {
    setThemeMode(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  if (isAdminRoute) {
    return (
      <AuthProvider>
        <AdminDashboard />
      </AuthProvider>
    );
  }

  const isLight = themeMode === 'light';

  return (
    <AuthProvider>
      <div
        className={`min-h-screen font-sans transition-colors duration-500 ${
          isLight
            ? 'bg-amber-50/40 text-slate-900 selection:bg-amber-400 selection:text-slate-950'
            : 'bg-slate-950 text-slate-100 selection:bg-amber-400 selection:text-slate-950'
        }`}
      >
        
        {/* Navigation Bar */}
        <Navbar
          onOpenLeadModal={handleOpenLeadModal}
          themeMode={themeMode}
          onToggleTheme={toggleTheme}
        />

        {/* Main Content Sections */}
        <main>
          {/* Hero Section */}
          <HeroSection onOpenLeadModal={handleOpenLeadModal} themeMode={themeMode} />

          {/* Value Proposition Strip */}
          <section
            className={`border-y py-8 transition-colors duration-500 ${
              isLight
                ? 'bg-gradient-to-r from-amber-100/80 via-amber-50 to-amber-100/80 border-amber-200/80 text-slate-900'
                : 'bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border-amber-500/20 text-slate-100'
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-4 p-2">
                  <div
                    className={`p-3 rounded-full shrink-0 border ${
                      isLight
                        ? 'bg-amber-500/15 text-amber-700 border-amber-400/40'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    }`}
                  >
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h4
                      className={`font-serif font-bold text-base ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      Unlisted Luxury Villas
                    </h4>
                    <p className={isLight ? 'text-slate-600 text-xs' : 'text-slate-300 text-xs'}>
                      Private holds in Maldives, Alps & Bali
                    </p>
                  </div>
                </div>

                <div
                  className={`flex items-center justify-center md:justify-start gap-4 p-2 border-y md:border-y-0 md:border-x ${
                    isLight ? 'border-amber-200/80' : 'border-slate-800'
                  }`}
                >
                  <div
                    className={`p-3 rounded-full shrink-0 border ${
                      isLight
                        ? 'bg-amber-500/15 text-amber-700 border-amber-400/40'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    }`}
                  >
                    <Compass className="w-6 h-6" />
                  </div>
                  <div>
                    <h4
                      className={`font-serif font-bold text-base ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      Zero Algorithm Generic Tours
                    </h4>
                    <p className={isLight ? 'text-slate-600 text-xs' : 'text-slate-300 text-xs'}>
                      Curated manually by Director Amol Bodulwar
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-center md:justify-start gap-4 p-2">
                  <div
                    className={`p-3 rounded-full shrink-0 border ${
                      isLight
                        ? 'bg-amber-500/15 text-amber-700 border-amber-400/40'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    }`}
                  >
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4
                      className={`font-serif font-bold text-base ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      Ayodhya Nagar Studio
                    </h4>
                    <p className={isLight ? 'text-slate-600 text-xs' : 'text-slate-300 text-xs'}>
                      Nagpur's trusted offline travel partner
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Destinations Grid Section */}
          <DestinationsSection onOpenLeadModal={handleOpenLeadModal} themeMode={themeMode} />

          {/* Reviews & Social Proof Section */}
          <ReviewsSection onOpenLeadModal={handleOpenLeadModal} themeMode={themeMode} />

          {/* Footer & Office Location Section */}
          <ContactFooterSection onOpenLeadModal={handleOpenLeadModal} themeMode={themeMode} />
        </main>

        {/* Lead Capture Modal */}
        <CallbackModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          defaultDestination={selectedDestination}
          sourceText={sourceTag}
        />

        {/* Floating Callback Sticky Button for Mobile */}
        <div className="fixed bottom-4 right-4 z-30 sm:hidden">
          <button
            onClick={() => handleOpenLeadModal('General Consultation', 'Floating Mobile Button')}
            className="px-4 py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-2xl shadow-amber-500/40 flex items-center gap-2 border border-amber-300"
          >
            <Phone className="w-4 h-4 fill-slate-950" />
            <span>Callback</span>
          </button>
        </div>

      </div>
    </AuthProvider>
  );
}
