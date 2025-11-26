import React, { useState } from 'react';
import { SectionId } from '../types';
import { HORSES, IMAGES } from '../constants';

export const Horses: React.FC = () => {
  const [selectedHorse, setSelectedHorse] = useState<string | null>(null);
  // 追加のギャラリー画像（メイン3頭以外）
  const additionalHorseImages = IMAGES.horses.slice(3);

  const selectedHorseData = HORSES.find(h => h.id === selectedHorse);

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
              onClick={() => setSelectedHorse(horse.id)}
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
                <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/20 transition-colors duration-300"></div>
              </div>
              <div className="border-l-2 border-secondary pl-4 transition-all duration-300 group-hover:border-white">
                <h3 className="text-2xl font-bold mb-1">{horse.name}</h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{horse.breed}</p>
                <p className="text-sm text-gray-300 leading-relaxed opacity-80 group-hover:opacity-100">
                  {horse.description}
                </p>
                <p className="text-xs text-secondary mt-2 font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                  詳細を見る →
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Gallery */}
        {additionalHorseImages && additionalHorseImages.length > 0 && !selectedHorse && (
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

        {/* Horse Detail Modal */}
        {selectedHorse && selectedHorseData && (
          <div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedHorse(null)}
          >
            <div 
              className="bg-white text-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedHorse(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-3xl font-bold z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
                aria-label="閉じる"
              >
                ×
              </button>

              {/* Hero Image */}
              {selectedHorseData.imageUrl && (
                <div className="relative h-64 md:h-96 overflow-hidden">
                  <img 
                    src={selectedHorseData.imageUrl} 
                    alt={selectedHorseData.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error(`Horse detail image failed to load:`, selectedHorseData.imageUrl);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <p className="text-secondary text-sm font-bold uppercase tracking-wider mb-2">{selectedHorseData.breed}</p>
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white">{selectedHorseData.name}</h2>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="prose prose-lg max-w-none mb-8">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {selectedHorseData.description}
                  </p>
                </div>

                {/* Additional Information */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-xl font-bold text-primary mb-4">特徴・詳細</h3>
                  <div className="space-y-4">
                    {selectedHorseData.id === 'h1' && (
                      <>
                        <div className="flex items-start gap-3">
                          <span className="text-secondary text-xl">🐴</span>
                          <div>
                            <p className="font-semibold text-gray-900 mb-1">ウエスタン競技対応</p>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              カズホーストレーニングのウエスタンホースたちは、ウエスタン競技で活躍できるよう丁寧に調教されています。クォーターホース種を中心とした馬たちは、スピードと機動性に優れ、ウエスタン競技の特性を活かしたトレーニングを受けています。
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-secondary text-xl">❤️</span>
                          <div>
                            <p className="font-semibold text-gray-900 mb-1">穏やかで人懐っこい性格</p>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              とても穏やかで人懐っこく、初心者の方でも安心して騎乗できます。馬の心理を重視したナチュラルホースマンシップ（馬の自然な習性に沿った調教法）を実践し、馬にストレスをかけない丁寧なトレーニングを行っています。人と馬が一対一で向き合う楽しさを感じていただけます。
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-secondary text-xl">🏆</span>
                          <div>
                            <p className="font-semibold text-gray-900 mb-1">ウエスタンスタイル</p>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              ウエスタン乗馬は、カウボーイ文化にルーツを持つカジュアルなスタイルです。ウエスタンサドルは大きく安定感があるため、初めての方でも安心感があります。デニムやブーツなど動きやすい服装で気軽に体験できるのが魅力です。
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                    {selectedHorseData.id === 'h2' && (
                      <>
                        <div className="flex items-start gap-3">
                          <span className="text-secondary text-xl">🇯🇵</span>
                          <div>
                            <p className="font-semibold text-gray-900 mb-1">日本の在来馬</p>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              北海道和種（道産子）や木曽馬、ポニーなど、日本の伝統的な馬種も在籍した実績があります。これらの在来馬は、日本の風土に適応してきた丈夫で我慢強い性格を持っています。小柄で穏やかな性格のため、特に小さなお子様や初心者の方に最適です。
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-secondary text-xl">👶</span>
                          <div>
                            <p className="font-semibold text-gray-900 mb-1">小柄で我慢強い</p>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              小柄な体格でありながらも、我慢強く優しい性格の馬たちは、子供たちの良きパートナーとして最適です。2歳のお子様でも、やる気があれば引き馬体験からスタートできます。スタッフが常にサポートしますので、安心してご体験いただけます。
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-secondary text-xl">🤝</span>
                          <div>
                            <p className="font-semibold text-gray-900 mb-1">ファミリーに優しい</p>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              家族での乗馬体験にも最適です。親子での引き馬体験や、お子様の体験乗馬を見守りながら保護者の方もレッスンを受けていただけます。小さな頃から馬と触れ合うことで、思いやりや責任感が育まれます。
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                    {selectedHorseData.id === 'h3' && (
                      <>
                        <div className="flex items-start gap-3">
                          <span className="text-secondary text-xl">🐎</span>
                          <div>
                            <p className="font-semibold text-gray-900 mb-1">繁殖・育成プログラム</p>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              当クラブでは繁殖・育成も行っています。若馬の初期訓練から問題行動の矯正まで対応し、プロの手で調教・訓練するサービスも提供しています。仔馬の成長過程を見守り、ともに育つ喜びを味わっていただけます。
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-secondary text-xl">🌱</span>
                          <div>
                            <p className="font-semibold text-gray-900 mb-1">元気いっぱいの仔馬たち</p>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              時期によっては、元気いっぱいに放牧場を駆け回る仔馬たちの姿を見ることができるかもしれません。自由に走り回る姿は、見ているだけでも癒やされます。生命の力強さと成長の過程を間近で感じることができる、特別な体験です。
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-secondary text-xl">📚</span>
                          <div>
                            <p className="font-semibold text-gray-900 mb-1">ホースマンシップクリニック</p>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              馬の行動心理や調教方法を学ぶクリニックも不定期で開催しています。馬への接し方やナチュラルホースマンシップの理論を、実演やワークショップ形式で体験できます。馬をもっと理解したい、コミュニケーションを極めたい方向けの内容です。
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Additional Details */}
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <h3 className="text-xl font-bold text-primary mb-4">体験できること</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    {selectedHorseData.id === 'h1' && (
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-secondary mt-1">✓</span>
                          <span>体験乗馬15分コース（自分で手綱を持って操作）</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-secondary mt-1">✓</span>
                          <span>体験乗馬45分コース（速歩や軽い駈歩まで挑戦）</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-secondary mt-1">✓</span>
                          <span>本格的なウエスタン乗馬レッスン</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-secondary mt-1">✓</span>
                          <span>馬のブラッシング体験</span>
                        </li>
                      </ul>
                    )}
                    {selectedHorseData.id === 'h2' && (
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-secondary mt-1">✓</span>
                          <span>引き馬体験（2歳のお子様から可能）</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-secondary mt-1">✓</span>
                          <span>家族での乗馬体験</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-secondary mt-1">✓</span>
                          <span>お子様向けレッスン（9歳以上推奨）</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-secondary mt-1">✓</span>
                          <span>馬とのふれあい体験</span>
                        </li>
                      </ul>
                    )}
                    {selectedHorseData.id === 'h3' && (
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-secondary mt-1">✓</span>
                          <span>仔馬とのふれあい（時期により）</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-secondary mt-1">✓</span>
                          <span>繁殖・育成の見学</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-secondary mt-1">✓</span>
                          <span>ホースマンシップクリニック</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-secondary mt-1">✓</span>
                          <span>調教預託サービス（ご相談）</span>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>

                {/* Back Button */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setSelectedHorse(null)}
                    className="w-full md:w-auto px-8 py-3 bg-primary text-white font-bold rounded-sm hover:bg-blue-900 transition-colors"
                  >
                    ← 一覧に戻る
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};