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
        {/* PC版: 1つの画像を表示 */}
        <div className="hidden md:block w-full h-full">
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
        
        {/* スマホ版: 複数の画像を横に並べて表示 */}
        <div className="md:hidden w-full h-full flex overflow-x-auto">
          {IMAGES.heroImages && IMAGES.heroImages.length > 0 ? (
            IMAGES.heroImages.map((img, index) => (
              <img 
                key={index}
                src={img} 
                alt={`Western riding ${index + 1}`} 
                className="w-full h-full object-cover flex-shrink-0"
                style={{ minWidth: '100%' }}
                loading={index === 0 ? "eager" : "lazy"}
                onError={(e) => {
                  console.error(`Hero image ${index + 1} failed to load:`, img);
                  e.currentTarget.style.display = 'none';
                }}
              />
            ))
          ) : IMAGES.hero ? (
            <img 
              src={IMAGES.hero} 
              alt="Western riding in nature" 
              className="w-full h-full object-contain flex-shrink-0"
              style={{ minWidth: '100%' }}
              loading="eager"
              onError={(e) => {
                console.error('Hero image failed to load:', IMAGES.hero);
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : null}
        </div>
      </div>

      {/* Differentiation Message - Top Left */}
      <div className="absolute top-28 md:top-24 left-4 md:left-8 z-20 animate-fade-in-up">
        <p className="text-white font-bold text-xl md:text-2xl tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
          <span className="text-secondary">東海三県で、唯一の</span>
          <br className="md:hidden" />
          <span className="text-white font-extrabold md:ml-2">ウエスタン乗馬クラブ</span>
        </p>
      </div>

      {/* Content */}
      <div className="relative z-10 text-white px-4 max-w-5xl mx-auto flex flex-col items-center py-8 md:py-0 md:mt-48">
        
        <div className="w-full max-w-5xl mx-auto animate-fade-in-up delay-200 px-4 mt-48 md:mt-16">
          <div className="flex flex-row items-start justify-start gap-3 md:gap-6 mt-20 md:mt-24">
            <h2 className="hero-text text-base md:text-xl font-emotional font-semibold text-white leading-tight tracking-wide drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] flex-1 text-left">
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