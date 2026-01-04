import React from 'react';
import { SectionId } from '../types';
import { IMAGES } from '../constants';

export const Partnerships: React.FC = () => {
  return (
    <section id={SectionId.PARTNERSHIPS} className="py-8 md:py-12 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12">
          <h4 className="text-gray-500 font-bold tracking-widest uppercase mb-2 text-sm">Partnerships & Achievements</h4>
          <h2 className="text-2xl md:text-4xl font-display font-bold text-gray-900 mb-3 leading-tight">
            パートナーシップ
          </h2>
        </div>

        {/* Partnerships Content */}
        <div className="max-w-5xl mx-auto">
          <div className="space-y-12 md:space-y-16">
            
            {/* NATURAL HORSEMAN */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
              <div className="w-full md:w-1/3">
                <h3 className="text-xl md:text-2xl font-display font-bold text-gray-900 mb-4">
                  NATURAL HORSEMAN
                </h3>
              </div>
              <div className="w-full md:w-2/3">
                <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                  ナチュラルホースマンシップの理論に基づいた指導方法を実践しています。馬の自然な習性を尊重し、ストレスをかけない方法で調教・指導を行っています。
                </p>
              </div>
            </div>

            {/* NAO（明野高原キャンプ場） */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
              <div className="w-full md:w-1/3">
                <div className="mb-4">
                  <h3 className="text-xl md:text-2xl font-display font-bold text-gray-900 mb-2">
                    NAO
                  </h3>
                  <p className="text-sm text-gray-600">（明野高原キャンプ場）</p>
                </div>
                {IMAGES.partnerships.nao && (
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
                    <img 
                      src={IMAGES.partnerships.nao} 
                      alt="NAO 明野高原キャンプ場" 
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="w-full md:w-2/3">
                <div className="space-y-4 text-gray-700 leading-relaxed text-base md:text-lg">
                  <p>
                    カズホーストレーニングは、N.A.O.明野高原キャンプ場&貸別荘内で運営しており、標高1,000mの高原で四季折々の美しい景色を楽しみながら乗馬体験ができます。オートキャンプ場100サイトと貸別荘（コテージ）24棟を備えた広大な施設内で、豊かな自然環境の中で活動しています。
                  </p>
                  <p>
                    野外クッキング・ウッドクラフトなど多彩な自然体験教室や、季節ごとのイベント・アクティビティも充実しており、乗馬体験と合わせて様々な自然体験をお楽しみいただけます。
                    <a 
                      href="https://naocorp.jp" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:text-secondary font-semibold underline transition-colors ml-1"
                    >
                      N.A.O.明野高原キャンプ場&貸別荘の公式サイト
                    </a>
                    では、宿泊施設のご予約や詳細情報をご確認いただけます。
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

