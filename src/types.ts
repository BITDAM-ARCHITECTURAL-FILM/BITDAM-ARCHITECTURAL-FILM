export type BuildingCategory = 'all' | 'apartment' | 'commercial' | 'office' | 'house' | 'public';

export interface FilmSpec {
  id: string;
  brand: string;
  seriesName: string;
  category: 'heat_insulation' | 'privacy' | 'safety' | 'blackout' | 'design_custom' | 'sputter' | 'nano_ceramic';
  filmTypeGroup?: 'all' | 'multi_sputter' | 'deposit_sputter' | 'nano_ceramic' | 'design';
  vlt: number; // 가시광선 투과율 (%)
  irr: number; // 적외선(열) 차단율 (%)
  uvr: number; // 자외선 차단율 (%)
  tser: number; // 총태양에너지 차단율 (%)
  warrantyYears: number; // 보증기간 (년)
  thickness: string; // 두께 (mil)
  features: string[];
  recommendedFor: string;
  description: string;
  gradeBadge: 'ULTRA FLAGSHIP' | 'FLAGSHIP' | 'PREMIUM' | 'STANDARD' | 'SAFETY';
  colorTone: string;
  previewImage?: string; // 실내 창문 시공 연출 이미지
  interiorEffect?: string; // 실내 창문 인테리어 연출 효과
  keyAdvantages?: string[]; // 핵심 장점 요약
}

export interface PortfolioCase {
  id: string;
  title: string;
  subtitle: string;
  category: BuildingCategory;
  categoryLabel: string;
  location: string;
  buildingType: string;
  filmUsed: string;
  filmBrand: string;
  areaPyeong: number;
  glassAreaSqm: number;
  completionDate: string;
  beforeImage: string;
  afterImage: string;
  thermalBeforeTemp?: number;
  thermalAfterTemp?: number;
  glareReductionPercent: number;
  uvProtectionPercent: number;
  customerPainPoint?: string;
  whyChoseBitdam?: string;
  summary: string;
  detailStory: string[];
  naverBlogUrl?: string;
  clientReview?: {
    author: string;
    rating: number;
    comment: string;
  };
  tags: string[];
  featured?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  contentSnippet: string;
  thumbnail: string;
  date: string;
  category: string;
  author: string;
  naverUrl: string;
  viewCount: number;
  likesCount: number;
  tags: string[];
  isVerifiedSync: boolean;
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  housingType: string;
  filmType: '열반사' | '열흡수';
  filmApplied: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  photos: string[];
  metrics: {
    tempDrop: string;
    billSaving: string;
    viewClarity: string;
  };
  isVerifiedPurchase: boolean;
}

export interface ConsultationRequest {
  id?: string;
  clientName: string;
  phoneNumber: string;
  address: string;
  buildingType: string;
  estimatedArea: string;
  purpose: string[];
  preferredDate?: string;
  preferredTime?: string;
  preferredFilmBrand?: string;
  message?: string;
  submittedAt?: string;
  agreePrivacy: boolean;
}

export interface QuickEstimateState {
  buildingType: string;
  pyeongSize: number;
  windowExposure: 'south' | 'west' | 'east' | 'north' | 'all';
  primaryGoal: 'heat_reduction' | 'privacy' | 'glare' | 'winter_insulation' | 'safety';
  preferredGrade: 'flagship' | 'premium' | 'standard';
}
