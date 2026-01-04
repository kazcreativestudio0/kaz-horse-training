import React from 'react';
import { SectionId } from '../types';

export const MobileNavigation: React.FC = () => {
  // スマホ版用のナビゲーション順序（パートナーシップを馬の紹介と料金プランの間に配置）
  const mobileNavItems = [
    { label: 'ABOUT', href: `#${SectionId.ABOUT}` },
    { label: '料金プラン', href: `#${SectionId.PLANS}` },
    { label: 'パートナーシップ', href: `#${SectionId.PARTNERSHIPS}` },
    { label: '馬の紹介', href: `#${SectionId.HORSES}` },
    { label: 'アクセス', href: `#${SectionId.ACCESS}` },
  ];

  return (
    <section className="md:hidden bg-primary py-6 px-4">
      <div className="container mx-auto">
        <h3 className="text-white font-bold text-center mb-4 text-lg">メニュー</h3>
        <div className="grid grid-cols-2 gap-3">
          {mobileNavItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="bg-white text-primary font-bold py-3 px-4 rounded-lg text-center hover:bg-secondary hover:text-white transition-colors shadow-md"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

