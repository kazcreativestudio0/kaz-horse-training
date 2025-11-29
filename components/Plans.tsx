import React, { useState } from 'react';
import { SectionId } from '../types';
import { PLANS, CONTACT_INFO } from '../constants';
import { Button } from './Button';

// プランの詳細情報（前情報を参照）
const PLAN_DETAILS: Record<string, {
  title: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
  process: string;
  suitableFor: string;
  notes: string[];
}> = {
  'lead-horse': {
    title: '引き馬',
    price: '¥1,000（税込・保険料込）',
    duration: '馬場を1周（約5分）',
    description: 'スタッフが馬を引いてゆっくりと馬場内を一周するコースです。小さなお子様や全く初めての方に最適な体験です。2歳のお子様でも、やる気があれば体験可能です。馬の背に揺られながら、まずは乗馬の雰囲気を味わってみましょう。親子で一緒に乗ることもできます（追加料金あり）。',
    features: [
      'スタッフが馬を引いて馬場を1周',
      '小さなお子様も安心',
      '2歳から体験可能',
      '親子乗りは +¥500',
      '保険料込み'
    ],
    process: '受付 → ヘルメット着用 → 馬と対面（ごあいさつ） → 騎乗 → スタッフが馬を引いて馬場を1周（約5分） → 降馬 → 終了',
    suitableFor: '初めての方、小さなお子様、まずは馬に触れてみたい方におすすめです。',
    notes: [
      '2歳から体験可能です（保護者同伴必須）',
      '親子乗りは追加料金¥500で可能です',
      '動きやすい服装でお越しください',
      'ヘルメット等の安全具は当クラブで用意しております'
    ]
  },
  'trial-short': {
    title: '体験乗馬 (ショート)',
    price: '¥4,700 / 20分（税込・保険料込）',
    duration: '約20分の騎乗 + 準備時間含めて約35分',
    description: 'インストラクターの指導のもと、自分で手綱を持って馬を操作するショートコースです。馬にまたがる前に簡単なブラッシング（馬のお手入れ）も体験します。一人で馬を動かす感覚は感動的で、馬とのコミュニケーションの第一歩を踏み出せます。約20分と短時間なので、初めてでも安心してチャレンジできます。',
    features: [
      '自分で手綱を持って馬を操作',
      '引き馬ではありません',
      'ブラッシング（馬のお手入れ）体験付き',
      'スタッフの丁寧な指導',
      '保険料込み'
    ],
    process: '受付 → ヘルメット着用 → 馬と対面（ごあいさつ） → ブラッシング体験 → 騎乗レッスン開始（約20分） → 降馬 → 終了',
    suitableFor: 'まずは馬に触れてみたい方、少しだけ乗ってみたい方、初めての方でも安心してチャレンジできます。',
    notes: [
      'ハイシーズン（GW・夏休み等）は料金が異なる場合があります',
      '動きやすい長ズボンとスニーカーでお越しください',
      'ヘルメット等の安全具は当クラブで用意しております'
    ]
  },
  'trial-long': {
    title: '体験乗馬 (ロング)',
    price: '¥9,100 / 40分（税込・保険料込）',
    duration: '約40分の騎乗 + 準備時間含めて約50分',
    description: '15分コースに慣れたら、より本格的な40分コースに挑戦できます。馬を自分で操作しながら、少し走る（速歩や軽い駈歩）ところまで挑戦します。広々とした高原で風を感じながら馬上散歩を楽しめる、爽快感抜群のコースです。こちらもブラッシング体験付きで、馬とのふれあいをじっくり楽しめます。「もっと乗ってみたい！」という方におすすめです。',
    features: [
      '軽い駈歩（かけあし）まで挑戦',
      '馬の手入れ体験も可能',
      'マンツーマン指導',
      'ブラッシング体験付き',
      '保険料込み'
    ],
    process: '受付 → ヘルメット着用 → 馬と対面（ごあいさつ） → ブラッシング体験 → 騎乗レッスン開始（速歩・軽い駈歩まで体験、約40分） → 降馬 → 終了',
    suitableFor: 'しっかり乗ってみたい方、走ってみたい方、もっと乗馬を楽しみたい方に最適です。',
    notes: [
      'ハイシーズン（GW・夏休み等）は料金が異なる場合があります',
      '動きやすい長ズボンとスニーカーでお越しください',
      'ヘルメット等の安全具は当クラブで用意しております',
      '広々とした高原で爽快感抜群の体験ができます'
    ]
  },
  'lesson-ticket': {
    title: 'レッスン回数券 (4回)',
    price: '¥20,000 / 4回分（土日利用は ¥23,000）',
    duration: '1回あたり約45分のレッスン',
    description: '本格的に乗馬を学びたい方、継続して通いたい方向けのプログラムです。マンツーマンの乗馬レッスンを中心に提供します。経験豊富なインストラクターが個々のレベルに合わせて指導します。姿勢や合図の出し方から、本格的なウエスタン乗馬のスキルまで学べます。初心者から上級者まで、それぞれの目標（乗馬ライセンス取得、競技参加など）に応じたカリキュラムでサポートします。',
    features: [
      '1回あたり45分のレッスン',
      'マンツーマン指導',
      'レベルに合わせたカリキュラム',
      'ウエスタン乗馬の本格的なスキルを習得',
      '有効期限あり（詳細はお問い合わせください）'
    ],
    process: '受付 → ウォームアップ → 個別レッスン開始（姿勢・合図の出し方・技術指導、約45分） → 振り返り → 終了',
    suitableFor: '継続して通いたい方、ウエスタン乗馬を極めたい方、本格的に技術を習得したい方におすすめです。',
    notes: [
      '土日利用の場合は¥23,000',
      '有効期限がございます（詳細はお問い合わせください）',
      '初心者から上級者まで対応',
      '個人会員制度もございます（年会費13,200円）',
      '会員様はレッスン料割引などの特典あり'
    ]
  }
};

export const Plans: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handlePlanClick = (planId: string) => {
    setSelectedPlan(planId);
  };

  const closeModal = () => {
    setSelectedPlan(null);
  };

  return (
    <section id={SectionId.PLANS} className="py-20 md:py-32 bg-gradient-to-b from-accent to-white section-bg-anti">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-20">
          <h4 className="text-secondary font-bold tracking-widest uppercase mb-3 text-xs md:text-sm">Plans & Pricing</h4>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-primary mb-6">プラン・料金</h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
            初めての方には「体験乗馬」、本格的に学びたい方には「レッスンコース」。<br />
            目的に合わせて最適なプランをお選びください。
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-4 lg:gap-6 max-w-7xl mx-auto">
          {PLANS.map((plan, index) => (
            <div
              key={plan.id}
              className="relative flex flex-col anti-gravity-card rounded-lg overflow-hidden transform-3d"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Plan Image */}
              {plan.imageUrl ? (
                <div className="relative h-32 md:h-48 overflow-hidden bg-gray-200">
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
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">画像準備中</span>
                </div>
              )}

              <div className="p-4 md:p-8 flex flex-col flex-1">
                <h3 className="text-base md:text-2xl font-bold text-gray-800 mb-2 md:mb-3">{plan.title}</h3>
                <p className="text-primary font-display font-bold text-xl md:text-4xl mb-4 md:mb-6">{plan.price}</p>

                <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8 flex-1">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 md:gap-3 text-xs md:text-base text-gray-600">
                      <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></span>
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-3 md:pt-4 border-t border-gray-200">
                  <p className="text-[10px] md:text-xs text-gray-500 mb-3 md:mb-4 text-center leading-tight">{plan.recommendedFor}</p>
                  <Button
                    variant="outline"
                    fullWidth
                    size="sm"
                    className="font-bold"
                    onClick={() => handlePlanClick(plan.id)}
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

      {/* Plan Detail Modal */}
      {selectedPlan && PLAN_DETAILS[selectedPlan] && (
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
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Image */}
            {PLANS.find(p => p.id === selectedPlan)?.imageUrl && (
              <div className="relative w-full h-64 md:h-96 bg-gray-100">
                <img
                  src={PLANS.find(p => p.id === selectedPlan)!.imageUrl!}
                  alt={PLAN_DETAILS[selectedPlan].title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="p-6 md:p-8">
              <div className="mb-6">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-3">
                  {PLAN_DETAILS[selectedPlan].title}
                </h2>
                <p className="text-2xl md:text-3xl font-display font-bold text-secondary mb-2">
                  {PLAN_DETAILS[selectedPlan].price}
                </p>
                <p className="text-gray-600 text-sm md:text-base">
                  所要時間: {PLAN_DETAILS[selectedPlan].duration}
                </p>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-primary mb-3">プログラム内容</h3>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                  {PLAN_DETAILS[selectedPlan].description}
                </p>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-primary mb-4">含まれる内容</h3>
                <ul className="space-y-3">
                  {PLAN_DETAILS[selectedPlan].features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-gray-700 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Process */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-primary mb-4">当日の流れ</h3>
                <div className="bg-gray-50 rounded-lg p-4 md:p-6">
                  <p className="text-gray-700 leading-relaxed">
                    {PLAN_DETAILS[selectedPlan].process}
                  </p>
                </div>
              </div>

              {/* Suitable For */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-primary mb-3">こんな方におすすめ</h3>
                <p className="text-gray-700 leading-relaxed">
                  {PLAN_DETAILS[selectedPlan].suitableFor}
                </p>
              </div>

              {/* Notes */}
              <div className="mb-8 border-t pt-6">
                <h3 className="text-xl font-bold text-primary mb-4">注意事項</h3>
                <ul className="space-y-2">
                  {PLAN_DETAILS[selectedPlan].notes.map((note, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm md:text-base text-gray-600">
                      <span className="text-secondary font-bold">※</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
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