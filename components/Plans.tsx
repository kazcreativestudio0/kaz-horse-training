import React from 'react';
import { SectionId } from '../types';
import { PLANS } from '../constants';
import { Button } from './Button';

export const Plans: React.FC = () => {
  return (
    <section id={SectionId.PLANS} className="py-20 md:py-32 bg-gradient-to-b from-accent to-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-20">
          <h4 className="text-secondary font-bold tracking-widest uppercase mb-3 text-xs md:text-sm">Plans & Pricing</h4>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-primary mb-6">Choose Your Ride</h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
            初めての方には「体験乗馬」、本格的に学びたい方には「レッスンコース」。<br/>
            目的に合わせて最適なプランをお選びください。
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {PLANS.map((plan) => (
            <div 
              key={plan.id} 
              className={`relative flex flex-col bg-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 overflow-hidden ${
                plan.isPopular ? 'border-2 border-secondary md:scale-105' : 'border-2 border-gray-200'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-0 right-0 bg-secondary text-white text-xs font-bold px-4 py-2 text-center uppercase tracking-wider z-10">
                  ⭐ Popular
                </div>
              )}
              
              {/* Plan Image */}
              {plan.imageUrl ? (
                <div className={`relative h-48 overflow-hidden bg-gray-200 ${plan.isPopular ? 'mt-8' : ''}`}>
                  <img 
                    src={plan.imageUrl} 
                    alt={plan.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    onError={(e) => {
                      console.error(`Plan image for ${plan.title} failed to load:`, plan.imageUrl);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              ) : (
                <div className={`relative h-48 overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center ${plan.isPopular ? 'mt-8' : ''}`}>
                  <span className="text-gray-400 text-sm">画像準備中</span>
                </div>
              )}
              
              <div className={`p-6 md:p-8 flex flex-col flex-1 ${plan.isPopular ? '' : ''}`}>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">{plan.title}</h3>
                <p className="text-primary font-display font-bold text-3xl md:text-4xl mb-6">{plan.price}</p>
              
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm md:text-base text-gray-600">
                      <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></span>
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-4 text-center">{plan.recommendedFor}</p>
                  <Button 
                    variant={plan.isPopular ? 'secondary' : 'outline'} 
                    fullWidth
                    size="sm"
                    className="font-bold"
                  >
                    詳しく見る
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-xs md:text-sm text-gray-500 bg-white/50 px-4 py-2 rounded-lg inline-block">
            ※ハイシーズン（GW・夏休み等）は料金が異なります。詳細はお問い合わせください。
          </p>
        </div>
      </div>
    </section>
  );
};