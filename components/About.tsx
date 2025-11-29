import React, { useState } from 'react';
import { SectionId } from '../types';
import { IMAGES } from '../constants';

// ギャラリー画像ごとの経歴情報（時代別）
const GALLERY_BIOGRAPHIES = [
  {
    era: '幼少時代',
    title: '馬との出会い',
    content: '幼い頃から馬に親しみ、自然の中で育ちました。この時期に培った動物への愛情と理解が、後の指導者としての基盤となっています。馬は自分を映す鏡であり、自分から語りかけないと馬は動いてくれないということを、幼いながらに学んでいきました。'
  },
  {
    era: 'ブリティッシュ時代',
    title: 'ブリティッシュインストラクターとして',
    content: '元ブリティッシュインストラクターとして、英国式の乗馬スタイルを学び、指導してきました。この時代に、正確な技術と馬への理解を深めました。多くの生徒さんとの出会いを通じて、乗馬を通じて積極性や思いやり、忍耐力が育まれることを実感しました。'
  },
  {
    era: 'ウエスタン時代',
    title: 'ウエスタンスタイルへの転換',
    content: 'ブリティッシュからウエスタンスタイルへと転換し、新しい乗馬の可能性を探求しました。ウエスタン乗馬は鞍が大きく安定感があり、初心者の方にも親しみやすいスタイルです。カウボーイ文化にルーツを持つカジュアルな乗馬スタイルは、格式ばらず気軽に体験できる魅力があります。'
  },
  {
    era: 'カズホーストレーニング時代',
    title: 'カズホーストレーニングの設立',
    content: '岐阜県郡上市の標高1,000m、明野高原キャンプ場内にカズホーストレーニングを設立しました。ナチュラルホースマンシップ（馬の自然な習性に沿った調教法）を取り入れ、馬にストレスをかけない丁寧なトレーニングを行っています。馬とのコミュニケーションを何よりも大切にし、人と馬が一対一で向き合う楽しさを多くの方に伝えたいと考えています。'
  },
  {
    era: '理念',
    title: '馬とのコミュニケーションを大切に',
    content: '私たちのスタイルはシンプルです。「馬に乗せてもらう」のではなく、あなたが主体となって馬とコミュニケーションを取る。手綱を通じて伝わる馬の温もりと意思を感じながら、人馬一体となる喜びを提供します。初心者から経験者、子どもからご年配の方まで、どなたでも安全で楽しい乗馬を体験できるよう心がけています。'
  },
  {
    era: 'これから',
    title: '未来への想い',
    content: 'これからも、明野高原の大自然の中で、馬と向き合い、心を通わせる時間を大切にしていきます。乗馬を通じて、多くの方が馬との絆を深め、新たな感動を体験していただけるよう、日々精進していきます。高原の四季折々の景色の中で、馬との特別なひとときをお届けできることを願っています。'
  },
  {
    era: 'ナチュラルホースマンシップ',
    title: '馬の自然な習性を尊重',
    content: '馬の行動心理や調教方法を学び、ナチュラルホースマンシップの理論を実践しています。馬への接し方やコミュニケーション方法を、実演やワークショップ形式で体験していただけます。馬をもっと理解したい、コミュニケーションを極めたい方向けに、専門的な取り組みも行っています。'
  }
];

export const About: React.FC = () => {
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<number | null>(null);

  const handleGalleryClick = (index: number) => {
    setSelectedGalleryIndex(index);
  };

  const closeModal = () => {
    setSelectedGalleryIndex(null);
  };

  return (
    <section id={SectionId.ABOUT} className="py-20 md:py-32 bg-white relative overflow-hidden section-bg-anti">
      {/* Decorative background text */}
      <div className="absolute top-20 left-0 text-[8rem] md:text-[10rem] font-display font-bold text-gray-50 leading-none select-none z-0 opacity-50 floating-slow">
        WESTERN
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-20">
          <h4 className="text-secondary font-bold tracking-widest uppercase mb-3 text-xs md:text-sm">About Us</h4>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-primary mb-6 leading-tight">
            カズホーストレーニングについて
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto"></div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-20">
          
          {/* Image Section */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl anti-gravity-card floating">
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
            <div className="space-y-6 text-gray-700 leading-relaxed text-base md:text-lg">
              <p className="text-lg md:text-xl font-medium text-primary">
                カズホーストレーニングは、岐阜県郡上市の標高1,000m、明野高原キャンプ場内にある乗馬クラブです。
              </p>
              <p>
                元ブリティッシュインストラクターの経験を持つ代表が、現在は馬の心理を重視したウエスタン流のホースマンシップを指導しています。
              </p>
              <p>
                私たちのスタイルはシンプルです。「馬に乗せてもらう」のではなく、あなたが主体となって馬とコミュニケーションを取る。
                手綱を通じて伝わる馬の温もりと意思を感じながら、人馬一体となる喜びを提供します。
              </p>
            </div>

            {/* Feature Cards */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-l-4 border-secondary pl-6 py-4 anti-gravity-card rounded-r-lg floating-reverse">
                <h3 className="text-xl font-bold text-primary mb-2">Communication</h3>
                <p className="text-sm text-gray-600 leading-relaxed">馬と向き合い、心を通わせる<br/>マンツーマン指導</p>
              </div>
              <div className="border-l-4 border-primary pl-6 py-4 anti-gravity-card rounded-r-lg floating">
                <h3 className="text-xl font-bold text-primary mb-2">Location</h3>
                <p className="text-sm text-gray-600 leading-relaxed">四季を感じる明野高原の<br/>大自然と開放感</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        {IMAGES.aboutGallery && IMAGES.aboutGallery.length > 0 && (
          <div className="mt-20">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-primary mb-3">ギャラリー</h3>
              <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
                各写真をクリックすると、時代別の詳細な経歴をご覧いただけます
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {IMAGES.aboutGallery.map((img, idx) => {
                const biography = GALLERY_BIOGRAPHIES[idx];
                return (
                  <div 
                    key={idx} 
                    className={`relative overflow-hidden group cursor-pointer aspect-square bg-gray-100 rounded-lg anti-gravity-card transform-3d ${idx % 3 === 0 ? 'floating' : idx % 3 === 1 ? 'floating-reverse' : 'floating-slow'}`}
                    style={{ animationDelay: `${idx * 0.1}s` }}
                    onClick={() => handleGalleryClick(idx)}
                  >
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
                    
                    {/* Overlay with era badge and CTA */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 transition-opacity duration-300 flex flex-col justify-end p-3 md:p-4">
                      {biography && (
                        <>
                          <div className="mb-2">
                            <span className="inline-block px-2 py-1 bg-secondary/90 text-white text-xs font-bold rounded">
                              {biography.era}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-white">
                            <span className="font-bold text-sm md:text-base">経歴を見る</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-300">
                              <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                          </div>
                        </>
                      )}
                    </div>
                    
                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300"></div>
                  </div>
                );
              })}
            </div>
            <p className="text-center text-gray-500 text-xs md:text-sm mt-6">
              💡 各写真をクリックして、詳細な経歴をご覧ください
            </p>
          </div>
        )}

        {/* Gallery Detail Modal */}
        {selectedGalleryIndex !== null && IMAGES.aboutGallery && IMAGES.aboutGallery[selectedGalleryIndex] && (
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
              <div className="relative w-full h-64 md:h-96 bg-gray-100">
                <img 
                  src={IMAGES.aboutGallery[selectedGalleryIndex]} 
                  alt={`Gallery ${selectedGalleryIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                {GALLERY_BIOGRAPHIES[selectedGalleryIndex] && (
                  <>
                    <div className="mb-4">
                      <span className="inline-block px-4 py-1 bg-primary/10 text-primary text-sm font-bold rounded-full mb-3">
                        {GALLERY_BIOGRAPHIES[selectedGalleryIndex].era}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-display font-bold text-primary mb-4">
                        {GALLERY_BIOGRAPHIES[selectedGalleryIndex].title}
                      </h3>
                    </div>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-gray-700 leading-relaxed text-base md:text-lg whitespace-pre-line">
                        {GALLERY_BIOGRAPHIES[selectedGalleryIndex].content}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};