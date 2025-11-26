import React from 'react';
import { SectionId } from '../types';
import { IMAGES } from '../constants';

export const Contact: React.FC = () => {
  return (
    <section id={SectionId.ACCESS} className="py-16 sm:py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h4 className="text-secondary font-bold tracking-widest uppercase mb-3 text-xs sm:text-sm">Contact & Access</h4>
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-bold text-primary mb-4 sm:mb-6 px-2">Get In Touch</h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-4 sm:mb-6"></div>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-2">
            体験乗馬のご予約、レッスンのご相談など、お気軽にお問い合わせください。<br className="hidden sm:block"/>
            馬の準備のため、事前のご連絡をお願いいたします。
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          
          {/* Contact Information */}
          <div className="bg-gradient-to-br from-primary to-primary/90 text-white p-6 sm:p-8 md:p-12 lg:p-16 rounded-lg shadow-2xl flex flex-col justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold mb-4 sm:mb-6">Contact Information</h3>
              
              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-300 uppercase tracking-wider mb-1 sm:mb-2">Phone</p>
                    <a href="tel:0575726785" className="text-xl sm:text-2xl md:text-3xl font-bold text-white hover:text-secondary transition-colors block">
                      0575-72-6785
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-300 uppercase tracking-wider mb-1 sm:mb-2">Address</p>
                    <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                      〒501-5304<br/>
                      岐阜県郡上市高鷲町鮎立5434<br/>
                      <span className="text-xs sm:text-sm text-gray-300">(N.A.O.明野高原キャンプ場内)</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-300 uppercase tracking-wider mb-1 sm:mb-2">Access</p>
                    <p className="text-xs sm:text-sm md:text-base text-gray-200 leading-relaxed">
                      東海北陸自動車道「高鷲IC」より<br/>車で5〜10分
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="mt-6 sm:mt-10">
              <div className="w-full h-40 sm:h-48 bg-gray-800/50 relative overflow-hidden rounded-lg hover:bg-gray-800/70 transition-all duration-300 cursor-pointer group">
                {IMAGES.map ? (
                  <img 
                    src={IMAGES.map} 
                    alt="Map" 
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity" 
                    onError={(e) => {
                      console.error('Map image failed to load:', IMAGES.map);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800/50"></div>
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-xs sm:text-sm font-bold tracking-widest border-2 border-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-white hover:text-primary transition-colors">
                    VIEW GOOGLE MAP
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};