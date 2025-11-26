import React, { useState } from 'react';
import { SectionId } from '../types';
import { Button } from './Button';
import { IMAGES, CONTACT_INFO } from '../constants';

export const Hero: React.FC = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <section id={SectionId.HOME} className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
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
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Main Logo Brand Mark */}
        <div className="w-64 md:w-96 mb-8 animate-fade-in-up flex justify-center">
           {!imageError ? (
             <div className="w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden bg-white/90 backdrop-blur-sm p-4 md:p-6 flex items-center justify-center shadow-2xl border-4 border-white/60">
               <img 
                 src={IMAGES.logo} 
                 alt="Kazu Horse Training Logo" 
                 className="w-full h-full object-contain rounded-full" 
                 style={{ 
                   mixBlendMode: 'multiply',
                   filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))'
                 }}
                 onError={() => setImageError(true)}
               />
             </div>
           ) : (
             <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter text-white drop-shadow-lg">
               KAZ<br/>
               <span className="text-2xl md:text-4xl tracking-widest font-sans font-normal">HORSE TRAINING</span>
             </h1>
           )}
        </div>
        
        <p className="text-base md:text-xl mb-10 max-w-2xl mx-auto text-gray-100 font-medium leading-relaxed tracking-wide animate-fade-in-up delay-100">
          <span className="block mb-2 font-display text-secondary font-bold tracking-widest text-sm md:text-base">EST. GUJO, GIFU</span>
          馬と心が通じ合う、真のホースマンシップ。<br/>
          明野高原の大自然の中で、新しい感動を。
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up delay-200">
          <a href={CONTACT_INFO.phoneLink}>
            <Button variant="secondary" size="lg" className="min-w-[200px] shadow-[0_0_20px_rgba(199,0,57,0.5)]">
              体験予約
            </Button>
          </a>
          <a href={`#${SectionId.ABOUT}`} className="text-white hover:text-secondary transition-colors text-sm font-bold tracking-widest uppercase border-b-2 border-white/30 hover:border-secondary pb-1">
            Discover More
          </a>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 animate-bounce">
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </section>
  );
};