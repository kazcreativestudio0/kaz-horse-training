import React from 'react';
import { SectionId } from '../types';
import { IMAGES } from '../constants';

export const About: React.FC = () => {
  return (
    <section id={SectionId.ABOUT} className="py-16 sm:py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Decorative background text - スマホでは非表示または小さく */}
      <div className="absolute top-20 left-0 text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] font-display font-bold text-gray-50 leading-none select-none z-0 opacity-30 sm:opacity-50 hidden sm:block">
        WESTERN
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h4 className="text-secondary font-bold tracking-widest uppercase mb-3 text-xs sm:text-sm">About Us</h4>
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-bold text-primary mb-4 sm:mb-6 leading-tight px-2">
            Simple & Natural Style
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto"></div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16 mb-12 sm:mb-16 md:mb-20">
          
          {/* Image Section */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl">
              {IMAGES.about ? (
                <img 
                  src={IMAGES.about} 
                  alt="Western riding style" 
                  className="w-full h-auto object-cover" 
                  onError={(e) => {
                    console.error('About image failed to load:', IMAGES.about);
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-full aspect-[3/4] bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">画像準備中</span>
                </div>
              )}
            </div>
            {/* Design accents */}
            <div className="absolute -bottom-6 -left-6 w-2/3 h-2/3 bg-primary opacity-20 z-0 rounded-lg"></div>
            <div className="absolute top-6 -right-3 w-16 h-1 bg-secondary z-20"></div>
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2">
            <div className="space-y-4 sm:space-y-6 text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
              <p className="text-base sm:text-lg md:text-xl font-medium text-primary">
                カズホーストレーニングは、岐阜県郡上市の標高1,000m、明野高原キャンプ場内にある乗馬クラブです。
              </p>
              <p className="leading-relaxed">
                元ブリティッシュインストラクターの経験を持つ代表が、現在は馬の心理を重視したウエスタン流のホースマンシップを指導しています。
              </p>
              <p className="leading-relaxed">
                私たちのスタイルはシンプルです。「馬に乗せてもらう」のではなく、あなたが主体となって馬とコミュニケーションを取る。
                手綱を通じて伝わる馬の温もりと意思を感じながら、人馬一体となる喜びを提供します。
              </p>
            </div>

            {/* Feature Cards */}
            <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="border-l-4 border-secondary pl-6 py-4 bg-gray-50 rounded-r-lg">
                <h3 className="text-xl font-bold text-primary mb-2">Communication</h3>
                <p className="text-sm text-gray-600 leading-relaxed">馬と向き合い、心を通わせる<br/>マンツーマン指導</p>
              </div>
              <div className="border-l-4 border-primary pl-6 py-4 bg-gray-50 rounded-r-lg">
                <h3 className="text-xl font-bold text-primary mb-2">Location</h3>
                <p className="text-sm text-gray-600 leading-relaxed">四季を感じる明野高原の<br/>大自然と開放感</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        {IMAGES.aboutGallery && IMAGES.aboutGallery.length > 0 && (
          <div className="mt-12 sm:mt-16 md:mt-20">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-center text-primary mb-8 sm:mb-12">Gallery</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {IMAGES.aboutGallery.map((img, idx) => (
                <div key={idx} className="relative overflow-hidden group cursor-pointer aspect-square bg-gray-100 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                  {img ? (
                    <img 
                      src={img} 
                      alt={`Gallery ${idx + 1}`} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        console.error(`Gallery image ${idx + 1} failed to load:`, img);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <span className="text-gray-400 text-xs">画像準備中</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};