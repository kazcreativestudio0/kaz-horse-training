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
  PLANS = 'plans',
  HORSES = 'horses',
  ACCESS = 'access',
}