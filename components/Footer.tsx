import React from 'react';
import { APP_NAME, IMAGES } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-gray-300 py-12 sm:py-16 border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="w-40 sm:w-48 mb-4 sm:mb-6">
               <img src={IMAGES.logo} alt={APP_NAME} className="w-full h-auto opacity-90" />
            </div>
            <p className="max-w-xs text-xs sm:text-sm leading-relaxed text-gray-400">
              〒501-5304<br/>
              岐阜県郡上市高鷲町鮎立5434<br/>
              (N.A.O.明野高原キャンプ場内)
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4 sm:mb-6 text-xs sm:text-sm uppercase tracking-widest border-b border-secondary/50 inline-block pb-1">Links</h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors hover:translate-x-1 inline-block">About</a></li>
              <li><a href="#plans" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Plans</a></li>
              <li><a href="#horses" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Horses</a></li>
              <li><a href="#access" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Access</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest border-b border-secondary/50 inline-block pb-1">Social</h4>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/kaz.horsetraining/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary text-white transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary text-white transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};