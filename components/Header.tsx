import React, { useState, useEffect } from 'react';
import { APP_NAME, NAV_ITEMS, IMAGES, CONTACT_INFO } from '../constants';
import { Button } from './Button';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-primary shadow-lg py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo Area */}
        <a href="#" className="flex items-center gap-2 z-50 group">
          <div className={`transition-all duration-300 flex items-center ${isScrolled ? 'h-10' : 'h-14 sm:h-16 md:h-20'}`}>
            {!imageError ? (
              <img 
                src={IMAGES.logo} 
                alt={APP_NAME} 
                className="h-full w-auto object-contain drop-shadow-md"
                onError={() => setImageError(true)}
              />
            ) : (
              // Fallback text if image fails to load
              <div className="flex flex-col">
                <span className="font-display font-bold text-white text-lg sm:text-xl md:text-2xl tracking-tighter leading-none">KAZU</span>
                <span className="font-sans text-[9px] sm:text-[10px] md:text-xs text-white tracking-widest opacity-80 leading-none">HORSE TRAINING</span>
              </div>
            )}
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              className="text-sm font-bold tracking-widest whitespace-nowrap text-white hover:text-secondary transition-colors relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <a href={CONTACT_INFO.phoneLink}>
            <Button variant="secondary" size="sm" className="whitespace-nowrap shadow-lg hover:bg-white hover:text-secondary border-2 border-transparent hover:border-secondary">
              体験予約
            </Button>
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden z-50 text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="p-2 rounded-md hover:bg-white/10 transition-colors">
             <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isMenuOpen ? <path d="M18 6 6 18M6 6l12 12"/> : <path d="M3 12h18M3 6h18M3 18h18"/>}
            </svg>
          </div>
        </button>

        {/* Mobile Nav Overlay */}
        <div 
          className={`fixed inset-0 bg-primary/95 backdrop-blur-sm z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-300 md:hidden ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              className="text-2xl font-display font-bold text-white tracking-widest hover:text-secondary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a href={CONTACT_INFO.phoneLink} onClick={() => setIsMenuOpen(false)}>
            <Button variant="secondary" size="lg">
              予約する
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
};