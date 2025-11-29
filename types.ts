export interface Plan {
  id: string;
  title: string;
  price: string;
  features: string[];
  recommendedFor: string;
  isPopular?: boolean;
  imageUrl?: string;
}

export interface Horse {
  id: string;
  name: string;
  breed: string;
  description: string;
  imageUrl: string;
}

export interface NewsItem {
  id: string;
  date: string;
  title: string;
  content: string;
  category?: string;
  youtubeUrl?: string; // YouTube動画のURL（https://www.youtube.com/watch?v=... または https://youtu.be/... 形式）
  instagramReelUrl?: string; // Instagram ReelsのURL（https://www.instagram.com/reel/... 形式）
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}

export enum SectionId {
  HOME = 'home',
  ABOUT = 'about',
  NEWS = 'news',
  PLANS = 'plans',
  HORSES = 'horses',
  ACCESS = 'access',
}