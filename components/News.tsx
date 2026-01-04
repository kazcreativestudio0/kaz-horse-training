import React from 'react';
import { SectionId } from '../types';
import { NEWS } from '../constants';

export const News: React.FC = () => {

    // 日付をフォーマットする関数
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };


    return (
        <section id={SectionId.NEWS} className="py-12 md:py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50/30 relative overflow-hidden section-bg-anti">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-10 md:mb-16">
                    <h4 className="text-secondary font-bold tracking-widest uppercase mb-2 md:mb-3 text-xs md:text-sm">News</h4>
                    <h2 className="text-2xl md:text-5xl font-display font-bold text-primary mb-4 md:mb-6 px-2">お知らせ</h2>
                    <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
                    <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
                        カズホーストレーニングからの最新情報をお届けします
                    </p>
                </div>

                {/* ニュース記事 */}
                <div className="max-w-4xl mx-auto">
                        <div className="space-y-6">
                            {NEWS.map((newsItem, index) => (
                                <div
                                    key={newsItem.id}
                                    className="anti-gravity-card rounded-lg overflow-hidden border-l-4 border-secondary"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="p-6 md:p-8">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                            <div className="flex items-center gap-4 mb-2 md:mb-0">
                                                <span className="text-sm font-bold text-secondary bg-secondary/10 px-3 py-1 rounded-full">
                                                    {newsItem.category || 'お知らせ'}
                                                </span>
                                                <time className="text-sm text-gray-500">
                                                    {formatDate(newsItem.date)}
                                                </time>
                                            </div>
                                        </div>

                                        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
                                            {newsItem.title}
                                        </h3>

                                        <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                                            {newsItem.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Note */}
                        <div className="mt-12 text-center">
                            <p className="text-xs md:text-sm text-gray-600 anti-gravity-card px-4 py-2 rounded-lg inline-block">
                                ※最新情報は随時更新いたします。詳細はお電話にてお問い合わせください。
                            </p>
                        </div>
                </div>
            </div>
        </section>
    );
};
