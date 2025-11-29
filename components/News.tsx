import React, { useEffect } from 'react';
import { SectionId } from '../types';
import { NEWS, YOUTUBE_VIDEO, INSTAGRAM_REEL } from '../constants';

// Instagram Embedスクリプトの型定義
declare global {
    interface Window {
        instgrm?: {
            Embeds: {
                process: () => void;
            };
        };
    }
}

export const News: React.FC = () => {
    // Instagram Embedスクリプトを読み込む
    useEffect(() => {
        const loadInstagramEmbed = () => {
            if (window.instgrm) {
                window.instgrm.Embeds.process();
                return;
            }

            // スクリプトが既に読み込まれているか確認
            const existingScript = document.querySelector('script[src="https://www.instagram.com/embed.js"]');
            if (existingScript) {
                setTimeout(() => {
                    if (window.instgrm) {
                        window.instgrm.Embeds.process();
                    }
                }, 100);
                return;
            }

            // スクリプトを読み込む
            const script = document.createElement('script');
            script.src = 'https://www.instagram.com/embed.js';
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);

            // スクリプトが読み込まれたらInstagramの埋め込みを処理
            script.onload = () => {
                setTimeout(() => {
                    if (window.instgrm) {
                        window.instgrm.Embeds.process();
                    }
                }, 100);
            };
        };

        // 初回読み込み
        loadInstagramEmbed();

        // コンテンツがレンダリングされた後に再処理
        const timer = setTimeout(() => {
            if (window.instgrm) {
                window.instgrm.Embeds.process();
            }
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    // 日付をフォーマットする関数
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // YouTube URLから動画IDを抽出する関数
    const getYouTubeVideoId = (url: string): string | null => {
        if (!url) return null;
        
        const patterns = [
            /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        ];
        
        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match && match[1]) {
                return match[1];
            }
        }
        
        return null;
    };

    // YouTubeサムネイル画像のURLを生成する関数
    const getYouTubeThumbnailUrl = (videoId: string): string => {
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    };

    return (
        <section id={SectionId.NEWS} className="py-20 md:py-32 bg-gradient-to-br from-blue-50 via-white to-purple-50/30 relative overflow-hidden section-bg-anti">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16 md:mb-20">
                    <h4 className="text-secondary font-bold tracking-widest uppercase mb-3 text-xs md:text-sm">News</h4>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-primary mb-6">お知らせ</h2>
                    <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
                    <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
                        カズホーストレーニングからの最新情報をお届けします
                    </p>
                </div>

                {/* 3カラムレイアウト: 左（Instagram）、中央（ニュース）、右（YouTube） */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 max-w-7xl mx-auto">
                    
                    {/* 左側: Instagram Reels */}
                    <div className="lg:col-span-3 order-2 lg:order-1">
                        <div className="anti-gravity-card rounded-2xl overflow-hidden floating sticky top-24">
                            <div className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800">Instagram</h3>
                                        <p className="text-xs text-gray-500">最新の動画</p>
                                    </div>
                                </div>
                                
                                {INSTAGRAM_REEL && (
                                    <div className="rounded-lg overflow-hidden">
                                        <blockquote
                                            className="instagram-media"
                                            data-instgrm-captioned
                                            data-instgrm-permalink={INSTAGRAM_REEL.url.split('?')[0]}
                                            data-instgrm-version="14"
                                            style={{
                                                background: '#FFF',
                                                border: '0',
                                                borderRadius: '8px',
                                                margin: '0',
                                                maxWidth: '100%',
                                                minWidth: '100%',
                                                padding: '0',
                                                width: '100%'
                                            }}
                                        >
                                            <a
                                                href={INSTAGRAM_REEL.url.split('?')[0]}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {INSTAGRAM_REEL.title}
                                            </a>
                                        </blockquote>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 中央: ニュース記事 */}
                    <div className="lg:col-span-6 order-1 lg:order-2">
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

                    {/* 右側: YouTube */}
                    <div className="lg:col-span-3 order-3">
                        <div className="anti-gravity-card rounded-2xl overflow-hidden floating-reverse sticky top-24">
                            <div className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800">YouTube</h3>
                                        <p className="text-xs text-gray-500">体験動画</p>
                                    </div>
                                </div>
                                
                                {YOUTUBE_VIDEO && getYouTubeVideoId(YOUTUBE_VIDEO.url) && (
                                    <a
                                        href={YOUTUBE_VIDEO.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block relative group"
                                    >
                                        <div className="relative w-full rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                                            <img
                                                src={getYouTubeThumbnailUrl(getYouTubeVideoId(YOUTUBE_VIDEO.url)!)}
                                                alt={YOUTUBE_VIDEO.title}
                                                className="absolute top-0 left-0 w-full h-full object-cover"
                                                onError={(e) => {
                                                    const videoId = getYouTubeVideoId(YOUTUBE_VIDEO.url);
                                                    if (videoId) {
                                                        e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                                                    }
                                                }}
                                            />
                                            {/* 再生ボタンオーバーレイ */}
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors duration-300">
                                                <div className="bg-red-600 rounded-full p-3 md:p-4 group-hover:scale-110 transition-transform duration-300">
                                                    <svg
                                                        className="w-6 h-6 md:w-8 md:h-8 text-white ml-1"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <h4 className="text-sm font-bold text-gray-800 mb-1 line-clamp-2">
                                                {YOUTUBE_VIDEO.title}
                                            </h4>
                                            <p className="text-xs text-gray-600 line-clamp-2">
                                                {YOUTUBE_VIDEO.description}
                                            </p>
                                        </div>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
