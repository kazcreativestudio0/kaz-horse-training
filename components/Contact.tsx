import React from 'react';
import { SectionId } from '../types';
import { Button } from './Button';
import { IMAGES } from '../constants';

export const Contact: React.FC = () => {
  return (
    <section id={SectionId.ACCESS} className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-0 shadow-2xl">
          
          {/* Info Side (Navy) */}
          <div className="w-full lg:w-1/2 bg-primary text-white p-10 md:p-16 flex flex-col justify-between">
            <div>
              <h4 className="text-secondary font-bold tracking-widest uppercase mb-2 text-sm">Contact Us</h4>
              <h2 className="text-4xl font-display font-bold mb-8">Get In Touch</h2>
              <p className="text-gray-300 mb-10 leading-relaxed">
                体験乗馬のご予約、レッスンのご相談など、お気軽にお問い合わせください。<br/>
                馬の準備のため、事前のご連絡をお願いいたします。
              </p>
              
              <div className="space-y-8">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Phone</p>
                  <p className="text-3xl font-bold text-white">0575-72-6785</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Address</p>
                  <p className="text-lg">〒501-5304 岐阜県郡上市高鷲町鮎立5434<br/>(N.A.O.明野高原キャンプ場内)</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Access</p>
                  <p className="text-sm text-gray-300">東海北陸自動車道「高鷲IC」より車で5〜10分</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
               <div className="w-full h-48 bg-gray-800 relative overflow-hidden opacity-80 hover:opacity-100 transition-opacity rounded-lg">
                 {IMAGES.map ? (
                   <img 
                     src={IMAGES.map} 
                     alt="Map" 
                     className="w-full h-full object-cover mix-blend-overlay" 
                     onError={(e) => {
                       console.error('Map image failed to load:', IMAGES.map);
                       e.currentTarget.style.display = 'none';
                     }}
                   />
                 ) : null}
                 <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold tracking-widest border border-white px-4 py-2">VIEW GOOGLE MAP</span>
                 </div>
               </div>
            </div>
          </div>

          {/* Form Side (White) */}
          <div className="w-full lg:w-1/2 bg-white p-10 md:p-16">
            <h3 className="text-2xl font-bold text-primary mb-8">Send Message</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Name</label>
                  <input type="text" className="w-full bg-gray-50 border-b-2 border-gray-200 focus:border-secondary p-3 outline-none transition-colors" placeholder="山田 太郎" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Email</label>
                  <input type="email" className="w-full bg-gray-50 border-b-2 border-gray-200 focus:border-secondary p-3 outline-none transition-colors" placeholder="email@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Subject</label>
                <select className="w-full bg-gray-50 border-b-2 border-gray-200 focus:border-secondary p-3 outline-none transition-colors">
                  <option>体験乗馬の予約・相談</option>
                  <option>レッスンについて</option>
                  <option>その他</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Message</label>
                <textarea rows={4} className="w-full bg-gray-50 border-b-2 border-gray-200 focus:border-secondary p-3 outline-none transition-colors" placeholder="お問い合わせ内容を入力してください"></textarea>
              </div>
              <div className="pt-4">
                <Button variant="primary" size="lg" className="w-full md:w-auto px-12">送信する</Button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};