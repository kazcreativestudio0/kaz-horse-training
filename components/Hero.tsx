import React, { useState } from 'react';
import { SectionId } from '../types';
import { Button } from './Button';
import { IMAGES, CONTACT_INFO } from '../constants';

export const Hero: React.FC = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <section id={SectionId.HOME} className="relative min-h-[70vh] md:min-h-screen flex items-center justify-center py-12 md:py-0 anti-gravity-bg">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-primary">
        {IMAGES.hero ? (
          <img 
            src={IMAGES.hero} 
            alt="Western riding in nature" 
            className="w-full h-full object-contain"
            loading="eager"
            onError={(e) => {
              console.error('Hero image failed to load:', IMAGES.hero);
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : null}
      </div>

      {/* Differentiation Message - Top Left */}
      <div className="absolute top-28 md:top-24 left-4 md:left-8 z-20 animate-fade-in-up">
        <p className="text-white font-bold text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl tracking-wide drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
          <span className="text-secondary">東海3県で、唯一の</span>
          <span className="text-white font-extrabold ml-1 md:ml-2">ウエスタン乗馬クラブ</span>
        </p>
      </div>

      {/* Content */}
      <div className="relative z-10 text-white px-4 max-w-5xl mx-auto flex flex-col items-center py-8 md:py-0 md:mt-48 lg:mt-56">
        
        <div className="w-full max-w-5xl mx-auto animate-fade-in-up delay-200 px-4 mt-12 md:mt-16">
          <div className="flex flex-row items-start justify-start gap-3 sm:gap-4 md:gap-6 lg:gap-8 mt-20 md:mt-24">
            <h2 className="hero-text text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-emotional font-semibold text-white leading-tight tracking-wide drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] flex-1 text-left">
            </h2>
            
            <div className="flex-shrink-0 animate-fade-in-up delay-300">
              <a href={CONTACT_INFO.phoneLink}>
                <Button variant="secondary" size="lg" className="shadow-[0_0_20px_rgba(199,0,57,0.5)] hover:shadow-[0_0_30px_rgba(199,0,57,0.7)] transition-shadow whitespace-nowrap">
                  電話で体験予約
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
};