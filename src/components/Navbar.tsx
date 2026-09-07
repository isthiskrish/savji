import React, { useState, useEffect } from 'react';
import { Sparkles, MapPin, Menu, X, Lock, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  onOpenLeadModal: (dest?: string, source?: string) => void;
  themeMode?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenLeadModal, themeMode = 'light', onToggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLight = themeMode === 'light';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? isLight
            ? 'bg-amber-50/95 backdrop-blur-md border-b border-amber-300/40 shadow-lg py-3'
            : 'bg-slate-950/95 backdrop-blur-md border-b border-amber-500/20 shadow-xl py-3'
          : isLight
          ? 'bg-gradient-to-b from-amber-100/90 via-amber-50/60 to-transparent py-5'
          : 'bg-gradient-to-b from-slate-950/90 via-slate-950/50 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo & Hindi Name */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-300 flex items-center justify-center text-slate-950 font-bold font-serif text-xl shadow-lg shadow-amber-500/20 group-hover:scale-105 transition">
            AH
          </div>
          <div>
            <div
              className={`text-lg md:text-xl font-serif font-extrabold tracking-tight flex items-center gap-1.5 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              <span>Ananddam Holidays</span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
            <div
              className={`text-[11px] font-serif tracking-widest uppercase ${
                isLight ? 'text-amber-700 font-semibold' : 'text-amber-300/90'
              }`}
            >
              आनंददाम हॉलीडेज • Nagpur
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div
          className={`hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider ${
            isLight ? 'text-slate-700' : 'text-slate-300'
          }`}
        >
          <a href="#destinations" className="hover:text-amber-600 transition">
            Secret Destinations
          </a>
          <a href="#reviews" className="hover:text-amber-600 transition">
            Nagpur Reviews
          </a>
          <a href="#location" className="hover:text-amber-600 transition flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-amber-500" />
            Ayodhya Nagar Office
          </a>
        </div>

        {/* Call-to-action & Theme Toggle & Admin Link */}
        <div className="hidden sm:flex items-center gap-3">
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-lg border transition flex items-center gap-1.5 text-xs font-medium ${
                isLight
                  ? 'bg-amber-100/80 border-amber-300/60 text-slate-800 hover:bg-amber-200/80'
                  : 'bg-slate-900 border-slate-800 text-amber-300 hover:bg-slate-800'
              }`}
              title="Toggle Light/Dark Theme"
            >
              {isLight ? (
                <>
                  <Moon className="w-4 h-4 text-slate-800" />
                  <span className="hidden md:inline">Dark</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="hidden md:inline">Light</span>
                </>
              )}
            </button>
          )}

          <a
            href="/admin"
            className={`p-2 transition ${
              isLight ? 'text-slate-600 hover:text-amber-700' : 'text-slate-400 hover:text-amber-300'
            }`}
            title="Agent Admin Login"
          >
            <Lock className="w-4 h-4" />
          </a>

          <button
            onClick={() => onOpenLeadModal('General Consultation', 'Navbar CTA')}
            className="px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition shadow-md shadow-amber-500/20"
          >
            Request Callback
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 sm:hidden">
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-lg border text-xs ${
                isLight
                  ? 'bg-amber-100 border-amber-300 text-slate-800'
                  : 'bg-slate-900 border-slate-800 text-amber-300'
              }`}
            >
              {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          )}

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className={`p-2 rounded-lg border ${
              isLight
                ? 'bg-amber-100 border-amber-300 text-slate-800'
                : 'bg-slate-900 border-slate-800 text-slate-200'
            }`}
            aria-label="Toggle Menu"
          >
            {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenu && (
        <div
          className={`md:hidden px-4 py-6 space-y-4 animate-fade-in border-b ${
            isLight
              ? 'bg-amber-50 border-amber-200 text-slate-900'
              : 'bg-slate-950 border-amber-500/20 text-slate-200'
          }`}
        >
          <div className="flex flex-col space-y-3 text-sm font-medium">
            <a
              href="#destinations"
              onClick={() => setMobileMenu(false)}
              className="py-2 border-b border-slate-700/20 hover:text-amber-600"
            >
              Secret Destinations
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenu(false)}
              className="py-2 border-b border-slate-700/20 hover:text-amber-600"
            >
              Nagpur Reviews
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenu(false)}
              className="py-2 border-b border-slate-700/20 hover:text-amber-600 flex items-center justify-between"
            >
              <span>Ayodhya Nagar Studio</span>
              <span className="text-xs text-amber-600 font-sans">Open 'til 7 PM</span>
            </a>
            <a
              href="/admin"
              onClick={() => setMobileMenu(false)}
              className="py-2 text-slate-500 hover:text-amber-600 flex items-center gap-2"
            >
              <Lock className="w-4 h-4 text-amber-500" />
              <span>Agent Admin Dashboard</span>
            </a>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenu(false);
                onOpenLeadModal('General Consultation', 'Mobile Menu CTA');
              }}
              className="w-full py-3 rounded-lg text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 font-bold text-xs uppercase tracking-wider"
            >
              Request Immediate Callback
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
