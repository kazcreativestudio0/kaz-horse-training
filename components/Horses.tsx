import React from 'react';
import { SectionId } from '../types';
import { HORSES, IMAGES } from '../constants';

export const Horses: React.FC = () => {
  // 追加のギャラリー画像（メイン3頭以外）
  const additionalHorseImages = IMAGES.horses.slice(3);

  return (
    <section id={SectionId.HORSES} className="py-24 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h4 className="text-secondary font-bold tracking-widest uppercase mb-2 text-sm">Our Partners</h4>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Meet The Horses</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            カズホーストレーニングの主役たち。穏やかで人懐っこい彼らとの出会いが、あなたの心を癒します。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {HORSES.map((horse) => (
            <div key={horse.id} className="group cursor-pointer">
              <div className="relative overflow-hidden mb-6 aspect-[4/3] bg-gray-800 rounded-lg">
                {horse.imageUrl ? (
                  <img 
                    src={horse.imageUrl} 
                    alt={horse.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    onError={(e) => {
                      console.error(`Horse image for ${horse.name} failed to load:`, horse.imageUrl);
                      e.currentTarget.src = 'https://via.placeholder.com/800x600?text=Image+Loading';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-800">
                    <span className="text-gray-500 text-sm">画像準備中</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/20 transition-colors duration-300"></div>
              </div>
              <div className="border-l-2 border-secondary pl-4 transition-all duration-300 group-hover:border-white">
                <h3 className="text-2xl font-bold mb-1">{horse.name}</h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{horse.breed}</p>
                <p className="text-sm text-gray-300 leading-relaxed opacity-80 group-hover:opacity-100">
                  {horse.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Gallery */}
        {additionalHorseImages && additionalHorseImages.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-display font-bold text-center mb-8 text-secondary">Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {additionalHorseImages.map((img, idx) => (
                <div key={idx} className="relative overflow-hidden group cursor-pointer aspect-square bg-gray-800 rounded-lg">
                  {img ? (
                    <img 
                      src={img} 
                      alt={`Horse gallery ${idx + 1}`} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                      onError={(e) => {
                        console.error(`Horse gallery image ${idx + 1} failed to load:`, img);
                        e.currentTarget.src = 'https://via.placeholder.com/800x800?text=Image+Loading';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800">
                      <span className="text-gray-500 text-sm">画像準備中</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/20 transition-colors duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};