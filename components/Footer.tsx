import React from 'react';
import { APP_NAME, IMAGES } from '../constants';

const animalHandlingInfo = [
  ['第一種動物取扱業者の氏名又は名称', '川嶋 種朗'],
  ['事業所の名称', 'カズホーストレーニング'],
  ['事業所の所在地', '郡上市高鷲町鮎立5434'],
  ['種別', '展示・訓練'],
  ['登録番号', '第070019号・第070025号'],
  ['登録年月日', '平成23年3月1日・平成28年3月1日'],
  ['有効期間末日', '47907'],
  ['動物取扱責任者', '川嶋 種朗'],
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-gray-300 py-4 md:py-6 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-4 md:gap-6 mb-4 md:mb-6">
          <div className="col-span-1 md:col-span-2">
            <div className="w-24 md:w-40 mb-3 md:mb-4">
               <img src={IMAGES.logo} alt={APP_NAME} className="w-full h-auto opacity-90" />
            </div>
            <p className="max-w-xs text-xs leading-relaxed text-gray-400">
              〒501-5304<br/>
              岐阜県郡上市高鷲町鮎立5434<br/>
              (N.A.O.明野高原キャンプ場内)
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-3 md:mb-4 text-xs uppercase tracking-widest border-b border-secondary/50 inline-block pb-1">Links</h4>
            <ul className="space-y-1.5 md:space-y-2 text-xs">
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors hover:translate-x-1 inline-block">About</a></li>
              <li><a href="#plans" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Plans</a></li>
              <li><a href="#horses" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Horses</a></li>
              <li><a href="#access" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Access</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 md:mb-4 text-xs uppercase tracking-widest border-b border-secondary/50 inline-block pb-1">Social</h4>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/kaz.horsetraining/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary text-white transition-[background-color]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary text-white transition-[background-color]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-3 md:pt-4 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
        </div>

        <section className="mt-5 md:mt-6 border-t border-white/10 pt-5 md:pt-6" aria-labelledby="animal-handling-title">
          <div className="max-w-3xl mx-auto">
            <div className="mb-3 text-center">
              <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-gray-500">HP・広告等記載事項</p>
              <h2 id="animal-handling-title" className="mt-1 text-sm md:text-base font-bold text-white tracking-wide">
                動物取扱業者標識
              </h2>
            </div>

            <div className="overflow-hidden rounded border border-white/15">
              <table className="w-full border-collapse text-xs md:text-sm">
                <tbody>
                  {animalHandlingInfo.map(([label, value]) => (
                    <tr key={label} className="border-b border-white/10 last:border-b-0">
                      <th
                        scope="row"
                        className="block w-full bg-white/5 px-3 py-2 text-left font-medium text-gray-400 md:table-cell md:w-1/2 md:border-r md:border-white/10 md:px-4"
                      >
                        {label}
                      </th>
                      <td className="block w-full px-3 py-2 text-left text-gray-200 md:table-cell md:w-1/2 md:px-4">
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
};
