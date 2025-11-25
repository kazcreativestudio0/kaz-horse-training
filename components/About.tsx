import React from 'react';
import { SectionId } from '../types';
import { IMAGES } from '../constants';

export const About: React.FC = () => {
  return (
    <section id={SectionId.ABOUT} className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background text */}
      <div className="absolute top-20 left-0 text-[10rem] font-display font-bold text-gray-50 leading-none select-none z-0">
        WESTERN
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="w-full lg:w-1/2 relative">
            <div className="relative z-10">
              {IMAGES.about && (
                <img 
                  src={IMAGES.about} 
                  alt="Western riding style" 
                  className="w-full h-auto object-cover shadow-2xl rounded-lg" 
                  onError={(e) => {
                    console.error('About image failed to load:', IMAGES.about);
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
            </div>
            {/* Design accents */}
            <div className="absolute -bottom-8 -left-8 w-2/3 h-2/3 bg-primary z-0"></div>
            <div className="absolute top-8 -right-4 w-20 h-1 bg-secondary z-20"></div>
          </div>

          <div className="w-full lg:w-1/2">
            <h4 className="text-secondary font-bold tracking-widest uppercase mb-2 text-sm">About Us</h4>
            <h2 className="text-primary font-display text-4xl lg:text-5xl font-bold mb-8 leading-tight">
              Simple &<br/>
              Natural Style
            </h2>
            
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                カズホーストレーニングは、岐阜県郡上市の標高1,000m、明野高原キャンプ場内にある乗馬クラブです。
                元ブリティッシュインストラクターの経験を持つ代表が、現在は馬の心理を重視したウエスタン流のホースマンシップを指導しています。
              </p>
              <p>
                私たちのスタイルはシンプルです。「馬に乗せてもらう」のではなく、あなたが主体となって馬とコミュニケーションを取る。
                手綱を通じて伝わる馬の温もりと意思を感じながら、人馬一体となる喜びを提供します。
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-8">
              <div className="border-l-4 border-secondary pl-6">
                <h3 className="text-xl font-bold text-primary mb-2">Communication</h3>
                <p className="text-sm text-gray-500">馬と向き合い、心を通わせる<br/>マンツーマン指導</p>
              </div>
              <div className="border-l-4 border-primary pl-6">
                <h3 className="text-xl font-bold text-primary mb-2">Location</h3>
                <p className="text-sm text-gray-500">四季を感じる明野高原の<br/>大自然と開放感</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        {IMAGES.aboutGallery && IMAGES.aboutGallery.length > 0 && (
          <div className="mt-24 grid grid-cols-2 md:grid-cols-3 gap-4">
            {IMAGES.aboutGallery.map((img, idx) => (
              <div key={idx} className="relative overflow-hidden group cursor-pointer aspect-square bg-gray-100 rounded-lg">
                {img && (
                  <img 
                    src={img} 
                    alt={`Gallery ${idx + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      console.error(`Gallery image ${idx + 1} failed to load:`, img);
                      e.currentTarget.src = 'https://via.placeholder.com/800x800?text=Image+Loading';
                    }}
                  />
                )}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};