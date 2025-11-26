import React, { useState } from 'react';
import { SectionId } from '../types';
import { Button } from './Button';
import { IMAGES, CONTACT_INFO } from '../constants';

export const Hero: React.FC = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <section id={SectionId.HOME} className="relative h-screen min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden pt-20 md:pt-0">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 bg-primary">
        {IMAGES.hero ? (
          <img 
            src={IMAGES.hero} 
            alt="Western riding in nature" 
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error('Hero image failed to load:', IMAGES.hero);
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : null}
        {/* Navy overlay for better text contrast */}
        <div className="absolute inset-0 bg-primary/50 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Main Logo Brand Mark */}
        <div className="w-48 sm:w-64 md:w-96 mb-6 md:mb-8 animate-fade-in-up flex justify-center">
           {!imageError ? (
             <img 
               src={IMAGES.logo} 
               alt="Kazu Horse Training Logo" 
               className="w-full h-auto drop-shadow-2xl" 
               onError={() => setImageError(true)}
             />
           ) : (
             <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-bold tracking-tighter text-white drop-shadow-lg">
               KAZ<br/>
               <span className="text-xl sm:text-2xl md:text-4xl tracking-widest font-sans font-normal">HORSE TRAINING</span>
             </h1>
           )}
        </div>
        
        <p className="text-sm sm:text-base md:text-xl mb-6 md:mb-10 max-w-2xl mx-auto text-gray-100 font-medium leading-relaxed tracking-wide animate-fade-in-up delay-100 px-2">
          <span className="block mb-2 font-display text-secondary font-bold tracking-widest text-xs sm:text-sm md:text-base">EST. GUJO, GIFU</span>
          馬と心が通じ合う、真のホースマンシップ。<br className="hidden sm:block"/>
          <span className="sm:hidden">明野高原の大自然の中で、</span><span className="hidden sm:inline">明野高原の大自然の中で、</span>新しい感動を。
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full sm:w-auto animate-fade-in-up delay-200 px-4">
          <a href={CONTACT_INFO.phoneLink} className="w-full sm:w-auto">
            <Button variant="secondary" size="lg" className="w-full sm:min-w-[200px] shadow-[0_0_20px_rgba(199,0,57,0.5)] text-base sm:text-lg py-4">
              体験予約
            </Button>
          </a>
          <a href={`#${SectionId.ABOUT}`} className="text-white hover:text-secondary transition-colors text-xs sm:text-sm font-bold tracking-widest uppercase border-b-2 border-white/30 hover:border-secondary pb-1 whitespace-nowrap">
            Discover More
          </a>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 animate-bounce">
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </section>
  );
};