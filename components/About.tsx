import React from 'react';
import { SectionId } from '../types';
import { IMAGES } from '../constants';

export const About: React.FC = () => {
  return (
    <section id={SectionId.ABOUT} className="py-8 md:py-12 bg-gray-50 relative overflow-hidden section-bg-anti">
      {/* Background Image */}
      {IMAGES.aboutGallery && IMAGES.aboutGallery.length > 0 && (
        <div className="absolute inset-0 z-0">
          <img 
            src={IMAGES.aboutGallery[0]} 
            alt="明野高原" 
            className="w-full h-full object-cover opacity-20"
            loading="lazy" 
            onError={(e) => {
              console.error('Background image failed to load:', IMAGES.aboutGallery[0]);
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/70 to-white/80"></div>
        </div>
      )}
      {/* Decorative background text */}
      <div className="absolute top-10 md:top-20 left-0 text-[4rem] md:text-[8rem] font-display font-bold bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 bg-clip-text text-transparent leading-none select-none z-0 opacity-30 md:opacity-50">
        WESTERN
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-10 md:mb-12">
          <h4 className="text-gray-500 font-bold tracking-widest uppercase mb-2 text-sm">About Us</h4>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4 leading-tight">
            カズホーストレーニングについて
          </h2>
        </div>

        {/* Main Content */}
        <div className="mb-10 md:mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4 text-gray-700 leading-relaxed text-sm md:text-base">
              <div className="flex flex-row gap-3 md:gap-4 items-start">
                {IMAGES.aboutGallery && IMAGES.aboutGallery.length > 1 && (
                  <div className="w-24 md:w-1/3 flex-shrink-0">
                    <img 
                      src={IMAGES.aboutGallery[1]} 
                      alt="明野高原" 
                      className="w-full h-auto rounded-lg shadow-md object-cover"
                      loading="lazy"
                      onError={(e) => {
                        console.error('About gallery image failed to load:', IMAGES.aboutGallery[1]);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm md:text-lg font-medium text-gray-900 mb-2">
                    カズホーストレーニングは、岐阜県郡上市の標高1,000m、明野高原キャンプ場内にある乗馬クラブです。
                  </p>
                  <p className="text-sm md:text-base">
                    元ブリティッシュインストラクターの経験を持つ代表が、現在は馬の心理を重視したウエスタン流のホースマンシップを指導しています。
                  </p>
                </div>
              </div>
              
              <div className="flex flex-row gap-3 md:gap-4 items-start">
                <div className="flex-1 min-w-0">
                  <p className="text-sm md:text-base">
                    私たちのスタイルはシンプルです。「馬に乗せてもらう」のではなく、あなたが主体となって馬とコミュニケーションを取る。
                    手綱を通じて伝わる馬の温もりと意思を感じながら、人馬一体となる喜びを提供します。
                  </p>
                </div>
                {IMAGES.horses && IMAGES.horses.length > 0 && (
                  <div className="w-24 md:w-1/3 flex-shrink-0">
                    <img 
                      src={IMAGES.horses[0]} 
                      alt="ウエスタンホース" 
                      className="w-full h-auto rounded-lg shadow-md object-cover"
                      loading="lazy"
                      onError={(e) => {
                        console.error('Horse image failed to load:', IMAGES.horses[0]);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
              
              <div className="flex flex-row gap-3 md:gap-4 items-start">
                {IMAGES.aboutGallery && IMAGES.aboutGallery.length > 2 && (
                  <div className="w-24 md:w-1/3 flex-shrink-0">
                    <img 
                      src={IMAGES.aboutGallery[2]} 
                      alt="イベント" 
                      className="w-full h-auto rounded-lg shadow-md object-cover"
                      loading="lazy"
                      onError={(e) => {
                        console.error('About gallery image failed to load:', IMAGES.aboutGallery[2]);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm md:text-base">
                    カズホーストレーニングでは、年間を通じて様々なイベントを開催しています。乗馬体験会や講習会、季節のイベントなど、馬との触れ合いを楽しむ機会を多数ご用意しています。毎年恒例のイベントもあり、会員の皆様や地域の方々と一緒に、馬との素敵な時間を過ごしています。明野高原の美しい自然の中で、馬と共に過ごす特別な時間をお楽しみください。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Section */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white p-4 md:p-8 rounded-lg">
            <div className="text-center mb-10">
              <h3 className="text-3xl font-display font-bold text-gray-900 mb-3">
                代表プロフィール
              </h3>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 md:p-6 border border-gray-200">
              <div className="flex flex-row gap-4 md:gap-6 items-start">
                {/* Profile Image */}
                <div className="w-24 md:w-1/3 relative flex-shrink-0 max-w-[280px]">
                  <div className="relative z-10 rounded-lg overflow-hidden shadow-xl anti-gravity-card">
                    {IMAGES.about ? (
                      <img 
                        src={IMAGES.about} 
                        alt="川島種朗" 
                        className="w-full h-auto max-h-[450px] object-cover"
                        loading="lazy" 
                        onError={(e) => {
                          console.error('About image failed to load:', IMAGES.about);
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full aspect-[3/4] max-h-[450px] bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">画像準備中</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Profile Content */}
                <div className="flex-1 min-w-0 text-gray-700 leading-relaxed">
                  <div className="text-left">
                    <h4 className="text-xl md:text-2xl font-display font-bold text-gray-900 mb-1">
                      <span className="block text-base md:text-xl text-gray-600 font-normal">かわしまかずお</span>
                      <span className="block">川島種朗</span>
                    </h4>
                    <p className="text-sm md:text-base text-gray-600 mb-2 mt-2">
                      カズホーストレーニング 代表
                    </p>
                    <p className="text-sm md:text-base text-primary font-semibold">
                      上級指導者資格保持
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 md:mt-8 text-gray-700 leading-relaxed">
              <div className="space-y-4 md:space-y-6 text-sm md:text-base">
                <div>
                  <h5 className="font-bold text-gray-900 mb-2 md:mb-3 text-base md:text-lg">経歴</h5>
                  <ul className="list-disc list-inside space-y-1.5 md:space-y-2 ml-4 text-sm md:text-base">
                    <li>上級指導者資格保持</li>
                    <li>元ブリティッシュインストラクターとして長年の指導経験を持つ</li>
                    <li>現在は馬の心理を重視したウエスタン流のホースマンシップを実践・指導</li>
                    <li>ナチュラルホースマンシップの理論に基づいた指導方法を実践</li>
                  </ul>
                </div>

                <div>
                  <h5 className="font-bold text-gray-900 mb-2 md:mb-3 text-base md:text-lg">指導方針</h5>
                  <p className="text-sm md:text-base">
                    馬の自然な習性を尊重し、ストレスをかけない方法で調教・指導を行っています。
                    「馬に乗せてもらう」のではなく、あなたが主体となって馬とコミュニケーションを取ることを大切にしています。
                    手綱を通じて伝わる馬の温もりと意思を感じながら、人馬一体となる喜びを提供します。
                  </p>
                </div>

                <div>
                  <h5 className="font-bold text-gray-900 mb-2 md:mb-3 text-base md:text-lg">メッセージ</h5>
                  <p className="italic text-gray-600 text-sm md:text-base">
                    馬との信頼関係を築くことから始めましょう。馬は私たちのパートナーであり、共に成長していく存在です。
                    明野高原の美しい自然の中で、馬と共に過ごす時間を一緒に楽しみましょう。
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