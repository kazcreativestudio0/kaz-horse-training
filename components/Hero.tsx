import React, { useState } from 'react';
import { SectionId } from '../types';
import { Button } from './Button';
import { IMAGES, CONTACT_INFO } from '../constants';

export const Hero: React.FC = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <section id={SectionId.HOME} className="relative min-h-[70vh] md:min-h-screen flex items-center justify-center py-12 md:py-0 anti-gravity-bg">
      {/* Background Image with Overlay - 統合版 */}
      <div className="absolute inset-0 z-0 bg-primary">
        {IMAGES.hero ? (
          <img 
            src={IMAGES.hero} 
            alt="Western riding in nature" 
            className="w-full h-full object-cover opacity-50"
            loading="eager"
            onError={(e) => {
              console.error('Hero image failed to load:', IMAGES.hero);
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : null}
        {/* 統合オーバーレイ - パフォーマンス最適化 */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto flex flex-col items-center py-8 md:py-0 md:mt-24">
        
        {/* Differentiation Message - Top */}
        <div className="mb-6 md:mb-8 animate-fade-in-up">
          <p className="text-white font-bold text-xl md:text-3xl lg:text-4xl tracking-wide drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            <span className="text-secondary">東海3県で、唯一の</span>
            <br className="md:hidden" />
            <span className="text-white font-extrabold ml-1 md:ml-2">ウエスタン乗馬クラブ</span>
          </p>
        </div>
        
        {/* Main Logo Brand Mark */}
        <div className="w-40 md:w-56 lg:w-80 mb-4 md:mb-6 animate-fade-in-up delay-100 flex justify-center">
           {!imageError ? (
             <div className="w-40 h-40 md:w-56 md:h-56 lg:w-80 lg:h-80 rounded-full overflow-hidden glass-logo p-2 md:p-3 lg:p-4 flex items-center justify-center">
               <img 
                 src={IMAGES.logo} 
                 alt="Kazu Horse Training Logo" 
                 className="w-full h-full object-contain rounded-full" 
                 loading="eager"
                 style={{ 
                   filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))'
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
        
        <div className="w-full max-w-5xl mx-auto animate-fade-in-up delay-200 px-4">
          <p className="block mb-2 md:mb-4 font-display text-secondary font-bold tracking-widest text-xs md:text-sm drop-shadow-lg">EST. GUJO, GIFU</p>
          
          <h2 className="hero-text text-lg md:text-3xl lg:text-4xl font-emotional font-semibold text-white mb-4 md:mb-8 leading-tight tracking-wide drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            <div className="block">
              馬と心が通じ合う、真のホースマンシップ。
            </div>
            <div className="block mt-1 md:mt-2 text-base md:text-2xl lg:text-3xl font-light">
              明野高原の大自然の中で、新しい感動を。
            </div>
          </h2>
          
          <div className="flex justify-center items-center animate-fade-in-up delay-300 mt-3 md:mt-6">
            <a href={CONTACT_INFO.phoneLink}>
              <Button variant="secondary" size="lg" className="shadow-[0_0_20px_rgba(199,0,57,0.5)] hover:shadow-[0_0_30px_rgba(199,0,57,0.7)] transition-shadow">
                体験予約
              </Button>
            </a>
          </div>
        </div>
      </div>
      
    </section>
  );
};