import React, { useState } from 'react';
import { SectionId } from '../types';
import { HORSES, IMAGES, CONTACT_INFO } from '../constants';
import { Button } from './Button';

// 馬のカテゴリごとの詳細情報（前情報を参照）
const HORSE_DETAILS: Record<string, {
  name: string;
  breed: string;
  description: string;
  characteristics: string;
  suitableFor: string;
  programs: string;
  care: string;
}> = {
  'h1': {
    name: 'ウエスタンホース',
    breed: 'クォーターホース種など',
    description: 'カズホーストレーニングの馬たちは、ウエスタン競技で活躍できるよう丁寧に調教されています。とても穏やかで人懐っこく、初心者の方でも安心して騎乗できます。ウエスタンスタイルの乗馬に最適化された馬たちで、カウボーイ文化にルーツを持つカジュアルな乗馬スタイルを楽しむことができます。',
    characteristics: 'ウエスタンホースは、特にクォーターホース種を中心とした馬たちです。ウエスタン競技で活躍できるよう、丁寧に調教されており、非常に穏やかで人懐っこい性格が特徴です。初心者の方でも安心して騎乗できるよう、十分に訓練されています。ウエスタンは鞍が大きく安定感があるため、初めての方でも安心感があります。これらの馬たちは、ナチュラルホースマンシップ（馬の自然な習性に沿った調教法）を取り入れた丁寧なトレーニングを受けており、馬にストレスをかけない方法で調教されています。',
    suitableFor: '初心者から経験者まで、幅広いレベルの方におすすめです。特にウエスタンスタイルの乗馬を楽しみたい方、カジュアルで気軽な乗馬体験を求めている方に最適です。ウエスタンは格式ばらず気軽に体験できるスタイルなので、初めて乗馬に挑戦する方にも安心してご利用いただけます。',
    programs: 'ウエスタンホースは、体験乗馬（ショート・ロング）から本格的なレッスンまで、様々なプログラムでご利用いただけます。マンツーマンレッスンでは、インストラクターが利用者一人ひとりのペースに合わせて指導します。ウエスタン乗馬のスキルを学びたい方、競技に参加したい方にも対応しています。',
    care: '当クラブでは、馬の健康と安全を最優先に考えています。すべての馬たちは定期的な健康チェックを受け、適切な栄養管理と運動管理が行われています。馬への愛情と理解を大切にし、ストレスをかけない環境で育てられています。'
  },
  'h2': {
    name: '和種馬・ポニー',
    breed: '道産子・木曽馬・ポニー',
    description: '北海道和種（道産子）や木曽馬など、日本の在来馬も在籍した実績があります。小柄で我慢強い性格の馬たちは、子供たちの良きパートナーです。日本の伝統的な馬種の魅力を感じながら、乗馬体験を楽しむことができます。',
    characteristics: '和種馬・ポニーは、日本の在来馬種である道産子（北海道和種）や木曽馬、そしてポニーを中心とした馬たちです。これらの馬たちは小柄で我慢強い性格が特徴で、特に子供たちとの相性が良く、優しいパートナーとして活躍しています。日本の伝統的な馬種の魅力を感じながら、乗馬体験を楽しむことができます。小柄な体格のため、小さなお子様でも安心して乗馬体験ができ、引き馬体験から本格的なレッスンまで対応しています。',
    suitableFor: '小さなお子様連れのご家族や、小柄な馬を好む方におすすめです。特に2歳のお子様から体験可能な引き馬体験では、これらの馬たちが大活躍します。小柄で我慢強い性格のため、初めて馬に触れるお子様にも安心してご利用いただけます。また、日本の在来馬に興味のある方、伝統的な馬種の魅力を感じたい方にも最適です。',
    programs: '和種馬・ポニーは、引き馬体験から体験乗馬、そして本格的なレッスンまで、幅広いプログラムでご利用いただけます。特に引き馬体験では、スタッフが馬を引いてゆっくりと馬場内を一周するコースで、小さなお子様や全く初めての方に最適です。2歳のお子様でも、やる気があれば体験可能です。',
    care: '和種馬・ポニーは、日本の気候や環境に適応した丈夫な体質を持っています。当クラブでは、これらの馬たちの特性を活かしながら、適切な健康管理と運動管理を行っています。小柄な体格を活かし、子供たちとの触れ合いを大切にしながら育てられています。'
  },
  'h3': {
    name: '仔馬たち',
    breed: '生産馬',
    description: '当クラブでは繁殖・育成も行っています。時期によっては、元気いっぱいに放牧場を駆け回る仔馬たちの姿を見ることができるかもしれません。新しい命の誕生と成長を見守りながら、馬との絆を深めることができます。',
    characteristics: 'カズホーストレーニングでは、繁殖・育成も行っており、時期によっては元気いっぱいに放牧場を駆け回る仔馬たちの姿を見ることができます。仔馬たちは、ナチュラルホースマンシップの理論に基づいて、馬の自然な習性を尊重しながら育てられています。若馬の初期訓練から問題行動の矯正まで対応し、プロの手で調教・訓練が行われています。仔馬たちの成長過程を見守りながら、馬との絆を深めることができます。',
    suitableFor: '馬の繁殖や育成に興味のある方、仔馬の成長過程を見守りたい方におすすめです。また、若馬の調教やトレーニングに興味のある経験者の方にも、仔馬たちとの触れ合いを通じて、馬への理解を深めることができます。',
    programs: '仔馬たちは、直接的な乗馬体験には使用されませんが、見学や触れ合い体験を通じて、馬の成長過程を学ぶことができます。また、調教預託（短期調教預かり）サービスでは、お客様の馬を一定期間お預かりし、プロの手で調教・訓練するサービスも提供しています。預託中はオーナーから定期的に馬の様子をご報告し、オーナー様自身も調教の進め方を学ぶ機会を設けています。',
    care: '仔馬たちは、馬の自然な習性を尊重しながら、ストレスをかけない環境で育てられています。若馬の初期訓練から問題行動の矯正まで、ナチュラルホースマンシップの理論に基づいた丁寧なトレーニングが行われています。新しい命の誕生と成長を見守りながら、馬との絆を深めることができます。'
  }
};

export const Horses: React.FC = () => {
  const [selectedHorse, setSelectedHorse] = useState<string | null>(null);
  // 追加のギャラリー画像（メイン3頭以外）
  const additionalHorseImages = IMAGES.horses.slice(3);

  const handleHorseClick = (horseId: string) => {
    setSelectedHorse(horseId);
  };

  const closeModal = () => {
    setSelectedHorse(null);
  };

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
            <div 
              key={horse.id} 
              className="group cursor-pointer"
              onClick={() => handleHorseClick(horse.id)}
            >
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
                <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/30 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
                    詳しく見る
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-300">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </span>
                </div>
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

      {/* Horse Detail Modal */}
      {selectedHorse && HORSE_DETAILS[selectedHorse] && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div 
            className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 transition-colors bg-white rounded-full p-2 shadow-lg"
              aria-label="閉じる"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>

            {/* Image */}
            {HORSES.find(h => h.id === selectedHorse)?.imageUrl && (
              <div className="relative w-full h-64 md:h-96 bg-gray-100">
                <img 
                  src={HORSES.find(h => h.id === selectedHorse)!.imageUrl} 
                  alt={HORSE_DETAILS[selectedHorse].name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="p-6 md:p-8">
              <div className="mb-6">
                <div className="mb-3">
                  <span className="inline-block px-4 py-1 bg-primary/10 text-primary text-sm font-bold rounded-full">
                    {HORSE_DETAILS[selectedHorse].breed}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">
                  {HORSE_DETAILS[selectedHorse].name}
                </h2>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-primary mb-4">概要</h3>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                  {HORSE_DETAILS[selectedHorse].description}
                </p>
              </div>

              {/* Characteristics */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-primary mb-4">特徴</h3>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                  {HORSE_DETAILS[selectedHorse].characteristics}
                </p>
              </div>

              {/* Suitable For */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-primary mb-4">こんな方におすすめ</h3>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                  {HORSE_DETAILS[selectedHorse].suitableFor}
                </p>
              </div>

              {/* Programs */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-primary mb-4">対応プログラム</h3>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                  {HORSE_DETAILS[selectedHorse].programs}
                </p>
              </div>

              {/* Care */}
              <div className="mb-8 border-t pt-6">
                <h3 className="text-xl font-bold text-primary mb-4">飼育・管理について</h3>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                  {HORSE_DETAILS[selectedHorse].care}
                </p>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                <a href={CONTACT_INFO.phoneLink} className="flex-1">
                  <Button variant="secondary" fullWidth size="lg" className="font-bold">
                    電話で予約する
                  </Button>
                </a>
                <Button 
                  variant="outline" 
                  fullWidth 
                  size="lg" 
                  className="font-bold"
                  onClick={closeModal}
                >
                  閉じる
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};