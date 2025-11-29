import React, { useState } from 'react';
import { SectionId } from '../types';
import { Button } from './Button';
import { IMAGES, CONTACT_INFO } from '../constants';

export const Hero: React.FC = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <section id={SectionId.HOME} className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden anti-gravity-bg particles">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 bg-primary">
        {IMAGES.hero ? (
          <img 
            src={IMAGES.hero} 
            alt="Western riding in nature" 
            className="w-full h-full object-cover opacity-50"
            onError={(e) => {
              console.error('Hero image failed to load:', IMAGES.hero);
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : null}
        {/* 明るいオーバーレイ */}
        <div className="absolute inset-0 bg-white/20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent"></div>
        {/* アンチグラビティ用の明るいグラデーション */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(199,0,57,0.12),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-blue-200/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Main Logo Brand Mark - アンチグラビティ浮遊効果 */}
        <div className="w-64 md:w-96 mb-8 animate-fade-in-up flex justify-center floating">
           {!imageError ? (
             <div className="w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden glass-logo p-4 md:p-6 flex items-center justify-center transform-3d">
               <img 
                 src={IMAGES.logo} 
                 alt="Kazu Horse Training Logo" 
                 className="w-full h-full object-contain rounded-full card-3d" 
                 style={{ 
                   mixBlendMode: 'multiply',
                   filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5))'
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
        
        <div className="anti-gravity-card rounded-2xl p-6 md:p-10 max-w-3xl mx-auto backdrop-blur-xl bg-white/25 border-white/40 animate-fade-in-up delay-100 floating-slow">
          <p className="text-base md:text-xl mb-6 text-white font-medium leading-relaxed tracking-wide">
            <span className="block mb-3 font-display text-secondary font-bold tracking-widest text-sm md:text-base drop-shadow-lg">EST. GUJO, GIFU</span>
            馬と心が通じ合う、真のホースマンシップ。<br/>
            明野高原の大自然の中で、新しい感動を。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up delay-200">
            <a href={CONTACT_INFO.phoneLink}>
              <Button variant="secondary" size="lg" className="min-w-[200px] shadow-[0_0_30px_rgba(199,0,57,0.6)] hover:shadow-[0_0_40px_rgba(199,0,57,0.8)] transition-all">
                体験予約
              </Button>
            </a>
            <a href={`#${SectionId.ABOUT}`} className="text-white hover:text-secondary transition-colors text-sm font-bold tracking-widest uppercase border-b-2 border-white/40 hover:border-secondary pb-1">
              Discover More
            </a>
          </div>
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