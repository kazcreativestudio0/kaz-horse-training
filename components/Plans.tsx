import React from 'react';
import { SectionId } from '../types';
import { PLANS } from '../constants';
import { Button } from './Button';

export const Plans: React.FC = () => {
  return (
    <section id={SectionId.PLANS} className="py-24 bg-accent">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-2xl">
            <h4 className="text-secondary font-bold tracking-widest uppercase mb-2 text-sm">Plans & Pricing</h4>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-6">Choose Your Ride</h2>
            <p className="text-gray-600">
              初めての方には「体験乗馬」、本格的に学びたい方には「レッスンコース」。<br/>
              目的に合わせて最適なプランをお選びください。
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <div 
              key={plan.id} 
              className={`relative flex flex-col bg-white transition-all duration-300 hover:shadow-xl overflow-hidden ${
                plan.isPopular ? 'border-t-4 border-secondary' : 'border-t-4 border-primary'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-4 right-4 bg-secondary text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider z-10">
                  Popular
                </div>
              )}
              
              {/* Plan Image */}
              {plan.imageUrl ? (
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  <img 
                    src={plan.imageUrl} 
                    alt={plan.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    onError={(e) => {
                      console.error(`Plan image for ${plan.title} failed to load:`, plan.imageUrl);
                      e.currentTarget.src = 'https://via.placeholder.com/800x400?text=Image+Loading';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              ) : (
                <div className="relative h-48 overflow-hidden bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">画像準備中</span>
                </div>
              )}
              
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.title}</h3>
                <p className="text-primary font-display font-bold text-3xl mb-6">{plan.price}</p>
              
              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant={plan.isPopular ? 'secondary' : 'outline'} 
                fullWidth
                size="sm"
              >
                詳しく見る
              </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
            <p className="text-xs text-gray-400">※ハイシーズン（GW・夏休み等）は料金が異なります。</p>
        </div>
      </div>
    </section>
  );
};